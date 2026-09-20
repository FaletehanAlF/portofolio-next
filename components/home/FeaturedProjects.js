import Link from 'next/link';
import { projects } from '@/data/projects.js';
import ProjectCard from '@/components/projects/ProjectCard.js';

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1120px] px-6 py-10 sm:px-8 sm:py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Selected Work</p>
            <h2 className="mt-3 text-[18px] font-medium tracking-[-0.02em] text-white">Featured Projects</h2>
          </div>
          <Link href="/projects" className="hidden text-[13px] font-medium text-zinc-400 hover:text-white sm:inline-flex">
            View all <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center">
            <p className="text-[13px] leading-5 text-zinc-400">Projects are being curated. Explore the full archive.</p>
          </div>
        )}

        <Link
          href="/projects"
          className="mt-6 inline-flex text-[13px] font-medium text-zinc-400 hover:text-white sm:hidden"
        >
          View all <span aria-hidden="true" className="ml-1">→</span>
        </Link>
      </div>
    </section>
  );
}
