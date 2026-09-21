'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

// Assets served from Next.js public/ — no Vite-style imports.
const CARD_GLB_URL = '/images/lanyard/card.glb';
const LANYARD_TEXTURE_URL = '/images/lanyard/lanyard.png';

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// --- Finite-number guards -----------------------------------------------
// Every value that flows into CatmullRomCurve3 / MeshLineGeometry must be a
// finite number. A single NaN poisons the whole position attribute and
// three throws `computeBoundingSphere(): Computed radius is NaN`. These
// helpers validate physics output BEFORE it touches the curve, so a body
// that isn't ready (or ever goes non-finite) only skips a frame instead of
// corrupting the geometry or the physics world.
function isFiniteXYZ(v) {
  return v != null && Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z);
}

function readTranslation(body) {
  if (!body || typeof body.translation !== 'function') return null;
  const t = body.translation();
  return isFiniteXYZ(t) ? t : null;
}

function readAngvel(body) {
  if (!body || typeof body.angvel !== 'function') return null;
  const a = body.angvel();
  return isFiniteXYZ(a) ? a : null;
}

function readRotation(body) {
  if (!body || typeof body.rotation !== 'function') return null;
  const r = body.rotation();
  // Rapier returns a quaternion {x,y,z,w}; Vector3.copy() consumes x/y/z.
  if (r == null || !Number.isFinite(r.x) || !Number.isFinite(r.y) || !Number.isFinite(r.z)) return null;
  return r;
}

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  className = '',
}) {
  // Hero loads this component via dynamic(ssr:false), so window is always
  // available here. Lazy initializer keeps the first client render correct
  // without synchronously calling setState inside an effect.
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div aria-hidden="true" className={`relative z-0 w-full overflow-hidden ${className}`.trim()}>
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
}) {
  const band = useRef(null);
  const fixed = useRef(null);
  const j1 = useRef(null);
  const j2 = useRef(null);
  const j3 = useRef(null);
  const card = useRef(null);

  const { vec, ang, rot, dir, tmpA, tmpB } = useMemo(
    () => ({
      vec: new THREE.Vector3(),
      ang: new THREE.Vector3(),
      rot: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      tmpA: new THREE.Vector3(),
      tmpB: new THREE.Vector3(),
    }),
    []
  );

  const segmentProps = useMemo(
    () => ({ type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 }),
    []
  );

  const { nodes, materials } = useGLTF(CARD_GLB_URL);
  const texture = useTexture(lanyardImage || LANYARD_TEXTURE_URL);
  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    if (!baseImg || !baseImg.width || !baseImg.height) return baseMap;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    // Keep the original baked atlas for the card edges and any untouched face.
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img, rect) => {
      if (!img || !img.width || !img.height) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);

  const [curve] = useState(() => {
    // Initialize with distinct points matching the rigid-body rest layout
    // (group [0,4,0] + local offsets). Four coincident points would make the
    // chordal parameterization divide by zero-length segments; distinct
    // points keep the very first getPoints() finite even before physics ticks.
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.5, 4, 0),
      new THREE.Vector3(1, 4, 0),
      new THREE.Vector3(0.5, 4, 0),
      new THREE.Vector3(0, 4, 0),
    ]);
    c.curveType = 'chordal';
    return c;
  });
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  // Derive a locally-owned texture with repeat wrapping for the band.
  // (Mutating the useTexture() result directly is disallowed, so we clone.)
  const bandTexture = useMemo(() => {
    const next = texture.clone();
    next.wrapS = THREE.RepeatWrapping;
    next.wrapT = THREE.RepeatWrapping;
    next.needsUpdate = true;
    return next;
  }, [texture]);

  useEffect(() => {
    return () => {
      bandTexture.dispose();
    };
  }, [bandTexture]);

  useFrame((state, delta) => {
    // Guard 1: mesh + all physics bodies must exist. The old code only
    // checked `fixed.current`, so frame 1 could read j1/j2/j3/card before
    // Rapier attached them and feed undefined into the curve.
    const geometry = band.current?.geometry;
    if (!geometry || typeof geometry.setPoints !== 'function') return;
    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current) return;

    // Guard 2: finite, clamped timestep. An unclamped delta (tab switch,
    // hitches) makes `delta * maxSpeed` exceed 1, so lerped.lerp() wildly
    // overshoots, the rope explodes to Infinity, and Infinity - Infinity
    // becomes the NaN that poisons the position attribute.
    const step = Number.isFinite(delta) ? Math.min(Math.max(delta, 0), 1 / 30) : 1 / 60;

    if (dragged) {
      if (isFiniteXYZ(dragged) && Number.isFinite(state.pointer?.x) && Number.isFinite(state.pointer?.y)) {
        vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
        dir.copy(vec).sub(state.camera.position);
        const dirLen = dir.length();
        if (Number.isFinite(dirLen) && dirLen > 1e-6 && isFiniteXYZ(vec)) {
          dir.normalize();
          vec.add(dir.multiplyScalar(state.camera.position.length()));
          if (isFiniteXYZ(vec)) {
            [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp?.());
            const tx = vec.x - dragged.x;
            const ty = vec.y - dragged.y;
            const tz = vec.z - dragged.z;
            // Guard 3: never push NaN into the physics world. One NaN
            // kinematic target permanently corrupts all future translations.
            if (Number.isFinite(tx) && Number.isFinite(ty) && Number.isFinite(tz)) {
              card.current?.setNextKinematicTranslation?.({ x: tx, y: ty, z: tz });
            }
          }
        }
      }
    }

    // Guard 4: smooth j1/j2 only from finite translations. If a body isn't
    // ready yet, skip the whole frame instead of seeding `lerped` with NaN
    // (NaN lerped -> NaN distance -> NaN alpha -> NaN curve -> NaN geometry).
    for (const ref of [j1, j2]) {
      const t = readTranslation(ref.current);
      if (!t) return;
      if (!isFiniteXYZ(ref.current.lerped)) {
        ref.current.lerped = new THREE.Vector3(t.x, t.y, t.z);
      } else {
        tmpA.set(t.x, t.y, t.z);
        const dist = ref.current.lerped.distanceTo(tmpA);
        if (!Number.isFinite(dist)) return;
        const clampedDistance = Math.max(0.1, Math.min(1, dist));
        let alpha = step * (minSpeed + clampedDistance * (maxSpeed - minSpeed));
        if (!Number.isFinite(alpha)) return;
        alpha = Math.max(0, Math.min(1, alpha));
        ref.current.lerped.lerp(tmpA, alpha);
        if (!isFiniteXYZ(ref.current.lerped)) return;
      }
    }

    // Guard 5: all four curve anchors must be finite before touching the curve.
    const pJ3 = readTranslation(j3.current);
    const pFixed = readTranslation(fixed.current);
    if (!pJ3 || !pFixed) return;
    if (!isFiniteXYZ(j1.current.lerped) || !isFiniteXYZ(j2.current.lerped)) return;

    curve.points[0].set(pJ3.x, pJ3.y, pJ3.z);
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].set(pFixed.x, pFixed.y, pFixed.z);
    for (const p of curve.points) {
      if (!isFiniteXYZ(p)) return;
    }

    const points = curve.getPoints(isMobile ? 16 : 32);
    for (const p of points) {
      if (!isFiniteXYZ(p)) return;
    }
    // Only finite points ever reach MeshLineGeometry, so the position
    // attribute (and computeBoundingSphere) can never see NaN.
    geometry.setPoints(points);

    // Guard 6: angular-velocity damping only from finite values.
    const av = readAngvel(card.current);
    const rt = readRotation(card.current);
    if (!av || !rt) return;
    card.current.setAngvel({ x: av.x, y: av.y - rt.y * 0.25, z: av.z });
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_GLB_URL);
