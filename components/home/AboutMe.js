import { Caveat } from 'next/font/google';
import FlipCard from '@/components/ui/FlipCard.js';
import GridBackground from '@/components/ui/GridBackground.js';

const handwriting = Caveat({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const INK = '#f4f4f5';
const INK_SOFT = '#d4d4d8';

function Tape({ className = '', color = 'bg-[#c3d4f5]/80' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-6 w-16 shadow-[0_1px_2px_rgba(0,0,0,0.15)] ${color} ${className}`}
    />
  );
}

function Polaroid({ caption, rotate = '', front, back, flipLabel, tapeLeft = '', tapeRight = '' }) {
  return (
    <figure className={`relative mx-auto w-full max-w-[240px] ${rotate}`}>
      <Tape className={`-top-2 left-2 z-10 -rotate-45 ${tapeLeft}`} />
      <Tape className={`-top-2 right-2 z-10 rotate-45 ${tapeRight}`} />
      <div className="bg-white p-2 pb-1 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        <div className="flex justify-center">
          <FlipCard
            front={front}
            back={back}
            axis="y"
            flipOnClick={false}
            flipOnHover
            draggable
            tilt
            tiltMax={10}
            glare
            hoverScale={1.02}
            width={224}
            height={280}
            radius={6}
            background="#17171c"
            color="#f5f5f5"
            ariaLabel={flipLabel}
          />
        </div>
        <figcaption
          className={`${handwriting.className} py-1 text-center text-[20px] font-medium leading-none`}
          style={{ color: '#6b6b6b' }}
        >
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}

// Ilustrasi pengganti foto asli — ganti dengan <Image> jika foto sudah ada.
function PortraitArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-slate-300">
      <div className="absolute right-6 top-6 h-12 w-12 rounded-full bg-amber-200" />
      <div
        className="absolute bottom-0 left-0 h-[55%] w-[75%] bg-slate-400"
        style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
      />
      <div
        className="absolute bottom-0 right-0 h-[42%] w-[70%] bg-slate-500"
        style={{ clipPath: 'polygon(0 100%, 55% 0, 100% 100%)' }}
      />
      <div className="absolute bottom-0 h-[16%] w-full bg-slate-600/80" />
      <span
        className={`${handwriting.className} absolute bottom-4 left-0 right-0 text-center text-[64px] font-bold leading-none text-white/90`}
      >
        F
      </span>
    </div>
  );
}

function WorkspaceArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex flex-col bg-[#171a21] p-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-2 w-3/4 rounded-full bg-sky-400/80" />
        <div className="h-2 w-1/2 rounded-full bg-amber-300/80" />
        <div className="h-2 w-2/3 rounded-full bg-emerald-400/80" />
        <div className="h-2 w-2/5 rounded-full bg-pink-400/80" />
        <div className="h-2 w-3/5 rounded-full bg-violet-400/80" />
        <div className="h-2 w-1/3 rounded-full bg-sky-400/60" />
      </div>
      <span
        className={`${handwriting.className} mt-auto text-center text-[30px] font-semibold leading-none text-white/85`}
      >
        {'</>'}
      </span>
    </div>
  );
}

function ProfileBack() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-5 text-center">
      <p className={`${handwriting.className} text-[24px] font-semibold leading-none text-zinc-400`}>
        hello, i&apos;m
      </p>
      <p className="mt-2 text-[17px] font-semibold tracking-[-0.01em] text-white">
        Faletehan Al Farabi
      </p>
      <p className="mt-1 text-[12px] leading-5 text-zinc-400">
        Software Engineering Student
        <br />
        Full-Stack Web Developer
      </p>
    </div>
  );
}

function WorkspaceBack() {
  const tools = ['VS Code', 'Next.js', 'Tailwind CSS', 'Git & GitHub', 'Figma', 'Supabase'];
  return (
    <div className="flex h-full w-full flex-col justify-center p-5">
      <p className={`${handwriting.className} text-center text-[24px] font-semibold leading-none text-zinc-400`}>
        daily drivers
      </p>
      <ul className="mt-3 space-y-1.5">
        {tools.map((tool) => (
          <li
            key={tool}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-center text-[12px] text-zinc-300"
          >
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutMe() {
  return (
    <section aria-label="About me" className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a]">
      {/* Background interaktif yang sama persis seperti hero */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <GridBackground />
      </div>

      <div className="relative mx-auto max-w-[1120px] px-6 py-12 sm:px-8 sm:py-16">
        <p
          className={`${handwriting.className} -rotate-6 text-[22px] font-semibold`}
          style={{ color: INK }}
        >
          about me!
        </p>

        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:gap-8">
          <Polaroid
            caption="2024"
            rotate="-rotate-3"
            front={<PortraitArt />}
            back={<ProfileBack />}
            flipLabel="Photo card, flip for intro"
            tapeLeft="bg-[#c3d4f5]/80"
            tapeRight="bg-[#f5e6b8]/90"
          />

          <div className="order-first text-center lg:order-none">
            <h2
              className={`${handwriting.className} inline-block border-2 px-5 py-0.5 text-[30px] font-semibold leading-tight`}
              style={{ borderColor: INK, color: INK }}
            >
              what&apos;s up
            </h2>

            <p
              className={`${handwriting.className} mx-auto mt-6 max-w-[560px] text-[26px] font-medium leading-[1.35] sm:text-[28px]`}
              style={{ color: INK_SOFT }}
            >
              I&apos;m a software engineering student who gets a little too excited about turning
              ideas into websites. I care about clean interfaces, the small details everyone
              forgets, and shipping work that genuinely makes someone&apos;s day easier.
            </p>
          </div>

          <Polaroid
            caption="my workspace"
            rotate="rotate-2"
            front={<WorkspaceArt />}
            back={<WorkspaceBack />}
            flipLabel="Workspace card, flip for tools"
            tapeLeft="bg-[#c3d4f5]/80"
            tapeRight="bg-[#f5e6b8]/90"
          />
        </div>
      </div>
    </section>
  );
}
