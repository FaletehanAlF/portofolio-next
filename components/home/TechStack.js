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
    node: Icon ? <Icon size={18} aria-hidden="true" /> : null,
  };
});

function renderTechItem(item) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] leading-none tracking-[-0.01em] text-zinc-300 transition-colors hover:border-white/20 hover:text-white">
      <span className="inline-flex text-[18px] text-zinc-400">{item.node}</span>
      {item.title}
    </span>
  );
}

export default function TechStack() {
  if (!techStack || techStack.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1120px] px-6 py-10 sm:px-8 sm:py-12">
        <div className="shrink-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Tech Stack</p>
          <h2 className="mt-3 text-[16px] font-medium tracking-[-0.015em] text-white">Tools I work with</h2>
          <p className="mt-2 max-w-[480px] text-[13px] leading-5 text-zinc-500">
            Focus on web fundamentals, modern frontend, and backend essentials.
          </p>
        </div>

        <div className="mt-8">
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={36}
            gap={16}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#0a0a0a"
            renderItem={renderTechItem}
            ariaLabel="Tech stack"
          />
        </div>
      </div>
    </section>
  );
}
