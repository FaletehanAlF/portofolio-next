'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Lanyard uses WebGL + Rapier physics — client-only so SSR never evaluates
// browser/WASM code paths. This wrapper is a Client Component, so
// next/dynamic with `ssr: false` is allowed here. Hero.js stays a Server
// Component and only imports this wrapper.
const Lanyard = dynamic(() => import('@/components/ui/Lanyard.js'), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="h-[320px] w-full sm:h-[380px] lg:h-[520px]" />,
});

// Warm the network cache for the assets Lanyard suspends on, in parallel
// with the JS chunk, so the card does not pop in late.
function preload(href, as, type) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  if (type) link.type = type;
  document.head.appendChild(link);
}

export default function LanyardWrapper(props) {
  useEffect(() => {
    preload('/images/lanyard/card.glb', 'fetch', 'model/gltf-binary');
    preload('/images/lanyard/lanyard.png', 'image');
    if (props.frontImage) preload(props.frontImage, 'image');
    if (props.backImage && props.backImage !== props.frontImage) preload(props.backImage, 'image');
  }, [props.frontImage, props.backImage]);

  return <Lanyard {...props} />;
}
