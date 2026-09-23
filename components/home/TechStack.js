'use client';

import {
  SiCss,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
} from 'react-icons/si';
import LogoLoop from '@/components/ui/LogoLoop.js';
import GridBackground from '@/components/ui/GridBackground.js';
import { techStack } from '@/data/tech-stack.js';

const techIcons = {
  HTML5: SiHtml5,
  CSS3: SiCss,
  JavaScript: SiJavascript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  MySQL: SiMysql,
  Supabase: SiSupabase,
  Git: SiGit,
  GitHub: SiGithub,
  Figma: SiFigma,
};

const techLogos = techStack.map((name) => {
  const Icon = techIcons[name];
  return {
    title: name,
    ariaLabel: name,
    node: Icon ? (
      <span title={name} className="inline-flex">
        <Icon size={44} aria-hidden="true" />
      </span>
    ) : null,
  };
});

export default function TechStack() {
  if (!techStack || techStack.length === 0) {
    return null;
  }

  return (
    <section className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#0a0a0a]">
      {/* Background interaktif yang sama persis seperti hero */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <GridBackground />
      </div>
      <div className="relative mx-auto max-w-[1120px] px-6 py-10 sm:px-8">
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={44}
          gap={72}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#0a0a0a"
          ariaLabel="Tech stack"
          className="text-zinc-500"
        />
      </div>
    </section>
  );
}
