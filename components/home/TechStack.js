'use client';

import ScrollVelocity from '@/components/ui/ScrollVelocity.js';
import GridBackground from '@/components/ui/GridBackground.js';

export default function TechStack() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <GridBackground />
      </div>
      <div className="relative mx-auto max-w-[1120px] px-6 py-10 sm:px-8">
        <ScrollVelocity
          texts={['Rekayasa Perangkat Lunak', 'Software Engineering']}
          velocity={80}
          numCopies={6}
          className="text-zinc-400"
          damping={50}
          stiffness={400}
          velocityMapping={{ input: [0, 1000], output: [0, 5] }}
        />
      </div>
    </section>
  );
}