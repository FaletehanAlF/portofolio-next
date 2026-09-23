'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import GooeyNav from '@/components/ui/GooeyNav.js';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/education', label: 'Education' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActiveLink = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent px-4 pt-4 sm:px-6">
      <nav
        className="mx-auto flex h-[56px] max-w-[1120px] items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 sm:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="text-[13px] font-medium tracking-[-0.01em] text-white">
          Faletehan Al Farabi
        </Link>

        <div className="hidden items-center md:flex">
          <GooeyNav
            items={navLinks}
            particleCount={10}
            particleDistances={[60, 12]}
            particleR={60}
            animationTime={500}
            timeVariance={200}
            colors={[1, 1, 1, 1, 1, 1]}
            initialActiveIndex={0}
          />
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-white/20 hover:text-white md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {open ? (
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            ) : (
              <path d="M2.5 5H13.5M2.5 8H13.5M2.5 11H13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu — selalu mounted, buka/tutup via animasi grid-rows +
          opacity (GPU-friendly, tanpa layout thrash). visibility bertransisi
          agar link tak bisa di-tab saat tertutup. */}
      <div
        className={`mx-auto grid max-w-[1120px] transition-[grid-template-rows,opacity,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-2 rounded-3xl border border-white/10 bg-[#0a0a0a]/80 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150">
            <div className="flex flex-col px-4 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActiveLink(link.href) ? 'page' : undefined}
                  tabIndex={open ? 0 : -1}
                  className={`rounded-full py-3 text-[14px] font-normal transition-colors hover:bg-white/[0.06] hover:text-white ${
                    isActiveLink(link.href) ? 'text-white' : 'text-zinc-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
