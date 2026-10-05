import { useState } from 'react';
import { Phone, Mail, MessageCircle, ArrowUp, ArrowUpRight, LogIn } from 'lucide-react';
import { BrandLogo } from './Primitives';
import { LOGIN_URL } from '../config';
import { BRAND, whatsappNumber, SHOWCASE, OUTLETS } from '../content';
import { PRIVACY_PATH, TERMS_PATH } from '../legal/legalConfig';

const telHref = `tel:${BRAND.phone.replace(/\s/g, '')}`;
const waHref = `https://wa.me/${whatsappNumber}`;

/* ================================= Footer ================================= */
/**
 * Site footer. `base` is '' on the home page and '/' on other pages,
 * so in-page anchors (#features…) point back to the home page.
 *
 * Mobile (< md) gets its own compact layout: brand card, a 3-tile contact
 * dock, and a segmented switcher (Product / Solutions / Company) that shows
 * one link group at a time as chips. Desktop keeps the classic column grid.
 */
export default function Footer({ onSelectOutlet, base = '' }) {
  const [tab, setTab] = useState('product');
  const outletHref = (id) => (base ? `${base}?outlet=${id}#solutions` : '#solutions');
  const year = new Date().getFullYear();
  const product = SHOWCASE.map((s) => ({ href: `${base}#feature-${s.id}`, label: s.eyebrow }));

  const productLinks = [
    ...product,
    { href: `${base}#modules`, label: 'All modules' },
    { href: `${base}#integrations`, label: 'Integrations' },
  ];
  const solutionLinks = OUTLETS.map((o) => ({ href: outletHref(o.id), label: o.title, onClick: () => onSelectOutlet?.(o.id) }));
  const companyLinks = [
    ...[['#about', 'About Us'], ['#pricing', 'Pricing'], ['#faq', 'FAQ'], ['#contact', 'Contact']].map(([h, l]) => ({ href: `${base}${h}`, label: l })),
  ];
  const groups = [
    { id: 'product', label: 'Product', links: productLinks },
    { id: 'solutions', label: 'Solutions', links: solutionLinks },
    { id: 'company', label: 'Company', links: companyLinks },
  ];
  const activeIdx = groups.findIndex((g) => g.id === tab);
  const active = groups[activeIdx];

  return (
    <footer className="relative bg-ink text-slate-300" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Footer</h2>
      <div className="h-1 w-full bg-gradient-to-r from-brand-light via-brand to-brand-dark" aria-hidden="true" />

      {/* ============================ Mobile footer ============================ */}
      <div className="relative overflow-hidden px-4 pb-6 pt-8 md:hidden">
        {/* soft brand glow */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-info/10 blur-3xl" aria-hidden="true" />

        {/* Brand row */}
        <div className="relative flex items-center justify-between gap-3">
          <a href={`${base}#home`} className="inline-block rounded-lg" aria-label="CRYZO — back to top"><BrandLogo size={36} /></a>
          <a
            href={`${base}#home`}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors active:bg-brand active:text-ink"
            aria-label="Back to top"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </a>
        </div>
        <p className="relative mt-3 text-[13px] leading-relaxed text-slate-400">
          All-in-one restaurant POS — billing, KOTs, kitchen display, inventory &amp; reports.
        </p>

        {/* Contact dock */}
        <div className="relative mt-5 grid grid-cols-3 gap-2" role="list" aria-label="Contact">
          {[
            { href: telHref, label: 'Call', Icon: Phone },
            { href: waHref, label: 'WhatsApp', Icon: MessageCircle, ext: true },
            { href: `mailto:${BRAND.email}`, label: 'Email', Icon: Mail },
          ].map(({ href, label, Icon, ext }) => (
            <a
              key={label}
              role="listitem"
              href={href}
              {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] py-3 text-xs font-semibold text-white transition-colors active:border-brand/60 active:bg-brand/10"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-light to-brand-dark text-ink shadow-[0_8px_20px_-8px_rgba(252,128,25,.8)]">
                <Icon size={17} aria-hidden="true" />
              </span>
              {label}
            </a>
          ))}
        </div>

        {/* Segmented link switcher */}
        <nav className="relative mt-6" aria-label="Footer links">
          <div className="relative grid grid-cols-3 rounded-full border border-white/10 bg-white/[0.04] p-1" role="tablist" aria-label="Link groups">
            <span
              className="absolute bottom-1 top-1 rounded-full bg-brand transition-transform duration-300 ease-out"
              style={{ width: 'calc((100% - 0.5rem) / 3)', left: '0.25rem', transform: `translateX(${activeIdx * 100}%)` }}
              aria-hidden="true"
            />
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                id={`ft-tab-${g.id}`}
                aria-selected={tab === g.id}
                aria-controls="ft-panel"
                onClick={() => setTab(g.id)}
                className={`relative z-10 rounded-full py-2 text-xs font-bold uppercase tracking-wider transition-colors ${tab === g.id ? 'text-ink' : 'text-slate-300'}`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <ul
            key={active.id}
            id="ft-panel"
            role="tabpanel"
            aria-labelledby={`ft-tab-${active.id}`}
            className="lp-swap mt-4 flex flex-wrap gap-2"
          >
            {active.links.map((l) => (
              <li key={l.href + l.label}>
                <a
                  href={l.href}
                  onClick={l.onClick}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[13px] text-slate-300 transition-colors active:border-brand/60 active:text-brand-light"
                >
                  {l.label}
                  <ArrowUpRight size={12} className="text-slate-500" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom line */}
        <div className="relative mt-6 flex flex-col items-center gap-2 border-t border-white/10 pt-5 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <a href={PRIVACY_PATH} className="rounded transition-colors active:text-brand-light">Privacy</a>
            <span aria-hidden="true">•</span>
            <a href={TERMS_PATH} className="rounded transition-colors active:text-brand-light">Terms</a>
          </div>
          <p suppressHydrationWarning>© {year} {BRAND.name}. All rights reserved.</p>
        </div>
      </div>

      {/* ============================ Desktop footer =========================== */}
      <div className="mx-auto hidden max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_1.5fr] lg:px-8">
        <div>
          <a href={`${base}#home`} className="inline-block rounded-lg" aria-label="CRYZO — back to top"><BrandLogo size={40} /></a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            {BRAND.name} is an all-in-one restaurant POS system for billing, tables, KOTs, kitchen display, inventory and reports.
          </p>
        </div>

        <nav aria-label="Product">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Product</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {productLinks.map((l) => <li key={l.href}><a href={l.href} className="rounded transition-colors hover:text-brand-light">{l.label}</a></li>)}
          </ul>
        </nav>

        <nav aria-label="Solutions">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Solutions</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {solutionLinks.map((l) => (
              <li key={l.label}><a href={l.href} onClick={l.onClick} className="rounded transition-colors hover:text-brand-light">{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="rounded transition-colors hover:text-brand-light">{l.label}</a></li>
            ))}
            <li><a href={LOGIN_URL} className="rounded transition-colors hover:text-brand-light">Customer login</a></li>
            <li><a href={PRIVACY_PATH} className="rounded transition-colors hover:text-brand-light">Privacy Policy</a></li>
            <li><a href={TERMS_PATH} className="rounded transition-colors hover:text-brand-light">Terms &amp; Conditions</a></li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <a href={telHref} className="flex items-center gap-2.5 transition-colors hover:text-brand-light"><Phone size={16} className="text-brand-light" aria-hidden="true" /> {BRAND.phone}</a>
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 break-all transition-colors hover:text-brand-light"><Mail size={16} className="shrink-0 text-brand-light" aria-hidden="true" /> {BRAND.email}</a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-brand-light"><MessageCircle size={16} className="text-brand-light" aria-hidden="true" /> WhatsApp us</a>
          </address>
        </div>
      </div>
      <div className="hidden border-t border-white/10 md:block">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p suppressHydrationWarning>© {year} {BRAND.name}. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <li><a href={PRIVACY_PATH} className="rounded transition-colors hover:text-brand-light">Privacy Policy</a></li>
              <li><a href={TERMS_PATH} className="rounded transition-colors hover:text-brand-light">Terms &amp; Conditions</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
