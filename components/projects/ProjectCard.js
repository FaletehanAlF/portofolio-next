import Link from 'next/link';

export default function ProjectCard({ project }) {
  if (!project) return null;

  const { slug, title, category, year, description, tech, image, links } = project;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
      {image ? (
        <div className="aspect-[16/10] overflow-hidden bg-white/[0.04]">
          <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-zinc-500">
          {category ? <span>{category}</span> : null}
          {category && year ? <span className="text-white/20">•</span> : null}
          {year ? <span>{year}</span> : null}
        </div>

        <h3 className="mt-2 text-[15px] font-medium leading-5 tracking-[-0.015em] text-white">{title}</h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-zinc-400">{description}</p>

        {tech && tech.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tech.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] leading-none text-zinc-300">
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex gap-3">
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center text-[13px] font-medium tracking-[-0.01em] text-white transition-colors hover:text-zinc-300"
          >
            View Project <span aria-hidden="true" className="ml-1">→</span>
          </Link>
          {links?.github ? (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[13px] text-zinc-500 transition-colors hover:text-zinc-300"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
