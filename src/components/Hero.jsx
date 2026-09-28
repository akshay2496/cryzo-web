import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, ChefHat, Wallet, Bell } from 'lucide-react';
import { HeroBillingMockup } from './Mockups';
import { PreviewBadge } from './Primitives';
import { PhoneMockup } from './PhoneMockups';

/* Android app screens (code-built phone mockups, sample data) rotated under the hero. */
const SCREENS = [
  { key: 'billing', label: 'Billing', screen: 'pos' },
  { key: 'kitchen', label: 'Kitchen', screen: 'kitchen' },
  { key: 'reports', label: 'Reports', screen: 'reports' },
];
const ROTATE_MS = 5000;

export default function Hero({ plans = [] }) {
  // Free-trial bullet only appears when the API has an active free (₹0) plan
  const trial = plans.find((p) => p.price === 0);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (paused || reduce.current) return undefined;
    const t = setTimeout(() => setIdx((i) => (i + 1) % SCREENS.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [idx, paused]);

  const onTabKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (idx + (e.key === 'ArrowRight' ? 1 : -1) + SCREENS.length) % SCREENS.length;
    setIdx(next);
    document.getElementById(`hero-tab-${SCREENS[next].key}`)?.focus();
  };

  const screen = SCREENS[idx];

  return (
    <section id="home" className="lp-hero-light overflow-hidden pt-[72px]" aria-labelledby="hero-title">
      <div className="lp-grid-bg-light" aria-hidden="true" />
      <div className="lp-blob lp-blob-orange -right-40 -top-20 h-[520px] w-[520px] opacity-40" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:px-8 lg:pb-24 lg:pt-16">
        {/* Copy */}
        <div className="max-w-2xl">
          {/* H1 carries the primary keyword (eyebrow) + the headline */}
          <h1 id="hero-title">
            <span className="lp-eyebrow">
              <Sparkles size={14} aria-hidden="true" /> Restaurant POS &amp; Billing Software
            </span>
            <span className="sr-only"> — </span>
            <span className="mt-5 block text-[2.2rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[2.75rem] xl:text-[3.1rem]">
              Everything your restaurant needs to <span className="lp-gradient-text-light">run smarter</span>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            CRYZO brings GST billing, table and order management, KOTs, a live kitchen display, inventory and sales reports into one restaurant POS — on the web and on Android.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="lp-btn lp-btn-primary">
              Get a Free Demo <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#features" className="lp-btn lp-btn-ghost-light">Explore Features</a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-700">
            {['GST-ready billing', 'Web + Android app', trial && `${trial.label} free trial`].filter(Boolean).map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 size={18} className="shrink-0 text-success" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative pr-0 sm:pr-32 lg:pr-36">
            <HeroBillingMockup floating={false} solid />

            {/* Real Android screen, swapped by the tabs below */}
            <div className="absolute -bottom-12 right-0 hidden w-[150px] sm:block lg:w-[165px]" id="hero-screen" role="tabpanel" aria-labelledby={`hero-tab-${screen.key}`}>
              <div key={screen.key} className="lp-swap"><PhoneMockup screen={screen.screen} fluid /></div>
            </div>

            {/* Floating status cards */}
            <div className="lp-float pointer-events-none absolute -left-3 -top-6 hidden md:block lg:-left-8" aria-hidden="true">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(15,17,21,.4)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/10 text-success"><ChefHat size={18} /></span>
                <div>
                  <p className="text-xs font-bold text-slate-900">KOT #24 sent to kitchen</p>
                  <p className="text-[10px] text-slate-500">Table 5 · Round 1</p>
                </div>
              </div>
            </div>
            <div className="lp-float lp-float-delay pointer-events-none absolute -bottom-14 -left-2 hidden md:block" aria-hidden="true">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(15,17,21,.4)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand-dark"><Wallet size={18} /></span>
                <div>
                  <p className="text-xs font-bold text-slate-900">₹567.00 paid · UPI</p>
                  <p className="text-[10px] text-slate-500">Bill settled · receipt printed</p>
                </div>
              </div>
            </div>
            <div className="lp-float lp-float-slow pointer-events-none absolute -top-8 right-4 hidden xl:block" aria-hidden="true">
              <div className="flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-3 py-2 shadow-[0_20px_40px_-20px_rgba(15,17,21,.4)]">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f04438]/10 text-[#d92d20]"><Bell size={14} /></span>
                <p className="text-[11px] font-bold text-slate-900">Low stock: Paneer</p>
              </div>
            </div>
          </div>

          {/* Screen tabs (desktop/tablet only, where the phone is visible) */}
          <div className="mt-16 hidden items-center justify-between gap-3 sm:flex">
            <div role="tablist" aria-label="Android app screens" className="flex gap-2" onKeyDown={onTabKey}>
              {SCREENS.map((s, i) => (
                <button
                  key={s.key}
                  id={`hero-tab-${s.key}`}
                  role="tab"
                  type="button"
                  aria-selected={i === idx}
                  aria-controls="hero-screen"
                  tabIndex={i === idx ? 0 : -1}
                  onClick={() => setIdx(i)}
                  className="lp-tab relative overflow-hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  {s.label}
                  {i === idx && !paused && (
                    <span key={`p-${idx}`} className="lp-progress absolute inset-x-0 bottom-0 h-0.5 bg-brand" style={{ '--lp-dur': `${ROTATE_MS}ms` }} aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
            <PreviewBadge>Android app · sample data</PreviewBadge>
          </div>
        </div>
      </div>
    </section>
  );
}
