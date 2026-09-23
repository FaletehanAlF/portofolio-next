'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import GooeyNav from '@/components/ui/GooeyNav.js';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/education', label: 'Education' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/contact', label: 'Contact' },
];

const ABOUT_HREF = '/#about';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Scroll-spy khusus homepage: pill aktif mengikuti posisi scroll
  // (Hero → Home, section #about → About). Di route lain null = ikuti pathname.
  // Nilai awal selalu null agar render server & client identik (tanpa hydration
  // mismatch); sinkronisasi hash/scroll hanya jalan setelah mount (client-only).
  const [spyActive, setSpyActive] = useState(null);

  useEffect(() => {
    if (pathname !== '/') return undefined;
    const about = document.getElementById('about');
    if (!about) return undefined;
    const sync = () => {
      if (window.location.hash === '#about') {
        setSpyActive(ABOUT_HREF);
        return;
      }
      const top = about.getBoundingClientRect().top + window.scrollY;
      setSpyActive(window.scrollY >= top - 120 ? ABOUT_HREF : '/');
    };
    // Dijadwalkan via rAF (bukan sinkron di body effect) agar tidak memicu
    // cascading render dan lolos aturan set-state-in-effect.
    const raf = requestAnimationFrame(sync);
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [pathname]);

  const isActiveLink = (href) => {
    if (spyActive) return href === spyActive;
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
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
            activeHref={spyActive}
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

      {open ? (
        <div className="mx-auto mt-2 max-w-[1120px] rounded-3xl border border-white/10 bg-[#0a0a0a]/80 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 md:hidden">
          <div className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActiveLink(link.href) ? 'page' : undefined}
                className={`rounded-full py-3 text-[14px] font-normal transition-colors hover:bg-white/[0.06] hover:text-white ${
                  isActiveLink(link.href) ? 'text-white' : 'text-zinc-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
