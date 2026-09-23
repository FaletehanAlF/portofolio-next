import Link from 'next/link';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GridBackground from '@/components/ui/GridBackground.js';
import Reveal from '@/components/about/Reveal.js';

const display = Space_Grotesk({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const body = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const INFO_ITEMS = [
  {
    label: 'Location',
    value: 'Indonesia',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 14s-5-4.5-5-7a5 5 0 1110 0c0 2.5-5 7-5 7z" />
        <circle cx="8" cy="5.5" r="1.5" />
      </svg>
    ),
  },
  {
    label: 'Education',
    value: 'SMK Taruna Bhakti — Rekayasa Perangkat Lunak (RPL)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6l6-3.5L14 6v6.5a1 1 0 01-1 1h-12a1 1 0 01-1-1V6z" />
        <path d="M8 14v-4" />
      </svg>
    ),
  },
  {
    label: 'Focus',
    value: 'Web Development & UI/UX',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3l-3 5 3 4M11 3l3 5-3 4M8 6v4" />
      </svg>
    ),
  },
  {
    label: 'Currently learning',
    value: 'Full-Stack Development',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4h12v8H2V4z" />
        <path d="M2 8h12" />
      </svg>
    ),
  },
];

export const metadata = {
  title: 'About',
  description:
    'About Faletehan Al Farabi — Software Engineering student focused on full-stack web development.',
};

export default function AboutPage() {
  return (
    <div className={body.className}>
      <Navbar />

      <main className="page-enter bg-[#0a0a0a]">
        {/* 1 — Hero / Intro */}
        <section id="about" className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <GridBackground />
          </div>

          <div className="mx-auto max-w-[1120px] px-6 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-16">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)] lg:gap-12">
              {/* Left */}
              <Reveal>
                <p
                  className={`${mono.className} flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500`}
                >
                  <span aria-hidden="true" className="inline-block h-px w-6 bg-[#22d3ee]" />
                  About Me
                </p>
                <h1
                  className={`${display.className} mt-5 max-w-[700px] text-[clamp(1.75rem,3vw+1rem,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white`}
                >
                  Turning Ideas into Functional and User-Friendly Web Solutions.
                </h1>
                <div className="mt-6 max-w-[650px] space-y-4 text-[15px] leading-7 text-zinc-400">
                  <p>
                    I am a Software Engineering student at SMK Taruna Bhakti with an interest in web
                    development and UI/UX design. I enjoy building responsive, user-friendly websites
                    while continuously learning new technologies.
                  </p>
                  <p>
                    Through school projects, personal projects, and self-learning, I continue to
                    develop my technical skills and explore modern web development.
                  </p>
                </div>
              </Reveal>

              {/* Right */}
              <Reveal delay={80} className="mt-6 lg:mt-0">
                <div className="flex flex-col gap-3">
                  {/* Profile area — no fake image. Empty container maintains layout for when real image is added. */}
                  <div className="aspect-[4/5] w-full rounded-2xl border border-white/10 bg-white/[0.02]" />

                  {/* Metric cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4">
                      <p
                        className={`${mono.className} text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500`}
                      >
                        Projects
                      </p>
                      <p
                        className={`${display.className} mt-1.5 text-[14px] font-semibold leading-tight text-white`}
                      >
                        Web Projects
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4">
                      <p
                        className={`${mono.className} text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500`}
                      >
                        Certificates
                      </p>
                      <p
                        className={`${display.className} mt-1.5 text-[14px] font-semibold leading-tight text-white`}
                      >
                        Learning &amp; Course
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4">
                      <p
                        className={`${mono.className} text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500`}
                      >
                        Current Focus
                      </p>
                      <p
                        className={`${display.className} mt-1.5 text-[14px] font-semibold leading-tight text-white`}
                      >
                        Web Dev &amp; UI/UX
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 2 — A Little More About Me */}
        <section aria-label="A little more about me" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1120px] px-6 py-14 sm:px-8 sm:py-16">
            <Reveal>
              <p
                className={`${mono.className} text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500`}
              >
                A Little More About Me
              </p>
            </Reveal>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {INFO_ITEMS.map((item) => (
                <Reveal key={item.label} delay={60}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex-shrink-0 text-zinc-400">{item.icon}</span>
                      <p
                        className={`${mono.className} text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500`}
                      >
                        {item.label}
                      </p>
                    </div>
                    <p className="mt-2.5 text-[15px] leading-7 text-zinc-200">{item.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — Education Highlight */}
        <section aria-label="Education" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1120px] px-6 py-14 sm:px-8 sm:py-16">
            <Reveal>
              <p
                className={`${mono.className} text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500`}
              >
                My Education
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-start sm:p-8">
              {/* Logo — only if real asset exists. Currently no logo available, so text placeholder. */}
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
                <span
                  className={`${display.className} text-lg font-semibold tracking-tight text-zinc-600`}
                >
                  STB
                </span>
              </div>
              <div>
                <h3
                  className={`${display.className} text-[20px] font-semibold leading-7 tracking-[-0.02em] text-white`}
                >
                  SMK Taruna Bhakti
                </h3>
                <p
                  className={`${mono.className} mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400`}
                >
                  Rekayasa Perangkat Lunak (RPL)
                </p>
                <p className="mt-3 max-w-[560px] text-[14px] leading-7 text-zinc-400">
                  Di SMK Taruna Bhakti, saya mempelajari dasar-dasar pengembangan perangkat lunak
                  dan membangun fondasi untuk berkembang sebagai Software Engineer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 — Where I'm Heading */}
        <section aria-label="Where I'm heading" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1120px] px-6 py-14 sm:px-8 sm:py-16">
            <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
              <Reveal>
                <p
                  className={`${mono.className} text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500`}
                >
                  Where I&apos;m Heading
                </p>
                <p className="mt-5 max-w-[650px] text-[15px] leading-8 text-zinc-400">
                  Saya ingin terus berkembang sebagai Software Engineer melalui project yang semakin
                  kompleks, memahami masalah dari sisi pengguna, dan secara bertahap mengeksplorasi AI
                  engineering sebagai bagian dari perjalanan belajar saya.
                </p>
              </Reveal>

              <Reveal delay={60}>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-zinc-200 underline decoration-white/20 underline-offset-8 transition-colors hover:text-white hover:decoration-white/60"
                >
                  View My Projects
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}