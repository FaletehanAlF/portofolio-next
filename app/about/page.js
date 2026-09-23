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

export const metadata = {
  title: 'About',
  description:
    'About Faletehan Al Farabi — Software Engineering student focused on full-stack web development.',
};

const PROFILE_ROWS = [
  { label: 'Focus', value: 'Full-Stack Web Development' },
  { label: 'Currently learning', value: 'Frontend, Backend, UI/UX & Software Engineering' },
  { label: 'Interests', value: 'Web Development · UI/UX · AI' },
];

export default function AboutPage() {
  return (
    <div className={body.className}>
      <Navbar />

      <main className="bg-[#0a0a0a]">
        {/* 1 — About intro */}
        <section className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <GridBackground />
          </div>

          <div className="mx-auto max-w-[1120px] px-6 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
            <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-16">
              <Reveal>
                <p
                  className={`${mono.className} flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500`}
                >
                  <span aria-hidden="true" className="inline-block h-px w-6 bg-[#22d3ee]" />
                  About me
                </p>
                <h1
                  className={`${display.className} mt-5 max-w-[560px] text-[clamp(2.125rem,4vw+1.5rem,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white`}
                >
                  Building, learning, and growing through real projects.
                </h1>
                <div className="mt-6 max-w-[560px] space-y-4 text-[16px] leading-8 text-zinc-400">
                  <p>
                    Saya adalah Software Engineering student di SMK Taruna Bhakti yang
                    tertarik pada web development dan bagaimana teknologi dapat digunakan
                    untuk membuat digital experiences yang berguna.
                  </p>
                  <p>
                    Saya banyak belajar melalui hands-on projects, self-learning, courses,
                    dan mencoba teknologi secara langsung. Saat ini saya terus memperkuat
                    kemampuan frontend, backend, UI/UX, dan software engineering.
                  </p>
                </div>
              </Reveal>

              {/* Blok tipografi pengganti foto — folder profile/ masih kosong,
                  jadi tidak ada placeholder image. Ganti dengan <Image> 4:5
                  saat foto asli sudah tersedia. */}
              <Reveal delay={80} className="mx-auto w-full max-w-[320px] md:mx-0 md:justify-self-end">
                <div className="flex aspect-[4/5] w-full flex-col items-center justify-center border border-white/10 bg-white/[0.02] px-6 text-center">
                  <p
                    className={`${display.className} text-[64px] font-semibold leading-none tracking-[-0.02em] text-zinc-100`}
                  >
                    FA
                  </p>
                  <p
                    className={`${mono.className} mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400`}
                  >
                    Faletehan Al Farabi
                  </p>
                  <p
                    className={`${mono.className} mt-2 text-[10.5px] uppercase tracking-[0.16em] text-zinc-500`}
                  >
                    Software Engineering Student
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 2 — A short profile */}
        <section aria-label="A little more about me" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1120px] px-6 py-20 sm:px-8 sm:py-24">
            <Reveal>
              <h2
                className={`${display.className} text-[20px] font-semibold leading-7 tracking-[-0.02em] text-white sm:text-[22px]`}
              >
                A little more about me
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <dl className="mt-8 max-w-[720px] border-t border-white/[0.06]">
                {PROFILE_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="grid gap-1.5 border-b border-white/[0.06] py-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6"
                  >
                    <dt
                      className={`${mono.className} text-[10.5px] font-medium uppercase tracking-[0.16em] text-zinc-500 sm:pt-1`}
                    >
                      {row.label}
                    </dt>
                    <dd className="text-[15px] leading-7 text-zinc-200">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* 3 — Direction */}
        <section aria-label="Where I'm heading" className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1120px] px-6 py-20 sm:px-8 sm:py-24">
            <Reveal>
              <h2
                className={`${display.className} text-[20px] font-semibold leading-7 tracking-[-0.02em] text-white sm:text-[22px]`}
              >
                Where I&apos;m heading
              </h2>
              <p className="mt-5 max-w-[600px] text-[16px] leading-8 text-zinc-400">
                Saya ingin terus berkembang sebagai Software Engineer dengan membangun
                project yang semakin kompleks, memahami masalah nyata dari sisi pengguna,
                dan secara bertahap mengeksplorasi AI engineering sebagai bagian dari
                perjalanan belajar saya.
              </p>
              <Link
                href="/projects"
                className="group mt-7 inline-flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-zinc-200 underline decoration-white/20 underline-offset-8 transition-colors hover:text-white hover:decoration-white/60"
              >
                View My Projects
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
