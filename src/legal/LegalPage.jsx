import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, FileText, ShieldCheck, Mail, Printer, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BRAND } from '../content';
import { LEGAL, PRIVACY_PATH, TERMS_PATH } from './legalConfig';

/** Shared layout for the Privacy Policy and Terms & Conditions pages. */
export default function LegalPage({ doc, kind }) {
  const [active, setActive] = useState(doc.sections[0]?.id);
  const other = kind === 'privacy'
    ? { href: TERMS_PATH, label: 'Terms & Conditions', icon: FileText }
    : { href: PRIVACY_PATH, label: 'Privacy Policy', icon: ShieldCheck };

  // Highlight the section currently in view in the table of contents
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-20% 0px -70% 0px' }
    );
    doc.sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [doc]);

  const Toc = ({ onPick }) => (
    <ol className="space-y-0.5 text-sm">
      {doc.sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            onClick={onPick}
            aria-current={active === s.id ? 'location' : undefined}
            className={`flex gap-2 rounded-lg px-3 py-2 transition-colors ${
              active === s.id ? 'bg-[#fff1e3] font-semibold text-ink' : 'text-slate-600 hover:bg-slate-50 hover:text-ink'
            }`}
          >
            <span className="w-5 shrink-0 tabular-nums text-slate-400">{i + 1}.</span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="lp min-h-screen">
      <Header base="/" />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* Title band */}
        <section className="lp-hero-light pt-[72px]" aria-labelledby="legal-title">
          <div className="lp-grid-bg-light" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <ol className="flex items-center gap-2">
                <li><a href="/" className="rounded hover:text-ink">Home</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-medium text-slate-700">{doc.title}</li>
              </ol>
            </nav>
            <h1 id="legal-title" className="mt-4 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{doc.title}</h1>
        
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-4 sm:px-6 sm:pb-20 lg:grid-cols-[260px_1fr] lg:gap-14 lg:px-8">
          {/* Table of contents */}
          <aside className="lp-no-print lg:sticky lg:top-24 lg:self-start">
            <details className="group rounded-2xl border border-slate-200 bg-white lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800">
                On this page <ChevronDown size={18} className="transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="border-t border-slate-100 p-2"><Toc onPick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')} /></div>
            </details>
            <nav aria-label="On this page" className="hidden lg:block">
              <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">On this page</p>
              <Toc />
            </nav>
          </aside>

          {/* Document */}
          <article className="lp-legal min-w-0 max-w-3xl">
            <p className="text-[17px] leading-relaxed text-slate-700">{doc.intro}</p>
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24 border-t border-slate-100 pt-8 mt-8 first-of-type:mt-10">
                <h2 id={`${s.id}-h`} className="flex items-baseline gap-3 text-xl font-bold text-ink sm:text-2xl">
                  <span className="text-base font-extrabold text-brand-text tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4">{s.blocks}</div>
              </section>
            ))}

            {/* Related + help */}
            <div className="lp-no-print mt-10 grid sm:mt-14 gap-4 sm:grid-cols-2">
              <a href={other.href} className="lp-card group flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff1e3] text-brand-dark" aria-hidden="true"><other.icon size={21} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Also read</span>
                  <span className="block font-bold text-slate-900">{other.label}</span>
                </span>
                <ArrowRight size={18} className="text-slate-400 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href={`mailto:${BRAND.email}`} className="lp-card group flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand-light" aria-hidden="true"><Mail size={21} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Questions?</span>
                  <span className="block truncate font-bold text-slate-900">{BRAND.email}</span>
                </span>
                <ArrowRight size={18} className="text-slate-400 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </main>
      <Footer base="/" />
    </div>
  );
}
