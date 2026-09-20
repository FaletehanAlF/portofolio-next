import Link from 'next/link';
import PixelSnow from '@/components/ui/PixelSnow.js';
import LanyardWrapper from '@/components/home/LanyardWrapper.js';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <PixelSnow
          color="#ffffff"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={200}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="square"
          className="h-full w-full opacity-[0.28]"
          style={{ background: 'transparent' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/0 via-[#0a0a0a]/0 to-[#0a0a0a]" />
      </div>

      <div className="mx-auto max-w-[1120px] px-6 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
          <div className="relative z-10 max-w-[640px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Software Engineering Student</p>

            <h1 className="mt-4 text-[30px] font-[600] leading-[1.05] tracking-[-0.03em] text-white sm:text-[36px] lg:text-[40px]">
              Faletehan Al Farabi
            </h1>

            <p className="mt-3 text-[15px] font-normal leading-6 tracking-[-0.01em] text-zinc-400 sm:text-[16px]">
              Full-Stack Web Developer
            </p>

            <p className="mt-5 max-w-[560px] text-[14px] leading-6 text-zinc-400 sm:text-[14.5px] sm:leading-7">
              Saya membangun website dan digital experiences dengan fokus pada clean interface, usability, dan solusi yang
              relevan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-[13px] font-medium tracking-[-0.01em] text-black transition-colors hover:bg-zinc-200"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center rounded-full border border-white/15 bg-transparent px-5 text-[13px] font-medium tracking-[-0.01em] text-white transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                Contact Me
              </Link>
            </div>
          </div>

          <div className="relative z-0 mx-auto w-full max-w-[420px] sm:max-w-[480px] lg:max-w-none">
            <LanyardWrapper
              position={[0, 0, 20]}
              gravity={[0, -40, 0]}
              className="h-[320px] w-full sm:h-[380px] lg:h-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
