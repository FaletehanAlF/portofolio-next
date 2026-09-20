import Link from 'next/link';

export default function ContactCTA() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1120px] px-6 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-9">
          <div>
            <h2 className="text-[18px] font-medium leading-6 tracking-[-0.02em] text-white sm:text-[20px]">
              Let&apos;s build something meaningful.
            </h2>
            <p className="mt-2 max-w-[480px] text-[13px] leading-5 text-zinc-400">
              Open for collaboration, freelance work, and conversations about web development.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-white px-5 text-[13px] font-medium tracking-[-0.01em] text-black transition-colors hover:bg-zinc-200"
          >
            Contact Me <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
