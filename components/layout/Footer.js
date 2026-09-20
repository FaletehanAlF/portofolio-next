import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1120px] px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[13px] font-medium tracking-[-0.01em] text-white">Faletehan Al Farabi</p>
            <p className="mt-1.5 text-[13px] leading-5 text-zinc-500">
              Software Engineering Student — Full-Stack Web Developer
            </p>
          </div>
          <div className="flex gap-5">
            <Link href="/projects" className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-300">
              Projects
            </Link>
            <Link href="/experience" className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-300">
              Experience
            </Link>
            <Link href="/contact" className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-300">
              Contact
            </Link>
          </div>
        </div>
        <p className="mt-8 text-[12px] leading-5 text-zinc-600">© {new Date().getFullYear()} Faletehan Al Farabi. Built with Next.js & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
