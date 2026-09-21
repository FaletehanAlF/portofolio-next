'use client';

import { useRef, useEffect, useCallback } from 'react';

const MAX_SPARKS = 400;

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  className = '',
  children,
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const animationIdRef = useRef(null);
  const tickRef = useRef(null);
  const propsRef = useRef({ sparkColor, sparkSize, sparkRadius, duration, easing, extraScale });

  const getDpr = () =>
    Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

  // Canvas bersifat fixed selebar viewport: titik (0,0) kanvas selalu sama
  // dengan titik (0,0) viewport, jadi e.clientX/clientY bisa dipakai langsung
  // tanpa dikurangi rect dan anti-meleset oleh scroll/tinggi halaman.
  const syncSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;
    const dpr = getDpr();
    const w = Math.max(1, Math.round(window.innerWidth * dpr));
    const h = Math.max(1, Math.round(window.innerHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }, []);

  useEffect(() => {
    syncSize();
    if (typeof window === 'undefined') return undefined;

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(syncSize, 100);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Perubahan DPR (pindah monitor / zoom) tidak selalu memicu resize.
    let dprQuery = null;
    const handleDprChange = () => {
      syncSize();
      // Daftarkan ulang query dengan nilai DPR terbaru.
      try {
        dprQuery?.removeEventListener('change', handleDprChange);
      } catch {
        // abaikan
      }
      if (typeof window.matchMedia === 'function') {
        dprQuery = window.matchMedia(`(resolution: ${getDpr()}dppx)`);
        dprQuery.addEventListener('change', handleDprChange);
      }
    };
    if (typeof window.matchMedia === 'function') {
      dprQuery = window.matchMedia(`(resolution: ${getDpr()}dppx)`);
      dprQuery.addEventListener('change', handleDprChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(resizeTimeout);
      try {
        dprQuery?.removeEventListener('change', handleDprChange);
      } catch {
        // abaikan
      }
    };
  }, [syncSize]);

  // Loop animasi hanya hidup saat ada spark (hemat baterai/CPU).
  // tick disimpan di ref agar tidak ada self-reference di useCallback.
  useEffect(() => {
    propsRef.current = { sparkColor, sparkSize, sparkRadius, duration, easing, extraScale };

    const ease = (t) => {
      switch (propsRef.current.easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    };

    const schedule = () => {
      if (tickRef.current) {
        animationIdRef.current = requestAnimationFrame((t) => tickRef.current?.(t));
      } else {
        animationIdRef.current = null;
      }
    };

    tickRef.current = (timestamp) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationIdRef.current = null;
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animationIdRef.current = null;
        return;
      }

      // Jaga-jaga: kalau ukuran viewport berubah tanpa event, selaraskan dulu
      // sebelum menggambar agar posisi spark tidak pernah bergeser.
      syncSize();

      const { sparkColor, sparkSize, sparkRadius, duration, extraScale } = propsRef.current;
      const dpr = getDpr();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cssW = canvas.width / dpr;
      const cssH = canvas.height / dpr;
      ctx.clearRect(0, 0, cssW, cssH);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = ease(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });

      if (sparksRef.current.length === 0) {
        ctx.clearRect(0, 0, cssW, cssH);
        animationIdRef.current = null;
        return;
      }
      schedule();
    };

    // Lanjutkan sisa spark jika props berubah di tengah animasi.
    if (sparksRef.current.length > 0 && animationIdRef.current === null) {
      animationIdRef.current = requestAnimationFrame((t) => tickRef.current?.(t));
    }

    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      tickRef.current = null;
    };
  }, [sparkColor, sparkSize, sparkRadius, duration, easing, extraScale, syncSize]);

  const burstAt = useCallback(
    (x, y) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }));
      sparksRef.current.push(...newSparks);
      if (sparksRef.current.length > MAX_SPARKS) {
        sparksRef.current.splice(0, sparksRef.current.length - MAX_SPARKS);
      }
      if (animationIdRef.current === null && tickRef.current) {
        animationIdRef.current = requestAnimationFrame((t) => tickRef.current?.(t));
      }
    },
    [sparkCount]
  );

  // Dengarkan klik di window (capture) agar tidak ada yang terlewat atau
  // diubah koordinatnya oleh stopPropagation / portal.
  useEffect(() => {
    const onWindowClick = (e) => {
      // Klik keyboard (Enter/Space) punya koordinat 0,0 — jangan gambar di pojok.
      if (e.detail === 0 && e.clientX === 0 && e.clientY === 0) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      burstAt(e.clientX - rect.left, e.clientY - rect.top);
    };
    window.addEventListener('click', onWindowClick, true);
    return () => window.removeEventListener('click', onWindowClick, true);
  }, [burstAt]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] block select-none"
      />
      {children}
    </div>
  );
};

export default ClickSpark;
