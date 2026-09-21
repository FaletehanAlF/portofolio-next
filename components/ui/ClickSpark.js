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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const parent = canvas.parentElement;
    if (!parent) return undefined;

    let resizeTimeout;

    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = Math.max(1, w);
        canvas.height = Math.max(1, h);
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    resizeCanvas();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
      };
    }

    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);
    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

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

    const kick = (timestamp) => {
      if (tickRef.current) animationIdRef.current = requestAnimationFrame((t) => tickRef.current(t));
      else animationIdRef.current = null;
      void timestamp;
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

      const { sparkColor, sparkSize, sparkRadius, duration, extraScale } = propsRef.current;
      const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
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
      kick(timestamp);
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
  }, [sparkColor, sparkSize, sparkRadius, duration, easing, extraScale]);

  const handleClick = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
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
      if (animationIdRef.current === null) {
        animationIdRef.current = requestAnimationFrame(draw);
      }
    },
    [sparkCount, draw]
  );

  return (
    <div className={`relative h-full w-full ${className}`} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[9999] block select-none"
      />
      {children}
    </div>
  );
};

export default ClickSpark;
