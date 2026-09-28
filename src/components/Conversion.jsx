import { useEffect, useId, useMemo, useState } from 'react';
import {
  ArrowRight, Check, ChevronDown, Phone, Mail, MessageCircle, Info, Gift, Headphones, Send, AlertTriangle, CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from './Primitives';
import { PRIVACY_PATH } from '../legal/legalConfig';
import { demoApiConfigured, submitDemoRequest } from '../services/api';
import { FAQS, BRAND, whatsappNumber, OUTLET_COUNTS } from '../content';

const inr = (n) => `₹${Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
const telHref = `tel:${BRAND.phone.replace(/\s/g, '')}`;

/* ================================ Pricing ================================ */
/* Every plan detail (name, duration label, price, description) comes from the backend API
 * — the plans the super admin manages in the POS app. Nothing is hard-coded or calculated. */
function PlanSkeleton() {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-[0.8fr_1.5fr_0.8fr]" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading plans…</span>
      {[0, 1, 2].map((i) => (
        <div key={i} className={`animate-pulse rounded-3xl p-7 ${i === 1 ? 'bg-ink' : 'border border-slate-200 bg-white'}`}>
          <div className={`h-11 w-11 rounded-2xl ${i === 1 ? 'bg-white/10' : 'bg-slate-100'}`} />
          <div className={`mt-5 h-5 w-32 rounded ${i === 1 ? 'bg-white/10' : 'bg-slate-100'}`} />
          <div className={`mt-3 h-3 w-48 rounded ${i === 1 ? 'bg-white/10' : 'bg-slate-100'}`} />
          <div className={`mt-8 h-10 w-40 rounded ${i === 1 ? 'bg-white/10' : 'bg-slate-100'}`} />
          <div className={`mt-10 h-12 w-full rounded-xl ${i === 1 ? 'bg-white/10' : 'bg-slate-100'}`} />
        </div>
      ))}
    </div>
  );
}

function HelpCard() {
  return (
    <div className="flex flex-col rounded-3xl bg-[#fff6ee] p-6 ring-1 ring-[#ffe0c2] sm:p-7" data-reveal>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-ink" aria-hidden="true"><Headphones size={22} /></span>
      <h3 className="mt-4 text-lg font-bold text-slate-900">Not sure which plan?</h3>
      <p className="mt-1 text-sm text-slate-700">Tell us about your outlet and we’ll suggest the right plan and setup.</p>
      <div className="flex-1" />
      <div className="mt-6 grid gap-2">
        <a href={telHref} className="lp-btn lp-btn-dark w-full"><Phone size={17} aria-hidden="true" /> Call {BRAND.phone}</a>
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn-outline w-full">
          <MessageCircle size={17} aria-hidden="true" /> WhatsApp us
        </a>
      </div>
    </div>
  );
}

export function PricingSection({ plansState, onChoosePlan }) {
  const { status, plans = [], retry } = plansState || {};
  const trial = plans.find((p) => p.price === 0);
  const paid = useMemo(() => plans.filter((p) => p.price > 0), [plans]);
  const [sel, setSel] = useState(null);
  const current = paid.find((p) => p.id === sel) || paid[0];

  return (
    <section id="pricing" className="bg-white py-20 sm:py-28" aria-labelledby="pricing-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          title="Simple plans for every restaurant"
          intro="Every plan starts with a guided demo so your menu, tables and printers are ready from day one."
        />

        {status === 'loading' && <PlanSkeleton />}

        {(status === 'error' || (status === 'ready' && plans.length === 0)) && (
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.7fr_0.8fr]">
            <div className="flex flex-col items-start justify-center rounded-3xl border border-slate-200 bg-white p-7 sm:p-9" role="status">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700" aria-hidden="true"><AlertTriangle size={22} /></span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {status === 'error' ? 'We couldn’t load the latest plans right now' : 'Plans are being updated'}
              </h3>
              <p className="mt-2 max-w-lg text-[15px] text-slate-600">
                Ask us for current pricing — we’ll share the plans that fit your outlet during a free demo.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {status === 'error' && retry && (
                  <button type="button" onClick={retry} className="lp-btn lp-btn-outline">Try again</button>
                )}
                <a href="#contact" className="lp-btn lp-btn-primary">Ask for pricing <ArrowRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
            <HelpCard />
          </div>
        )}

        {status === 'ready' && plans.length > 0 && (
          <div className={`mt-12 grid gap-5 ${trial && current ? 'lg:grid-cols-[0.8fr_1.5fr_0.8fr]' : 'lg:grid-cols-[1.6fr_0.8fr]'}`}>
            {/* Free plan (price 0 in the API), if one is active */}
            {trial && (
              <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 sm:p-7" data-reveal>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success/10 text-[#079455]" aria-hidden="true"><Gift size={22} /></span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{trial.name}</h3>
                {trial.description && <p className="mt-1 text-sm text-slate-600">{trial.description}</p>}
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold tracking-tight text-ink">Free</span>
                  <span className="text-sm text-slate-500">/ {trial.label}</span>
                </p>
                <div className="flex-1" />
                <a href="#contact" onClick={() => onChoosePlan?.(trial.name)} className="lp-btn lp-btn-outline mt-8 w-full">
                  Start with a demo <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
            )}

            {/* Paid plans from the API */}
            {current && (
              <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-[0_30px_80px_-35px_rgba(252,128,25,.6)] ring-2 ring-brand sm:p-8" data-reveal="zoom">
                <div className="lp-blob lp-blob-orange -right-24 -top-24 h-64 w-64 opacity-40" aria-hidden="true" />
                {paid.length > 1 && (
                  <>
                    <p className="relative text-sm font-semibold text-slate-300" id="plan-choice-label">Choose a plan</p>
                    <div role="radiogroup" aria-labelledby="plan-choice-label" className="relative mt-3 flex flex-wrap gap-2">
                      {paid.map((p) => {
                        const on = p.id === current.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => setSel(p.id)}
                            className={`min-w-[110px] flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition-colors sm:flex-none ${
                              on ? 'bg-brand text-ink' : 'bg-white/[0.07] text-slate-200 ring-1 ring-white/10 hover:bg-white/[0.12]'
                            }`}
                          >
                            <span className="block whitespace-nowrap leading-tight">{p.label}</span>
                            <span className={`block text-[11px] font-medium ${on ? 'text-ink/75' : 'text-slate-400'}`}>{p.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                <div key={current.id} className={`lp-swap relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end ${paid.length > 1 ? 'mt-8' : ''}`}>
                  <div>
                    <h3 className="text-2xl font-extrabold">{current.name}</h3>
                    {current.description && <p className="mt-1 max-w-md whitespace-pre-line text-sm text-slate-300">{current.description}</p>}
                    <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-5xl font-extrabold tracking-tight">{inr(current.price)}</span>
                      <span className="text-sm text-slate-400">/ {current.label}</span>
                    </p>
                  </div>
                  <a href="#contact" onClick={() => onChoosePlan?.(current.name)} className="lp-btn lp-btn-primary w-full sm:w-auto">
                    Choose {current.name} <ArrowRight size={17} aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}

            <HelpCard />
          </div>
        )}

        <p className="mx-auto mt-6 flex max-w-3xl items-start justify-center gap-2 text-center text-xs text-slate-500">
          <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
          Prices in INR. Final inclusions are confirmed during your demo.
        </p>
      </div>
    </section>
  );
}

/* ================================== FAQ ================================== */
export function FaqSection() {
  const [open, setOpen] = useState(0);
  const base = useId().replace(/:/g, '');
  return (
    <section id="faq" className="bg-[#f8fafc] py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" align="left" eyebrow="FAQ" title="Questions, answered"
            intro="Everything you need to know about CRYZO’s restaurant POS software. Still unsure? Talk to us." />
          <a href="#contact" className="lp-btn lp-btn-dark mt-8" data-reveal>Ask us anything <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
        <ul className="space-y-3" data-reveal>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const btn = `${base}-q${i}`;
            const panel = `${base}-a${i}`;
            return (
              <li key={f.q} className={`rounded-2xl border bg-white transition-colors ${isOpen ? 'border-[#ffd6b0] shadow-[0_16px_40px_-28px_rgba(252,128,25,.6)]' : 'border-slate-200'}`}>
                <h3>
                  <button id={btn} type="button" aria-expanded={isOpen} aria-controls={panel} onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left text-base font-semibold text-slate-900 sm:px-6">
                    {f.q}
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-brand text-ink' : 'bg-slate-100 text-slate-600'}`}>
                      <ChevronDown size={18} className="lp-acc-chevron" aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div id={panel} role="region" aria-labelledby={btn} className="lp-acc-panel" data-open={isOpen ? 'true' : 'false'}>
                  <div>
                    <p className="px-5 pb-5 text-[15px] leading-relaxed text-slate-600 sm:px-6" {...(!isOpen ? { 'aria-hidden': 'true' } : {})}>{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ============================ Demo booking form ============================ */
const EMPTY = { name: '', phone: '', email: '', restaurant: '', city: '', outlets: '', message: '', website: '' };
const SUCCESS_VISIBLE_MS = 5000; // how long the "request sent" message stays visible
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function buildMessage(f, plan) {
  return [
    'Hi CRYZO team, I would like a free demo of the restaurant POS.',
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    `Email: ${f.email}`,
    `Restaurant: ${f.restaurant}`,
    f.city && `City: ${f.city}`,
    `Outlets: ${f.outlets}`,
    plan && `Interested plan: ${plan}`,
    f.message && `Message: ${f.message}`,
  ].filter(Boolean).join('\n');
}

export function DemoSection({ plan, onPlanChange, plans = [] }) {
  const uid = useId().replace(/:/g, '');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: 'idle' }); // idle | sending | sent | handoff | error
  const [leaving, setLeaving] = useState(false); // fade-out of the success message

  // Success message disappears on its own after a few seconds
  useEffect(() => {
    if (state.status !== 'sent') return undefined;
    setLeaving(false);
    const fade = setTimeout(() => setLeaving(true), SUCCESS_VISIBLE_MS);
    const hide = setTimeout(() => setState({ status: 'idle' }), SUCCESS_VISIBLE_MS + 400);
    return () => { clearTimeout(fade); clearTimeout(hide); };
  }, [state]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    if (state.status !== 'idle' && state.status !== 'sending') setState({ status: 'idle' });
  };

  const validate = () => {
    const f = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()]));
    const er = {};
    if (f.name.length < 2) er.name = 'Please enter your name';
    const digits = f.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 13) er.phone = 'Enter a valid 10-digit phone number';
    if (!EMAIL_RE.test(f.email)) er.email = 'Enter a valid email address';
    if (!f.restaurant) er.restaurant = 'Please enter your restaurant name';
    if (!f.city) er.city = 'Please enter your city';
    if (!f.outlets) er.outlets = 'Please select the number of outlets';
    if (f.message.length > 500) er.message = 'Please keep the message under 500 characters';
    return { f, er };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { f, er } = validate();
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) { document.getElementById(`${uid}-${first}`)?.focus(); return; }

    if (demoApiConfigured) {
      setState({ status: 'sending' });
      try {
        const r = await submitDemoRequest({ ...f, plan: plan || '' });
        if (r.ok) {
          setState({ status: 'sent' });
          setForm(EMPTY);
          return;
        }
        // Server-side validation errors → show them on the fields
        if (r.status === 400 && r.errors && Object.keys(r.errors).length) {
          setErrors(r.errors);
          setState({ status: 'idle' });
          document.getElementById(`${uid}-${Object.keys(r.errors)[0]}`)?.focus();
          return;
        }
        setState({ status: 'handoff', failed: true, f, reason: r.message });
      } catch {
        setState({ status: 'handoff', failed: true, f });
      }
      return;
    }
    setState({ status: 'handoff', f });
  };

  const handoff = state.status === 'handoff' ? buildMessage(state.f, plan) : '';
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(handoff)}`;
  const mailHref = `mailto:${BRAND.email}?subject=${encodeURIComponent('CRYZO demo request')}&body=${encodeURIComponent(handoff)}`;

  const Field = ({ k, label, required, type = 'text', autoComplete, inputMode, placeholder, className = '' }) => (
    <div className={className}>
      <label htmlFor={`${uid}-${k}`} className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label}{required ? <span className="text-[#d92d20]" aria-hidden="true"> *</span> : <span className="font-normal text-slate-500"> (optional)</span>}
      </label>
      <input
        id={`${uid}-${k}`} className="lp-field" type={type} value={form[k]} onChange={set(k)}
        autoComplete={autoComplete} inputMode={inputMode} placeholder={placeholder}
        aria-required={required ? 'true' : undefined}
        aria-invalid={errors[k] ? 'true' : undefined}
        aria-describedby={errors[k] ? `${uid}-${k}-err` : undefined}
      />
      {errors[k] && <p id={`${uid}-${k}-err`} className="mt-1 text-xs font-medium text-[#d92d20]">{errors[k]}</p>}
    </div>
  );

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-20 sm:py-24" aria-labelledby="cta-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lp-cta-band relative overflow-hidden rounded-[32px] px-5 py-12 sm:px-10 sm:py-16 lg:px-14" data-reveal="zoom">
          <div className="lp-grid-bg opacity-40" aria-hidden="true" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" aria-hidden="true" />

          <div className="relative grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div className="min-w-0 text-ink">
              <h2 id="cta-title" className="text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                Ready to simplify your restaurant operations?
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/80 sm:text-lg">
                Book a free, no-obligation demo. We’ll show you billing, KOTs, the kitchen display and reports using a setup that looks like your restaurant.
              </p>
              <ul className="mt-8 space-y-3 text-[15px] font-semibold">
                {['Live walkthrough of billing, KOTs and the kitchen display', 'See reports and stock with sample data', 'Get answers on pricing, printers and devices'].map((t) => (
                  <li key={t} className="flex items-center gap-2.5"><CheckCircle2 size={19} aria-hidden="true" /> {t}</li>
                ))}
              </ul>
              <ul className="mt-10 grid max-w-md grid-cols-1 gap-3">
                {[
                  { icon: Phone, label: 'Call us', value: BRAND.phone, href: telHref },
                  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with our team', href: `https://wa.me/${whatsappNumber}`, ext: true },
                  { icon: Mail, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
                ].map((c) => (
                  <li key={c.label}>
                    <a href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-3 rounded-2xl bg-white/25 p-3 backdrop-blur transition-colors hover:bg-white/40">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-brand-light" aria-hidden="true"><c.icon size={18} /></span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-ink/70">{c.label}</span>
                        <span className="block truncate text-sm font-bold text-ink">{c.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-title`}
              className="relative min-w-0 rounded-3xl bg-white p-5 shadow-[0_30px_80px_-30px_rgba(15,17,21,.55)] sm:p-7">
              <h3 id={`${uid}-title`} className="text-xl font-bold text-slate-900">Book your free demo</h3>
              <p className="mt-1 text-sm text-slate-600">Fields marked * are required.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {Field({ k: 'name', label: 'Name', required: true, autoComplete: 'name', placeholder: 'e.g. Rahul Sharma' })}
                {Field({ k: 'phone', label: 'Phone number', required: true, type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '+91 98XXXXXXXX' })}
                {Field({ k: 'email', label: 'Email', required: true, type: 'email', autoComplete: 'email', inputMode: 'email', placeholder: 'you@restaurant.com' })}
                {Field({ k: 'restaurant', label: 'Restaurant name', required: true, autoComplete: 'organization', placeholder: 'e.g. Spice Garden' })}
                {Field({ k: 'city', label: 'City', required: true, autoComplete: 'address-level2', placeholder: 'e.g. Mumbai' })}
                <div>
                  <label htmlFor={`${uid}-outlets`} className="mb-1.5 block text-sm font-semibold text-slate-800">Number of outlets<span className="text-[#d92d20]" aria-hidden="true"> *</span></label>
                  <select id={`${uid}-outlets`} className="lp-field" value={form.outlets} onChange={set('outlets')} aria-required="true"
                    aria-invalid={errors.outlets ? 'true' : undefined} aria-describedby={errors.outlets ? `${uid}-outlets-err` : undefined}>
                    <option value="">Select…</option>
                    {OUTLET_COUNTS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.outlets && <p id={`${uid}-outlets-err`} className="mt-1 text-xs font-medium text-[#d92d20]">{errors.outlets}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-plan`} className="mb-1.5 block text-sm font-semibold text-slate-800">Interested plan <span className="font-normal text-slate-500">(optional)</span></label>
                  <select id={`${uid}-plan`} className="lp-field" value={plan} onChange={(e) => onPlanChange?.(e.target.value)}>
                    <option value="">Not sure yet — help me choose</option>
                    {plans.map((p) => <option key={p.id} value={p.name}>{p.name} ({p.label})</option>)}
                    {plan && !plans.some((p) => p.name === plan) && <option value={plan}>{plan}</option>}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm font-semibold text-slate-800">Message <span className="font-normal text-slate-500">(optional)</span></label>
                  <textarea id={`${uid}-message`} rows={3} className="lp-field resize-y" value={form.message} onChange={set('message')}
                    placeholder="Tables, current billing setup, anything we should know…" maxLength={600}
                    aria-invalid={errors.message ? 'true' : undefined} aria-describedby={errors.message ? `${uid}-message-err` : undefined} />
                  {errors.message && <p id={`${uid}-message-err`} className="mt-1 text-xs font-medium text-[#d92d20]">{errors.message}</p>}
                </div>
              </div>

              {/* Honeypot: hidden from people, bots tend to fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={`${uid}-website`}>Website</label>
                <input id={`${uid}-website`} type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} />
              </div>

              {!demoApiConfigured && (
                <p className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs leading-relaxed text-slate-600">
                  <Info size={15} className="mt-0.5 shrink-0 text-slate-500" aria-hidden="true" />
                  Online booking isn’t connected yet, so this form doesn’t store or send your details. After you submit, you can send them to our team on WhatsApp or by email in one tap.
                </p>
              )}

              <button type="submit" className="lp-btn lp-btn-primary mt-5 w-full" disabled={state.status === 'sending'}>
                <Send size={18} aria-hidden="true" /> {state.status === 'sending' ? 'Sending…' : 'Request my free demo'}
              </button>

              <p className="mt-3 text-center text-xs text-slate-500">
                See our <a href={PRIVACY_PATH} className="font-semibold text-brand-text underline underline-offset-2">Privacy Policy</a> for how we handle details you send us.
              </p>

              <div role="status" aria-live="polite" className="mt-4">
                {state.status === 'sent' && (
                  <p className={`lp-swap flex items-start gap-2 rounded-xl bg-success/10 px-3 py-3 text-sm font-medium text-[#067647] transition-opacity duration-300 ${leaving ? 'opacity-0' : 'opacity-100'}`}>
                    <CheckCircle2 size={18} className="shrink-0" aria-hidden="true" /> Thanks! Your demo request has been sent to the CRYZO team. We’ll contact you soon.
                  </p>
                )}
                {state.status === 'handoff' && (
                  <div className="rounded-2xl border border-[#ffd6b0] bg-[#fff8f1] p-4">
                    <p className="flex items-start gap-2 text-sm font-semibold text-slate-900">
                      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-brand-dark" aria-hidden="true" />
                      {state.failed ? 'We couldn’t submit the form right now — your details were not sent.' : 'Your details are ready — they haven’t been sent yet.'}
                    </p>
                    <p className="mt-1 pl-[26px] text-sm text-slate-600">Choose how to send them to the CRYZO team:</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <a href={waHref} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn-dark !min-h-[44px] w-full !text-sm">
                        <MessageCircle size={17} aria-hidden="true" /> Send on WhatsApp
                      </a>
                      <a href={mailHref} className="lp-btn lp-btn-outline !min-h-[44px] w-full !text-sm">
                        <Mail size={17} aria-hidden="true" /> Send by email
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
