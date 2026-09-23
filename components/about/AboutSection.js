import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
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

const SNAPSHOT = [
  { label: 'Role', value: 'Software Engineering Student' },
  { label: 'Focus', value: 'Full-Stack Web Development' },
  { label: 'Education', value: 'SMK Taruna Bhakti' },
  { label: 'Interests', value: 'Web Development · UI/UX · Software Engineering · AI' },
];

const LEARN_POINTS = [
  'Self-learning through documentation, courses, and experimentation.',
  'Hands-on projects as the main way to understand new technology.',
  'Trying tools and frameworks inside real work, not isolated tutorials.',
  'Learning from bootcamps and courses, then applying it right away.',
  'Revisiting and improving projects based on feedback.',
  'Understanding the reasoning behind code, not just copying it.',
];

const FUTSAL_TRAITS = ['Teamwork', 'Discipline', 'Leadership', 'Communication'];

function SectionHeading({ children }) {
  return (
    <h3
      className={`${display.className} text-[20px] font-semibold leading-7 tracking-[-0.02em] text-white sm:text-[22px]`}
    >
      {children}
    </h3>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About me"
      className={`${body.className} relative isolate scroll-mt-24 overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a]`}
    >
      {/* Background interaktif yang sama persis seperti hero */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <GridBackground />
      </div>

      <div className="relative mx-auto max-w-[1120px] px-6 py-12 sm:px-8 sm:py-16">
        {/* Header */}
        <Reveal>
          <p
            className={`${mono.className} flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500`}
          >
            <span aria-hidden="true" className="inline-block h-px w-6 bg-[#22d3ee]" />
            About me
          </p>
          <h2
            className={`${display.className} mt-5 max-w-[560px] text-[clamp(1.6rem,3vw+1rem,2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white`}
          >
            A little about me.
          </h2>
          <p className="mt-5 max-w-[560px] text-[14px] leading-7 text-zinc-400 sm:text-[14.5px]">
            I&apos;m a Software Engineering student growing through real projects,
            self-learning, and exploring how the web works — from interface to backend.
          </p>
        </Reveal>

        {/* Who I am */}
        <div className="mt-12 border-t border-white/[0.06] pt-10">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:gap-14">
            <Reveal>
              <SectionHeading>Who I am</SectionHeading>
              <div className="mt-5 max-w-[600px] space-y-4 text-[14px] leading-7 text-zinc-400 sm:text-[14.5px]">
                <p>
                  I study Software Engineering at SMK Taruna Bhakti, where I discovered
                  that I enjoy building websites and digital experiences — the kind
                  people actually use.
                </p>
                <p>
                  I learn best by making things: starting small projects, breaking them,
                  and figuring out why something works the way it does.
                </p>
                <p>
                  Right now I&apos;m deepening my frontend and backend fundamentals while
                  paying attention to UI/UX and the technologies around modern web
                  development.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <dl className="border-t border-white/[0.06]">
                {SNAPSHOT.map((item) => (
                  <div key={item.label} className="border-b border-white/[0.06] py-4">
                    <dt
                      className={`${mono.className} text-[10.5px] font-medium uppercase tracking-[0.16em] text-zinc-500`}
                    >
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 text-[13.5px] leading-6 text-zinc-200">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* How I learn */}
        <div className="mt-12 border-t border-white/[0.06] pt-10">
          <Reveal>
            <SectionHeading>How I learn</SectionHeading>
            <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-zinc-400 sm:text-[14.5px]">
              Most of my learning is self-directed. I pick up new things by using them
              in real work — reading the docs, trying things out, and going back to
              improve my projects when I understand more or get feedback.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <ul className="mt-8 max-w-[640px] border-t border-white/[0.06]">
              {LEARN_POINTS.map((point) => (
                <li
                  key={point}
                  className="border-b border-white/[0.06] py-3.5 text-[13.5px] leading-6 text-zinc-300"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Beyond code */}
        <div className="mt-12 border-t border-white/[0.06] pt-10">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:gap-14">
            <Reveal>
              <SectionHeading>Beyond code</SectionHeading>
              <p className="mt-5 max-w-[600px] text-[14px] leading-7 text-zinc-400 sm:text-[14.5px]">
                Outside of code, I play futsal. It&apos;s simply something I enjoy, but
                it has quietly shaped how I work with others — showing up consistently,
                trusting teammates, and communicating on and off the field.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p
                className={`${mono.className} text-[10.5px] font-medium uppercase tracking-[0.16em] text-zinc-500`}
              >
                Futsal
              </p>
              <ul className="mt-3 border-t border-white/[0.06]">
                {FUTSAL_TRAITS.map((trait) => (
                  <li
                    key={trait}
                    className="border-b border-white/[0.06] py-3 text-[13.5px] leading-6 text-zinc-300"
                  >
                    {trait}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* What I'm working toward */}
        <div className="mt-12 border-t border-white/[0.06] pt-10">
          <Reveal>
            <SectionHeading>What I&apos;m working toward</SectionHeading>
            <div className="mt-5 max-w-[600px] space-y-4 text-[14px] leading-7 text-zinc-400 sm:text-[14.5px]">
              <p>
                I want to keep growing as a software engineer — strengthening my web
                development skills, taking on more complex projects, and understanding
                how technology is used to solve real problems.
              </p>
              <p>
                Along the way, I&apos;m gradually exploring AI engineering as a
                direction to learn, not a title I claim today.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
