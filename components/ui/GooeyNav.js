'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

function resolveActiveIndex(items, pathname, fallback = 0) {
  if (!pathname || !Array.isArray(items)) return fallback;
  const idx = items.findIndex((item) => {
    if (!item || !item.href) return false;
    if (item.href === '/') return pathname === '/';
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  });
  return idx >= 0 ? idx : fallback;
}

export default function GooeyNav({
  items = [],
  animationTime = 500,
  particleCount = 10,
  particleDistances = [60, 12],
  particleR = 60,
  timeVariance = 200,
  colors = [1, 1, 1, 1, 1, 1],
  initialActiveIndex = 0,
  // Override opsional (mis. dari scroll-spy): href item yang sedang aktif.
  // Null = ikuti route saat ini seperti biasa.
  activeHref = null,
}) {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const timeoutsRef = useRef(new Set());
  const mountedRef = useRef(true);

  const pathname = usePathname();
  // Single source of truth = route saat ini (tidak ada mirror state → tanpa setState di effect).
  // Klik beda-halaman menggerakkan pill + partikel secara optimistis via DOM;
  // class aktif mengikuti pathname setelah navigasi selesai. Klik satu-halaman
  // (anchor) TIDAK optimistis — pill mengikuti scroll-spy agar tidak ganda.
  // activeHref (mis. dari scroll-spy) menang atas pathname bila cocok dengan salah satu item.
  let activeIndex = pathname
    ? resolveActiveIndex(items, pathname, initialActiveIndex)
    : initialActiveIndex;
  if (activeHref) {
    const overrideIndex = items.findIndex((item) => item && item.href === activeHref);
    if (overrideIndex >= 0) activeIndex = overrideIndex;
  }

  const later = useCallback((fn, ms) => {
    const id = window.setTimeout(() => {
      timeoutsRef.current.delete(id);
      if (mountedRef.current) fn();
    }, ms);
    timeoutsRef.current.add(id);
    return id;
  }, []);

  const noise = useCallback((n = 1) => n / 2 - Math.random() * n, []);

  const getXY = useCallback(
    (distance, pointIndex, totalPoints) => {
      const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
      return [distance * Math.cos(angle), distance * Math.sin(angle)];
    },
    [noise]
  );

  const updateEffectPosition = useCallback((element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current || !element) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.textContent = element.textContent;
  }, []);

  const makeParticles = useCallback(
    (element) => {
      if (!element || !element.isConnected) return;
      const d = particleDistances;
      const r = particleR;
      const bubbleTime = animationTime * 2 + timeVariance;
      element.style.setProperty('--time', `${bubbleTime}ms`);

      for (let i = 0; i < particleCount; i++) {
        const t = animationTime * 2 + noise(timeVariance * 2);
        const rotateBase = noise(r / 10);
        const start = getXY(d[0], particleCount - i, particleCount);
        const end = getXY(d[1] + noise(7), particleCount - i, particleCount);
        const scale = 1 + noise(0.2);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const rotate = rotateBase > 0 ? (rotateBase + r / 20) * 10 : (rotateBase - r / 20) * 10;

        later(
          (() => {
            const s = { start, end, time: t, scale, color, rotate };
            return () => {
              if (!mountedRef.current || !element.isConnected) return;
              element.classList.remove('active');
              const particle = document.createElement('span');
              const point = document.createElement('span');
              particle.classList.add('particle');
              particle.style.setProperty('--start-x', `${s.start[0]}px`);
              particle.style.setProperty('--start-y', `${s.start[1]}px`);
              particle.style.setProperty('--end-x', `${s.end[0]}px`);
              particle.style.setProperty('--end-y', `${s.end[1]}px`);
              particle.style.setProperty('--time', `${s.time}ms`);
              particle.style.setProperty('--scale', `${s.scale}`);
              particle.style.setProperty('--color', `var(--color-${s.color}, white)`);
              particle.style.setProperty('--rotate', `${s.rotate}deg`);
              point.classList.add('point');
              particle.appendChild(point);
              element.appendChild(particle);
              requestAnimationFrame(() => {
                if (element.isConnected) element.classList.add('active');
              });
              later(() => {
                try {
                  if (particle.parentNode === element) element.removeChild(particle);
                } catch {
                  // abaikan — unmount di tengah animasi
                }
              }, s.time);
            };
          })(),
          30
        );
      }
    },
    [animationTime, colors, getXY, later, noise, particleCount, particleDistances, particleR, timeVariance]
  );

  const goTo = useCallback(
    (liEl, index) => {
      if (!liEl || index === activeIndex) return;
      updateEffectPosition(liEl);
      if (filterRef.current) {
        filterRef.current.querySelectorAll('.particle').forEach((p) => {
          try {
            p.remove();
          } catch {
            // abaikan
          }
        });
      }
      if (textRef.current) {
        textRef.current.classList.remove('active');
        void textRef.current.offsetWidth;
        textRef.current.classList.add('active');
      }
      if (filterRef.current) makeParticles(filterRef.current);
    },
    [activeIndex, makeParticles, updateEffectPosition]
  );

  // Navigasi satu halaman (mis. '/#about' saat pathname '/' — atau '/'
  // untuk scroll ke atas) dikendalikan scroll-spy lewat prop activeHref +
  // posisi scroll. Pill JANGAN digerakkan optimistis di sini: posisi DOM
  // yang instan vs class aktif reaktif akan disagree selama smooth-scroll
  // menuju section → dua pill putih menyala sekaligus. Biarkan <Link>
  // menavigasi, pill mengikuti saat section tiba (satu aktif selalu).
  const isSamePageHref = useCallback(
    (href) => {
      if (!href || !pathname) return false;
      const [hrefPath] = href.split('#');
      const targetPath = hrefPath === '' ? pathname : hrefPath;
      return targetPath === pathname;
    },
    [pathname]
  );

  const handleClick = useCallback(
    (e, index) => {
      const anchor = e.currentTarget;
      if (isSamePageHref(anchor && anchor.getAttribute ? anchor.getAttribute('href') : null)) return;
      const liEl = anchor && anchor.closest ? anchor.closest('li') || anchor : anchor;
      goTo(liEl, index);
      // navigasi tetap via <Link> — tidak di-preventDefault
    },
    [goTo, isSamePageHref]
  );

  const handleKeyDown = useCallback(
    (e, index) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const anchor = e.currentTarget;
        const liEl =
          anchor && anchor.parentElement
            ? anchor.parentElement.closest
              ? anchor.parentElement.closest('li') || anchor.parentElement
              : anchor.parentElement
            : anchor;
        if (!isSamePageHref(anchor && anchor.getAttribute ? anchor.getAttribute('href') : null)) {
          goTo(liEl, index);
        }
        const link = liEl && liEl.querySelector ? liEl.querySelector('a') : null;
        if (link && link !== anchor) link.click();
        else if (anchor && anchor.click && anchor.tagName !== 'A') anchor.click();
      }
    },
    [goTo, isSamePageHref]
  );

  useEffect(() => {
    mountedRef.current = true;
    const pendingTimeouts = timeoutsRef.current;
    const li = navRef.current?.querySelectorAll('li')[activeIndex];
    if (li) {
      updateEffectPosition(li);
      textRef.current?.classList.add('active');
    }
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            const current = navRef.current?.querySelectorAll('li')[activeIndex];
            if (current) updateEffectPosition(current);
          })
        : null;
    if (ro && containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', updateOnResize);
    function updateOnResize() {
      const current = navRef.current?.querySelectorAll('li')[activeIndex];
      if (current) updateEffectPosition(current);
    }
    // Posisikan ulang setelah font selesai dimuat (mencegah pill meleset).
    let fontPromise = null;
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      fontPromise = document.fonts.ready.then(() => {
        const current = navRef.current?.querySelectorAll('li')[activeIndex];
        if (current && mountedRef.current) updateEffectPosition(current);
      });
    }
    return () => {
      mountedRef.current = false;
      try {
        if (fontPromise && typeof fontPromise.cancel === 'function') fontPromise.cancel();
      } catch {
        // abaikan
      }
      ro?.disconnect();
      window.removeEventListener('resize', updateOnResize);
      pendingTimeouts.forEach((id) => window.clearTimeout(id));
      pendingTimeouts.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <>
      <style>
        {`
          .gooey-nav {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
            --color-1: #ffffff;
            --color-2: #ffffff;
            --color-3: #ffffff;
            --color-4: #ffffff;
          }
          .gooey-nav .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
            white-space: nowrap;
            overflow: visible;
          }
          .gooey-nav .effect.text {
            color: white;
            transition: color 0.3s ease;
            font-size: 13px;
            font-weight: 400;
            letter-spacing: -0.01em;
            line-height: 1;
          }
          .gooey-nav .effect.text.active {
            color: black;
            font-weight: 500;
          }
          .gooey-nav .effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
          }
          .gooey-nav .effect.filter::before {
            content: "";
            position: absolute;
            inset: -40px;
            z-index: -2;
            background: black;
          }
          .gooey-nav .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: white;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .gooey-nav .effect.active::after {
            animation: gooey-pill 0.3s ease both;
          }
          @keyframes gooey-pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .gooey-nav .particle,
          .gooey-nav .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .gooey-nav .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: gooey-particle calc(var(--time)) ease 1 -350ms;
          }
          .gooey-nav .point {
            background: var(--color);
            opacity: 1;
            animation: gooey-point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes gooey-particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes gooey-point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          .gooey-nav li.gooey-item {
            color: #a1a1aa;
          }
          .gooey-nav li.gooey-item:not(.active):hover {
            color: #ffffff;
          }
          .gooey-nav li.gooey-item.active {
            color: black;
            text-shadow: none;
          }
          .gooey-nav li.gooey-item.active::after {
            opacity: 1;
            transform: scale(1);
          }
          .gooey-nav li.gooey-item::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: white;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
          @media (prefers-reduced-motion: reduce) {
            .gooey-nav .particle,
            .gooey-nav .point,
            .gooey-nav .effect.active::after,
            .gooey-nav li.gooey-item::after {
              animation: none !important;
              transition: none !important;
            }
            .gooey-nav li.gooey-item.active::after {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
      <div className="gooey-nav relative" ref={containerRef}>
        <div className="relative flex" style={{ transform: 'translate3d(0,0,0.01px)' }}>
          <ul
            ref={navRef}
            className="relative z-[3] m-0 flex list-none items-center gap-1 p-0"
            style={{ color: 'white', textShadow: '0 1px 1px hsl(205deg 30% 10% / 0.2)' }}
          >
            {items.map((item, index) => (
              <li
                key={item.href || index}
                aria-current={activeIndex === index ? 'page' : undefined}
                className={`gooey-item relative cursor-pointer rounded-full shadow-[0_0_0.5px_1.5px_transparent] transition-[background-color_color_box-shadow] duration-300 ease ${
                  activeIndex === index ? 'active' : ''
                }`}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleClick(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  tabIndex={0}
                  className="inline-block whitespace-nowrap px-3.5 py-2 text-[13px] leading-none tracking-[-0.01em] outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <span className="effect filter" ref={filterRef} aria-hidden="true" />
        <span className="effect text" ref={textRef} aria-hidden="true" />
      </div>
    </>
  );
}
