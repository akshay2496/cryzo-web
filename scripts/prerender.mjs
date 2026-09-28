/**
 * Post-build step: pre-renders every page to static HTML and writes robots.txt / sitemap.xml.
 * Run automatically by `npm run build`.
 */
import { readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { loadEnv } from 'vite';
import { PAGES, buildSitemap, buildRobots } from '../src/seo.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');
const env = loadEnv('production', root, '');
const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

// Inline the (small) stylesheet so the first paint doesn't wait for an extra CSS request,
// and preload the two font files used above the fold.
const assets = readdirSync(resolve(dist, 'assets'));
const fontPreloads = ['inter-latin-400-normal', 'inter-latin-800-normal']
  .map((name) => assets.find((f) => f.startsWith(name) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');
const inlineCss = (html) => html.replace(
  /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g,
  (_, href) => `<style>${readFileSync(resolve(dist, href.slice(1)), 'utf8')}</style>`
);

for (const [key, page] of Object.entries(PAGES)) {
  const file = resolve(dist, page.file);
  if (!existsSync(file)) throw new Error(`Missing built page: ${page.file}`);
  const html = readFileSync(file, 'utf8');
  if (!html.includes('<!--app-html-->')) throw new Error(`No <!--app-html--> marker in ${page.file}`);
  const out = inlineCss(html)
    .replace('</head>', `    ${fontPreloads}\n  </head>`)
    .replace('<!--app-html-->', render(key));
  writeFileSync(file, out);
  console.log(`✓ pre-rendered ${page.path}`);
}

writeFileSync(resolve(dist, 'robots.txt'), buildRobots(siteUrl));
if (siteUrl) {
  writeFileSync(resolve(dist, 'sitemap.xml'), buildSitemap(siteUrl));
  console.log(`✓ robots.txt + sitemap.xml for ${siteUrl}`);
} else {
  console.warn('! VITE_SITE_URL is not set — no sitemap.xml, canonical URLs or absolute share images. Set it in .env for production.');
}

rmSync(ssrDir, { recursive: true, force: true });
