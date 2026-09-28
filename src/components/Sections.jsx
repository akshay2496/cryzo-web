import { useRef } from 'react';
import { ArrowRight, Check, Info, Monitor, Smartphone } from 'lucide-react';
import { SectionHeading, PreviewBadge } from './Primitives';
import { DashboardPreview, InventoryMock, WhatsAppMock } from './Mockups';
import { PhoneMockup } from './PhoneMockups';
import {
  CAPABILITIES, SHOWCASE, MODULES, STEPS, OUTLETS, BENEFITS, INTEGRATIONS, ADDONS,
} from '../content';

/* ----------------------- Capability strip (trust bar) ----------------------- */
export function CapabilityStrip() {
  const row = CAPABILITIES;
  return (
    <section className="border-y border-slate-100 bg-white py-10" aria-labelledby="capabilities-title">
      <h2 id="capabilities-title" className="px-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500" data-reveal>
        Built for the way Indian restaurants work
      </h2>
      <div className="lp-marquee mt-6 overflow-hidden" data-reveal>
        <ul className="lp-marquee-track gap-3 px-3" aria-label="Key capabilities">
          {[...row, ...row].map((c, i) => (
            <li
              key={`${c.label}-${i}`}
              className={`flex shrink-0 items-center gap-2.5 rounded-full border border-slate-200 bg-[#fcfcfd] px-4 py-2.5 text-sm font-semibold text-slate-700 ${i >= row.length ? 'lp-marquee-dup' : ''}`}
              aria-hidden={i >= row.length ? 'true' : undefined}
            >
              <c.icon size={17} className="text-brand-dark" aria-hidden="true" />
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------- Alternating feature rows (showcase) ------------------- */
function PhonesVisual({ screens }) {
  const [a, b] = screens;
  return (
    <div className="relative mx-auto flex w-full max-w-[460px] items-end justify-center py-6">
      <div className="lp-dots absolute inset-x-6 inset-y-10 -z-0 rounded-[40px]" aria-hidden="true" />
      <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-brand/25 via-brand-light/10 to-info/15 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 w-[48%] -rotate-[3deg]">
        <PhoneMockup screen={a} fluid />
      </div>
      {b && (
        <div className="lp-float lp-float-slow relative z-20 -ml-[1%] mb-10 w-[48%] rotate-[3deg]">
          <PhoneMockup screen={b} fluid />
        </div>
      )}
    </div>
  );
}

function ShowcaseVisual({ visual }) {
  if (visual.type === 'phones') return <PhonesVisual screens={visual.screens} />;
  if (visual.type === 'inventory') return <div className="mx-auto w-full max-w-[520px]"><InventoryMock /></div>;
  if (visual.type === 'whatsapp') return <WhatsAppMock />;
  return null;
}

export function FeatureShowcase() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28" aria-labelledby="features-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="features-title"
          eyebrow="Features"
          title={<>One restaurant POS for your <span className="text-brand-text">counter, floor and kitchen</span></>}
          intro="Each module is part of the same live system, so an order punched at a table shows up in the kitchen, the bill, the stock and the reports — instantly."
        />

        <div className="mt-16 space-y-20 sm:space-y-28">
          {SHOWCASE.map((row, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={row.id} id={`feature-${row.id}`} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" aria-labelledby={`feature-${row.id}-title`}>
                <div className={flip ? 'lg:order-2' : ''} data-reveal={flip ? 'right' : 'left'}>
                  <span className="lp-eyebrow">{row.eyebrow}</span>
                  <h3 id={`feature-${row.id}-title`} className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-[2.1rem]">
                    {row.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-[17px]">{row.text}</p>
                  <ul className="mt-6 space-y-3">
                    {row.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[15px] text-slate-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-ink" aria-hidden="true">
                          <Check size={13} strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="mt-7 inline-flex items-center gap-1.5 rounded-lg text-[15px] font-bold text-brand-text hover:gap-2.5 transition-all">
                    See it in a free demo <ArrowRight size={17} aria-hidden="true" />
                  </a>
                </div>
                <div className={flip ? 'lg:order-1' : ''} data-reveal="zoom">
                  <ShowcaseVisual visual={row.visual} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Module grid ------------------------------ */
export function ModuleGrid() {
  return (
    <section id="modules" className="bg-[#f8fafc] py-20 sm:py-24" aria-labelledby="modules-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="modules-title"
          eyebrow="All modules"
          title="Everything included in CRYZO"
          intro="Turn modules on or off per outlet, and give every team member access only to what they need."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MODULES.map((m, i) => (
            <li key={m.title} className="lp-card lp-card-glow flex gap-4 p-5" data-reveal style={{ '--lp-delay': `${(i % 4) * 60}ms` }}>
              <span className="lp-icon-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff1e3] text-brand-dark" aria-hidden="true">
                <m.icon size={22} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[15px] font-bold text-slate-900">{m.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{m.text}</p>
                {m.note && (
                  <p className="mt-2 inline-flex items-start gap-1.5 rounded-lg bg-amber-50 px-2 py-1 text-xs font-medium text-amber-900">
                    <Info size={13} className="mt-0.5 shrink-0" aria-hidden="true" /> {m.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------- Dashboard showcase + how it works ---------------------- */
export function DashboardShowcase() {
  return (
    <section id="showcase" className="relative overflow-hidden bg-ink py-20 sm:py-28" aria-labelledby="showcase-title">
      <div className="lp-blob lp-blob-orange left-1/2 top-20 h-[480px] w-[680px] -translate-x-1/2 opacity-30" aria-hidden="true" />
      <div className="lp-grid-bg" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="showcase-title"
          dark
          eyebrow="Product preview"
          title={<>Your whole restaurant, <span className="lp-gradient-text">live on one screen</span></>}
          intro="Daily sales, active orders, payment modes, best-sellers and low-stock items update as you trade. The preview below uses sample data."
        />
        <div className="lp-tilt-wrap relative mt-14">
          <div className="lp-tilt"><DashboardPreview /></div>
          <div className="lp-float pointer-events-none absolute -top-9 left-10 z-10 hidden lg:block" aria-hidden="true">
            <div className="lp-glass rounded-2xl px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">New online order</p>
              <p className="mt-0.5 text-sm font-bold text-white">#1045 · WhatsApp · ₹560</p>
            </div>
          </div>
          <div className="lp-float lp-float-delay pointer-events-none absolute -top-9 right-[30%] z-10 hidden lg:block" aria-hidden="true">
            <div className="lp-glass rounded-2xl px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Kitchen update</p>
              <p className="mt-0.5 text-sm font-bold text-white">KOT #58 ready · Table 2</p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20">
          <h3 className="text-center text-2xl font-extrabold text-white sm:text-3xl" data-reveal>Up and running in three steps</h3>
          <ol className="relative mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="lp-glass relative rounded-3xl p-6" data-reveal style={{ '--lp-delay': `${i * 120}ms` }}>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-ink" aria-hidden="true"><s.icon size={22} /></span>
                  <span className="text-sm font-bold uppercase tracking-wider text-brand-light">Step {i + 1}</span>
                </div>
                <h4 className="mt-4 text-lg font-bold text-white">{s.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="lp-glass flex items-start gap-4 rounded-3xl p-5" data-reveal="left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-brand-light" aria-hidden="true"><Monitor size={22} /></span>
            <div>
              <h4 className="font-bold text-white">Web app</h4>
              <p className="mt-1 text-sm text-slate-300">Billing, kitchen display, reports and settings in any modern browser.</p>
            </div>
          </div>
          <div className="lp-glass flex items-start gap-4 rounded-3xl p-5" data-reveal="right">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-info/15 text-[#53b1fd]" aria-hidden="true"><Smartphone size={22} /></span>
            <div>
              <h4 className="font-bold text-white">Android POS app</h4>
              <p className="mt-1 text-sm text-slate-300">Orders, KOTs, payments and Bluetooth receipt printing on Android.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ Outlet types (interactive) ------------------------ */
export function OutletSection({ selected, onSelect }) {
  const listRef = useRef(null);
  const current = OUTLETS.find((o) => o.id === selected) || OUTLETS[0];
  const idx = OUTLETS.indexOf(current);

  const onKey = (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    let n = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (idx + 1) % OUTLETS.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (idx - 1 + OUTLETS.length) % OUTLETS.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = OUTLETS.length - 1;
    onSelect(OUTLETS[n].id);
    listRef.current?.querySelectorAll('[role="tab"]')[n]?.focus();
  };

  return (
    <section id="solutions" className="bg-white py-20 sm:py-28" aria-labelledby="solutions-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="solutions-title"
          eyebrow="Solutions"
          title="POS software for every kind of food business"
          intro="Pick your outlet type to see how CRYZO fits the way you serve."
        />

        <div ref={listRef} role="tablist" aria-label="Outlet types" onKeyDown={onKey}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6" data-reveal>
          {OUTLETS.map((o) => (
            <button
              key={o.id}
              id={`outlet-tab-${o.id}`}
              role="tab"
              type="button"
              aria-selected={o.id === current.id}
              aria-controls="outlet-panel"
              tabIndex={o.id === current.id ? 0 : -1}
              onClick={() => onSelect(o.id)}
              className="lp-tab flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center text-sm font-semibold text-slate-700 hover:border-brand"
            >
              <o.icon size={22} aria-hidden="true" />
              <span className="leading-tight">{o.title}</span>
            </button>
          ))}
        </div>

        <div
          id="outlet-panel"
          role="tabpanel"
          aria-labelledby={`outlet-tab-${current.id}`}
          className="relative mt-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#fff4ea] via-white to-[#fff8f1] ring-1 ring-[#ffe0c2]"
        >
          <div key={current.id} className="lp-swap grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-brand-light" aria-hidden="true">
                <current.icon size={26} />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl">CRYZO for {current.title}</h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{current.text}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {current.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-100">
                    <Check size={16} className="shrink-0 text-success" strokeWidth={3} aria-hidden="true" /> {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="lp-btn lp-btn-dark mt-8">
                Book a demo for {current.title.toLowerCase()} <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="relative mx-auto hidden w-[200px] md:block lg:w-[230px]">
              <div className="absolute inset-4 rounded-full bg-brand/25 blur-3xl" aria-hidden="true" />
              <div key={current.screen} className="lp-swap relative"><PhoneMockup screen={current.screen} fluid /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Why CRYZO --------------------------------- */
export function WhySection() {
  return (
    <section id="about" className="bg-[#f8fafc] py-20 sm:py-28" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            id="about-title"
            align="left"
            eyebrow="About CRYZO"
            title="Restaurant management software built around real service"
            intro="CRYZO is a restaurant billing software and management system designed for the rush at the counter, the tickets in the kitchen and the numbers at closing time — so owners spend less time on operations and more on guests."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <li key={b.title} className="lp-card p-6" data-reveal style={{ '--lp-delay': `${(i % 2) * 90}ms` }}>
                <span className="lp-icon-tile flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-brand-light" aria-hidden="true">
                  <b.icon size={21} />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Integrations & add-ons -------------------------- */
export function IntegrationsSection() {
  return (
    <section id="integrations" className="bg-white py-20 sm:py-28" aria-labelledby="integrations-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="integrations-title"
          eyebrow="Integrations & add-ons"
          title="Connects with the tools you already use"
          intro="Only integrations that ship in CRYZO today are listed here."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <div className="relative overflow-hidden rounded-[28px] bg-ink p-6 sm:p-8" data-reveal="left">
            <div className="lp-blob lp-blob-orange -right-20 -top-20 h-60 w-60 opacity-40" aria-hidden="true" />
            <h3 className="relative text-lg font-bold text-white">Integrations</h3>
            <ul className="relative mt-5 space-y-3">
              {INTEGRATIONS.map((it) => (
                <li key={it.title} className="flex items-start gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-ink" aria-hidden="true"><it.icon size={21} /></span>
                  <div>
                    <p className="font-semibold text-white">{it.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-300">{it.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="right">
            <h3 className="sr-only">Add-ons</h3>
            <ul className="grid h-full gap-4 sm:grid-cols-2">
              {ADDONS.map((a) => (
                <li key={a.title} className="lp-card lp-card-glow p-5">
                  <span className="lp-icon-tile flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1e3] text-brand-dark" aria-hidden="true"><a.icon size={21} /></span>
                  <p className="mt-4 font-bold text-slate-900">{a.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Which add-ons are switched on for your outlet is confirmed during your demo.
        </p>
      </div>
    </section>
  );
}
