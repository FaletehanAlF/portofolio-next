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
  // React 19 mengangkat <link> ini ke <head> — aset mulai diunduh paralel
  // dengan chunk JS, sehingga kartu tidak telat muncul.
  return (
    <>
      <link rel="preload" href="/images/lanyard/card.glb" as="fetch" crossOrigin="anonymous" />
      <link rel="preload" href="/images/lanyard/lanyard.png" as="image" />
      {props.frontImage ? <link rel="preload" href={props.frontImage} as="image" /> : null}
      {props.backImage && props.backImage !== props.frontImage ? (
        <link rel="preload" href={props.backImage} as="image" />
      ) : null}
      <Lanyard {...props} />
    </>
  );
}
