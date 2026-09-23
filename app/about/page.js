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
                  className={`${mono.className} text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500`}
                >
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
                {/* Profile area — no fake image. Empty container maintains layout for when real image is added. */}
                <div className="aspect-[4/5] w-full rounded-2xl border border-white/10 bg-white/[0.02]" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 2 — Where I'm Heading */}
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