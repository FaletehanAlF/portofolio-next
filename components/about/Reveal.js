'use client';

import { useEffect, useRef, useState } from 'react';

// Subtle scroll reveal — opacity + 8px rise, once per element.
// Content stays server-rendered; the effect only toggles a class,
// so there is no hydration mismatch. Disabled under reduced motion.
// Easing expo-out + will-change hanya saat hidden agar animasi
// berjalan di compositor (halus, tanpa jank) lalu layer dilepas.
export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  // Reduced-motion users see content immediately, no reveal needed.
  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const shown = visible || reducedMotion;
  return (
    <div
      ref={ref}
      style={{
        ...(delay ? { transitionDelay: `${delay}ms` } : null),
        willChange: shown ? 'auto' : 'opacity, transform',
      }}
      className={`${className} transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      } motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
    >
      {children}
    </div>
  );
}
