import { techStack } from '@/data/tech-stack.js';

export default function TechStack() {
  if (!techStack || techStack.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1120px] px-6 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="shrink-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Tech Stack</p>
            <h2 className="mt-3 text-[16px] font-medium tracking-[-0.015em] text-white">Tools I work with</h2>
            <p className="mt-2 max-w-[320px] text-[13px] leading-5 text-zinc-500">Focus on web fundamentals and modern frontend.</p>
          </div>

          <ul className="flex flex-wrap gap-2 sm:max-w-[560px] sm:justify-end">
            {techStack.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[13px] leading-none tracking-[-0.01em] text-zinc-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
