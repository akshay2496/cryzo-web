/* =============================================================================
 * SEO — single source of truth for every page's <head>.
 * Used by the `seoHead` Vite plugin (vite.config.js) in dev and build, and by
 * scripts/prerender.mjs for sitemap.xml / robots.txt.
 *
 * Set VITE_SITE_URL (e.g. https://cryzo.in) to get canonical URLs, absolute
 * Open Graph images, a sitemap and full structured data.
 * ============================================================================= */
import { BRAND, FAQS } from './content.js';
import { LEGAL } from './legal/legalConfig.js';

export const SITE = {
  name: BRAND.name,
  locale: 'en_IN',
  themeColor: '#0f1115',
  ogImage: '/images/og-image.png',
  ogImageAlt: 'CRYZO Restaurant POS System — billing, tables, KOT, inventory and reports',
  logo: '/icons/icon-512.png',
};

/** Page definitions. `path` must match the built file location. */
export const PAGES = {
  home: {
    path: '/',
    file: 'index.html',
    title: 'Restaurant POS & Billing Software | CRYZO',
    description:
      'CRYZO restaurant POS: GST billing, tables, KOT, kitchen display, inventory, online & WhatsApp orders and sales reports on web and Android. Get a free demo.',
    priority: '1.0',
    changefreq: 'weekly',
  },
  privacy: {
    path: '/privacy-policy/',
    file: 'privacy-policy/index.html',
    title: 'Privacy Policy | CRYZO Restaurant POS',
    description:
      'How CRYZO collects, uses, shares and protects personal information in its restaurant POS web app, Android app, online ordering pages and WhatsApp bot.',
    breadcrumb: 'Privacy Policy',
    priority: '0.3',
    changefreq: 'yearly',
  },
  terms: {
    path: '/terms-and-conditions/',
    file: 'terms-and-conditions/index.html',
    title: 'Terms & Conditions | CRYZO Restaurant POS',
    description:
      'The terms that apply when restaurants and their staff use CRYZO’s restaurant POS, billing and management software, including plans, payments and data.',
    breadcrumb: 'Terms & Conditions',
    priority: '0.3',
    changefreq: 'yearly',
  },
};

/** Maps an HTML file path (as Vite reports it) to a page key. */
export function pageKeyForHtml(htmlPath = '') {
  const p = htmlPath.replace(/\\/g, '/');
  if (p.endsWith('privacy-policy/index.html')) return 'privacy';
  if (p.endsWith('terms-and-conditions/index.html')) return 'terms';
  return 'home';
}

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const trimUrl = (u) => (u || '').trim().replace(/\/+$/, '');

function jsonLd(pageKey, siteUrl) {
  const abs = (p) => (siteUrl ? `${siteUrl}${p}` : undefined);
  const page = PAGES[pageKey];
  const orgId = siteUrl ? `${siteUrl}/#organization` : undefined;
  const clean = (o) => JSON.parse(JSON.stringify(o)); // drops undefined values

  const organization = clean({
    '@type': 'Organization',
    '@id': orgId,
    name: BRAND.name,
    legalName: LEGAL.entityName || undefined,
    url: abs('/'),
    logo: abs(SITE.logo),
    email: BRAND.email,
    telephone: BRAND.phone.replace(/\s/g, ''),
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: BRAND.phone.replace(/\s/g, ''),
      email: BRAND.email,
      areaServed: 'IN',
    }],
  });

  const graph = [organization];

  if (pageKey === 'home') {
    if (siteUrl) {
      graph.push({ '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: BRAND.name, publisher: { '@id': orgId }, inLanguage: 'en-IN' });
    }
    graph.push(clean({
      '@type': 'SoftwareApplication',
      name: BRAND.name,
      description: page.description,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Restaurant POS System',
      operatingSystem: 'Web, Android',
      url: abs('/'),
      image: abs(SITE.ogImage),
      publisher: orgId ? { '@id': orgId } : undefined,
    }));
    graph.push({
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  } else {
    graph.push(clean({
      '@type': 'WebPage',
      name: page.breadcrumb,
      url: abs(page.path),
      description: page.description,
      dateModified: LEGAL.effectiveDateISO,
      inLanguage: 'en-IN',
      publisher: orgId ? { '@id': orgId } : undefined,
    }));
    if (siteUrl) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: `${siteUrl}${page.path}` },
        ],
      });
    }
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

/**
 * Returns the SEO <head> markup for a page.
 * @param {'home'|'privacy'|'terms'} pageKey
 * @param {{ siteUrl?: string, googleVerification?: string }} opts
 */
export function buildHead(pageKey, { siteUrl, googleVerification } = {}) {
  const url = trimUrl(siteUrl);
  const page = PAGES[pageKey] || PAGES.home;
  const canonical = url ? `${url}${page.path}` : '';
  const image = url ? `${url}${SITE.ogImage}` : SITE.ogImage;

  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    canonical && `<link rel="canonical" href="${esc(canonical)}" />`,
    googleVerification && `<meta name="google-site-verification" content="${esc(googleVerification)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    canonical && `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(SITE.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="theme-color" content="${SITE.themeColor}" />`,
    `<script type="application/ld+json">${jsonLd(pageKey, url)}</script>`,
  ].filter(Boolean);

  return tags.map((t) => `    ${t}`).join('\n');
}

/** sitemap.xml contents (requires siteUrl). */
export function buildSitemap(siteUrl, lastmod = new Date().toISOString().slice(0, 10)) {
  const url = trimUrl(siteUrl);
  const entries = Object.values(PAGES).map((p) => [
    '  <url>',
    `    <loc>${esc(url + p.path)}</loc>`,
    `    <lastmod>${p.path === '/' ? lastmod : LEGAL.effectiveDateISO}</lastmod>`,
    `    <changefreq>${p.changefreq}</changefreq>`,
    `    <priority>${p.priority}</priority>`,
    '  </url>',
  ].join('\n'));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
}

/** robots.txt contents. */
export function buildRobots(siteUrl) {
  const url = trimUrl(siteUrl);
  return ['User-agent: *', 'Allow: /', url ? `\nSitemap: ${url}/sitemap.xml` : ''].join('\n') + '\n';
}
