import PixelSnow from '@/components/ui/PixelSnow.js';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white dark:bg-black">
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
          className="h-full w-full opacity-60 dark:opacity-40"
          style={{ background: 'transparent' }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[480px] w-full max-w-3xl flex-col justify-center px-6 py-24 sm:min-h-[520px] sm:px-8 sm:py-28">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Hero placeholder</h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Hero section placeholder. PixelSnow background is decorative and does not affect readability.
        </p>
      </div>
    </section>
  );
}
