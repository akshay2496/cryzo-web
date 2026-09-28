import { useEffect } from 'react';

/** CRYZO logo: the existing app mark (android-pos ic_launcher) + serif wordmark. */
export function BrandLogo({ size = 36, light = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/brand/cryzo-mark-96.png"
        srcSet="/brand/cryzo-mark-96.png 1x, /brand/cryzo-mark-192.png 2x"
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        className="rounded-[10px] shrink-0"
        decoding="async"
      />
      <span className={`lp-wordmark text-lg sm:text-xl ${light ? 'text-white' : 'text-slate-900'}`}>CRYZO</span>
    </span>
  );
}

/** Consistent section heading block (eyebrow + H2 + intro). */
export function SectionHeading({ eyebrow, title, intro, dark = false, align = 'center', id }) {
  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-4 max-w-3xl ${alignCls}`} data-reveal>
      {eyebrow && <span className={`lp-eyebrow ${dark ? 'lp-eyebrow-dark' : ''}`}>{eyebrow}</span>}
      <h2 id={id} className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.15] ${dark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      {intro && <p className={`text-base sm:text-lg leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{intro}</p>}
    </div>
  );
}

/** Small "product preview" label so mockups are never mistaken for live data. */
export function PreviewBadge({ children = 'Product preview · Sample data', dark = false }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide
      ${dark ? 'bg-white/10 text-slate-200 border border-white/15' : 'bg-slate-900/5 text-slate-600 border border-slate-200'}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
      {children}
    </span>
  );
}

/**
 * Scroll-triggered reveal: one IntersectionObserver for every [data-reveal]
 * and .lp-tilt element under rootRef. Adds `lp-motion` to the root only when
 * the user hasn't asked for reduced motion, so content is never hidden otherwise.
 */
export function useRevealOnScroll(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return undefined;

    // Anything already on screen stays visible (no hide-then-show flicker on pre-rendered pages)
    const vh = window.innerHeight;
    root.querySelectorAll('[data-reveal], .lp-tilt').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add('lp-in');
    });
    root.classList.add('lp-motion');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('lp-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    const SELECTOR = '[data-reveal], .lp-tilt';
    root.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));

    // Elements added later (e.g. pricing cards after the plans API responds) get observed too
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        const els = [...(node.matches?.(SELECTOR) ? [node] : []), ...node.querySelectorAll(SELECTOR)];
        els.forEach((el) => { if (!el.classList.contains('lp-in')) io.observe(el); });
      }));
    });
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove('lp-motion');
    };
  }, [rootRef]);
}
