'use client';

import dynamic from 'next/dynamic';

// Lanyard uses WebGL + Rapier physics — client-only so SSR never evaluates
// browser/WASM code paths. This wrapper is a Client Component, so
// next/dynamic with `ssr: false` is allowed here. Hero.js stays a Server
// Component and only imports this wrapper.
const Lanyard = dynamic(() => import('@/components/ui/Lanyard.js'), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="h-[320px] w-full sm:h-[380px] lg:h-[520px]" />,
});

export default function LanyardWrapper(props) {
  return <Lanyard {...props} />;
}
