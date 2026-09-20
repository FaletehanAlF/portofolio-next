import Link from 'next/link';
import { experiences } from '@/data/experience.js';

export default function ExperiencePreview() {
  const items = experiences.slice(0, 2);

  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1120px] px-6 py-10 sm:px-8 sm:py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Experience</p>
            <h2 className="mt-3 text-[18px] font-medium tracking-[-0.02em] text-white">Competition & Practice</h2>
          </div>
          <Link href="/experience" className="hidden text-[13px] font-medium text-zinc-400 hover:text-white sm:inline-flex">
            View Experience <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-5 sm:px-6 sm:py-6"
            >
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-zinc-500">
                <span>{item.category}</span>
                <span className="text-white/20">•</span>
                <span>{item.date}</span>
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.08em] text-zinc-500">{item.role}</p>
              <h3 className="mt-1 text-[15px] font-medium tracking-[-0.015em] text-white">{item.title}</h3>
              <p className="mt-2 max-w-[720px] text-[13px] leading-5 text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>

        <Link
          href="/experience"
          className="mt-6 inline-flex text-[13px] font-medium text-zinc-400 hover:text-white sm:hidden"
        >
          View Experience <span aria-hidden="true" className="ml-1">→</span>
        </Link>
      </div>
    </section>
  );
}
