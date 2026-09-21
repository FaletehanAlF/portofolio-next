import { Caveat } from 'next/font/google';
import { FaBolt, FaCode, FaPalette, FaServer } from 'react-icons/fa';

const handwriting = Caveat({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const INK = '#232323';

// Tepi robek ala washi tape (kiri-kanan bergerigi, atas-bawah lurus).
const TORN_EDGES =
  'polygon(8px 0, calc(100% - 8px) 0, 100% 14%, calc(100% - 5px) 28%, 100% 42%, calc(100% - 5px) 56%, 100% 70%, calc(100% - 5px) 84%, calc(100% - 8px) 100%, 8px 100%, 0 86%, 5px 72%, 0 58%, 5px 44%, 0 30%, 5px 16%)';

function Tape({ className = '', color = 'bg-[#c3d4f5]/80' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-6 w-16 shadow-[0_1px_2px_rgba(0,0,0,0.15)] ${color} ${className}`}
    />
  );
}

function Polaroid({ caption, rotate = '', children, tapeLeft = '', tapeRight = '' }) {
  return (
    <figure className={`relative mx-auto w-full max-w-[240px] ${rotate}`}>
      <Tape className={`-top-2 left-2 -rotate-45 ${tapeLeft}`} />
      <Tape className={`-top-2 right-2 rotate-45 ${tapeRight}`} />
      <div className="bg-white p-2 pb-1 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200">{children}</div>
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

function Tag({ label, bg, fg, rotate = '' }) {
  return (
    <span
      className={`${handwriting.className} ${rotate} inline-block px-6 py-1.5 text-[24px] font-bold leading-none`}
      style={{ backgroundColor: bg, color: fg, clipPath: TORN_EDGES }}
    >
      {label}
    </span>
  );
}

function Tile({ bg, fg, label, children }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center text-[18px]"
      style={{ backgroundColor: bg, color: fg, clipPath: TORN_EDGES }}
    >
      {children}
    </span>
  );
}

export default function AboutMe() {
  return (
    <section aria-label="About me" className="relative overflow-hidden bg-[#faf8f2]">
      {/* Garis buku tulis */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0 31px, rgba(35,35,35,0.07) 31px 32px)',
        }}
      />

      <div className="relative mx-auto max-w-[1120px] px-6 py-12 sm:px-8 sm:py-16">
        <p
          className={`${handwriting.className} -rotate-6 text-[22px] font-semibold`}
          style={{ color: INK }}
        >
          about me!
        </p>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:gap-8">
          <Polaroid caption="2024" rotate="-rotate-3" tapeLeft="bg-[#c3d4f5]/80" tapeRight="bg-[#f5e6b8]/90">
            <PortraitArt />
          </Polaroid>

          <div className="text-center">
            <h2
              className={`${handwriting.className} inline-block border-2 px-5 py-0.5 text-[30px] font-semibold leading-tight`}
              style={{ borderColor: INK, color: INK }}
            >
              what&apos;s up
            </h2>

            <p
              className={`${handwriting.className} mx-auto mt-6 max-w-[560px] text-[26px] font-medium leading-[1.35] sm:text-[28px]`}
              style={{ color: INK }}
            >
              I&apos;m a software engineering student who gets a little too excited about turning
              ideas into websites. I care about clean interfaces, the small details everyone
              forgets, and shipping work that genuinely makes someone&apos;s day easier.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
              <Tag label="Frontend Dev" bg="#ffc531" fg="#232323" rotate="-rotate-1" />
              <Tile bg="#e0a90f" fg="#232323" label="Code icon">
                <FaCode aria-hidden="true" />
              </Tile>
              <Tag label="Backend Dev" bg="#2fbf71" fg="#ffffff" rotate="rotate-1" />
              <Tile bg="#1f9d58" fg="#ffffff" label="Server icon">
                <FaServer aria-hidden="true" />
              </Tile>
              <Tag label="UI Design" bg="#f4588a" fg="#ffffff" rotate="-rotate-1" />
              <Tile bg="#d63f72" fg="#ffffff" label="Palette icon">
                <FaPalette aria-hidden="true" />
              </Tile>
              <Tag label="Motion Design" bg="#2f5bff" fg="#101010" rotate="rotate-1" />
              <Tile bg="#2446c4" fg="#ffffff" label="Motion icon">
                <FaBolt aria-hidden="true" />
              </Tile>
            </div>
          </div>

          <Polaroid
            caption="my workspace"
            rotate="rotate-2"
            tapeLeft="bg-[#c3d4f5]/80"
            tapeRight="bg-[#f5e6b8]/90"
          >
            <WorkspaceArt />
          </Polaroid>
        </div>
      </div>
    </section>
  );
}
