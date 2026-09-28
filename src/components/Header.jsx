import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowRight, LogIn, ChevronDown } from 'lucide-react';
import { BrandLogo } from './Primitives';
import { LOGIN_URL } from '../config';
import { NAV, MODULES, OUTLETS } from '../content';

/* Items shown inside the desktop mega menus / mobile sub-menus */
const MENUS = {
  features: {
    title: 'Everything in one POS',
    href: '#features',
    items: MODULES.map((m) => ({ icon: m.icon, label: m.title, text: m.text, href: '#modules' })),
  },
  solutions: {
    title: 'Built for every outlet',
    href: '#solutions',
    items: OUTLETS.map((o) => ({ icon: o.icon, label: o.title, text: o.features.slice(0, 2).join(' · '), href: `#solutions`, outlet: o.id })),
  },
};

// On other pages, outlet links carry ?outlet= so the home page opens the right tab.
const linkFor = (it, base) => (base && it.outlet ? `${base}?outlet=${it.outlet}${it.href}` : `${base}${it.href}`);

function MegaPanel({ menu, id, open, onNavigate, base }) {
  const data = MENUS[menu];
  const cols = menu === 'features' ? 'grid-cols-3 w-[760px]' : 'grid-cols-2 w-[560px]';
  return (
    <div
      id={id}
      className="lp-mega absolute left-1/2 top-full pt-3"
      data-open={open ? 'true' : 'false'}
    >
      <div className="rounded-3xl border border-slate-100 bg-white p-3 shadow-[0_30px_80px_-30px_rgba(15,17,21,.45)]">
        <div className="flex items-center justify-between px-3 pb-2 pt-1">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{data.title}</p>
          <a href={`${base}${data.href}`} onClick={() => onNavigate()} className="inline-flex items-center gap-1 rounded-md text-xs font-bold text-brand-text hover:underline">
            View all <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>
        <ul className={`grid gap-1 ${cols}`}>
          {data.items.map((it) => (
            <li key={it.label}>
              <a
                href={linkFor(it, base)}
                onClick={() => onNavigate(it.outlet)}
                className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-[#fff6ee] focus-visible:bg-[#fff6ee]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff1e3] text-brand-dark transition-colors group-hover:bg-brand group-hover:text-ink" aria-hidden="true">
                  <it.icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-900">{it.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-slate-500">{it.text}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** `base` is '' on the home page and '/' on other pages (e.g. legal pages). */
export default function Header({ onSelectOutlet, base = '' }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu
  const [mega, setMega] = useState(null); // desktop mega menu key
  const [sub, setSub] = useState(null); // mobile sub-menu key
  const [active, setActive] = useState(base ? null : 'home');
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const navRef = useRef(null);
  const closeTimer = useRef(null);
  const hoverOpenedAt = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const sections = NAV.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Desktop mega menu: close on Escape / outside click
  useEffect(() => {
    if (!mega) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMega(null); };
    const onDown = (e) => { if (!navRef.current?.contains(e.target)) setMega(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [mega]);

  // Mobile menu: Escape, scroll lock, focus first link
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => panelRef.current?.querySelector('a,button')?.focus(), 60);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => { if (e.matches) setOpen(false); else setMega(null); };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const openMega = (key) => {
    clearTimeout(closeTimer.current);
    setMega((m) => { if (m !== key) hoverOpenedAt.current = Date.now(); return key; });
  };
  // Click toggles, but a click right after hover-open (same gesture) keeps it open
  const toggleMega = (key) => setMega((m) => (m === key && Date.now() - hoverOpenedAt.current > 500 ? null : key));
  const scheduleClose = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setMega(null), 140); };
  const navigate = (outlet) => {
    setMega(null);
    setOpen(false);
    if (outlet) onSelectOutlet?.(outlet);
  };

  return (
    <header className="lp-header lp-header-light fixed inset-x-0 top-0 z-50 border-b border-transparent" data-scrolled={scrolled || open ? 'true' : 'false'}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:font-semibold focus:text-white">
        Skip to content
      </a>
      <nav ref={navRef} aria-label="Primary" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href={base ? '/' : '#home'} className="shrink-0 rounded-lg" aria-label="CRYZO — back to top" onClick={() => navigate()}>
          <BrandLogo light={false} />
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((l) => (
            <li
              key={l.id}
              className="relative"
              onMouseEnter={l.menu ? () => openMega(l.menu) : undefined}
              onMouseLeave={l.menu ? scheduleClose : undefined}
            >
              <div className="flex items-center">
                <a
                  href={`${base}#${l.id}`}
                  onClick={() => navigate()}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`lp-nav-link block rounded-lg py-2 text-[15px] font-medium transition-colors ${l.menu ? 'pl-3 pr-1' : 'px-3'} ${
                    active === l.id ? 'text-ink' : 'text-slate-600 hover:text-ink'
                  }`}
                >
                  {l.label}
                </a>
                {l.menu && (
                  <button
                    type="button"
                    className="flex h-8 w-7 items-center justify-center rounded-md text-slate-500 hover:text-ink"
                    aria-expanded={mega === l.menu}
                    aria-controls={`mega-${l.menu}`}
                    aria-label={`${l.label} menu`}
                    onClick={() => toggleMega(l.menu)}
                  >
                    <ChevronDown size={16} className={`transition-transform ${mega === l.menu ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                )}
              </div>
              {l.menu && <MegaPanel menu={l.menu} id={`mega-${l.menu}`} open={mega === l.menu} onNavigate={navigate} base={base} />}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {/* <a href={LOGIN_URL} className="lp-btn lp-btn-ghost-light !min-h-[44px] !px-4">
            <LogIn size={17} aria-hidden="true" /> Login
          </a> */}
          <a href={`${base}#contact`} className="lp-btn lp-btn-primary !min-h-[44px]">
            Get a Free Demo <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="lp-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile navigation */}
      <div
        id="lp-mobile-menu"
        ref={panelRef}
        className="lp-mobile-panel absolute inset-x-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto border-t border-slate-100 bg-white lg:hidden"
        data-open={open ? 'true' : 'false'}
        aria-hidden={!open}
        inert={open ? undefined : ''}
      >
        <ul className="flex flex-col gap-1 px-4 pt-4 sm:px-6">
          {NAV.map((l) => (
            <li key={l.id}>
              <div className="flex items-center gap-1">
                <a
                  href={`${base}#${l.id}`}
                  onClick={() => navigate()}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`flex flex-1 items-center rounded-2xl px-4 py-3.5 text-lg font-semibold transition-colors ${
                    active === l.id ? 'bg-[#fff4ea] text-ink' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {l.label}
                </a>
                {l.menu && (
                  <button
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-slate-600 hover:bg-slate-50"
                    aria-expanded={sub === l.menu}
                    aria-controls={`sub-${l.menu}`}
                    aria-label={`Show ${l.label.toLowerCase()}`}
                    onClick={() => setSub((s) => (s === l.menu ? null : l.menu))}
                  >
                    <ChevronDown size={20} className={`transition-transform ${sub === l.menu ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                )}
              </div>
              {l.menu && (
                <div id={`sub-${l.menu}`} className="lp-sub" data-open={sub === l.menu ? 'true' : 'false'}>
                  <div>
                    <ul className="grid grid-cols-1 gap-1 px-2 pb-2 pt-1 sm:grid-cols-2" {...(sub === l.menu ? {} : { inert: '' })}>
                      {MENUS[l.menu].items.map((it) => (
                        <li key={it.label}>
                          <a href={linkFor(it, base)} onClick={() => navigate(it.outlet)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] text-slate-700 hover:bg-slate-50">
                            <it.icon size={18} className="text-brand-dark" aria-hidden="true" /> {it.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="grid gap-3 px-4 pb-10 pt-6 sm:px-6">
          <a href={`${base}#contact`} onClick={() => navigate()} className="lp-btn lp-btn-primary w-full">
            Get a Free Demo <ArrowRight size={18} aria-hidden="true" />
          </a>
          {/* <a href={LOGIN_URL} className="lp-btn lp-btn-ghost-light w-full">
            <LogIn size={18} aria-hidden="true" /> Login
          </a> */}
        </div>
      </div>
    </header>
  );
}
