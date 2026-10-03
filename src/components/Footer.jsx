import { Phone, Mail, MessageCircle } from 'lucide-react';
import { BrandLogo } from './Primitives';
import { LOGIN_URL } from '../config';
import { BRAND, whatsappNumber, SHOWCASE, OUTLETS } from '../content';
import { PRIVACY_PATH, TERMS_PATH } from '../legal/legalConfig';

const telHref = `tel:${BRAND.phone.replace(/\s/g, '')}`;

/* ================================= Footer ================================= */
/**
 * Site footer. `base` is '' on the home page and '/' on other pages,
 * so in-page anchors (#features…) point back to the home page.
 */
export default function Footer({ onSelectOutlet, base = '' }) {
  const outletHref = (id) => (base ? `${base}?outlet=${id}#solutions` : '#solutions');
  const year = new Date().getFullYear();
  const product = SHOWCASE.map((s) => ({ href: `${base}#feature-${s.id}`, label: s.eyebrow }));
  return (
    <footer className="relative bg-ink text-slate-300" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Footer</h2>
      <div className="h-1 w-full bg-gradient-to-r from-brand-light via-brand to-brand-dark" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_1.5fr] lg:px-8">
        <div>
          <a href={`${base}#home`} className="inline-block rounded-lg" aria-label="CRYZO — back to top"><BrandLogo size={40} /></a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            {BRAND.name} is an all-in-one restaurant POS system for billing, tables, KOTs, kitchen display, inventory and reports.
          </p>
          {/* <div className="mt-6 flex flex-wrap gap-3">
            <a href={`${base}#contact`} className="lp-btn lp-btn-primary !min-h-[44px] !px-4 !text-sm">Get a Free Demo</a>
            <a href={LOGIN_URL} className="lp-btn lp-btn-ghost-dark !min-h-[44px] !px-4 !text-sm">Login</a>
          </div> */}
        </div>

        <nav aria-label="Product">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Product</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {product.map((l) => <li key={l.href}><a href={l.href} className="rounded transition-colors hover:text-brand-light">{l.label}</a></li>)}
            <li><a href={`${base}#modules`} className="rounded transition-colors hover:text-brand-light">All modules</a></li>
            <li><a href={`${base}#integrations`} className="rounded transition-colors hover:text-brand-light">Integrations</a></li>
          </ul>
        </nav>

        <nav aria-label="Solutions">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Solutions</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {OUTLETS.map((o) => (
              <li key={o.id}><a href={outletHref(o.id)} onClick={() => onSelectOutlet?.(o.id)} className="rounded transition-colors hover:text-brand-light">{o.title}</a></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[['#about', 'About Us'], ['#pricing', 'Pricing'], ['#faq', 'FAQ'], ['#contact', 'Contact']].map(([h, l]) => (
              <li key={h}><a href={`${base}${h}`} className="rounded transition-colors hover:text-brand-light">{l}</a></li>
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
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-brand-light"><MessageCircle size={16} className="text-brand-light" aria-hidden="true" /> WhatsApp us</a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
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
