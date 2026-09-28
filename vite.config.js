import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { buildHead, pageKeyForHtml } from './src/seo.js';

/** Injects each page's SEO <head> tags (from src/seo.js) in dev and build. */
function seoHead(env) {
  return {
    name: 'cryzo-seo-head',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const key = pageKeyForHtml(ctx.filename || ctx.path);
        const head = buildHead(key, { siteUrl: env.VITE_SITE_URL, googleVerification: env.VITE_GOOGLE_SITE_VERIFICATION });
        return html.replace('<!--seo-head-->', head.trimStart());
      },
    },
  };
}

// Multi-page build: home + legal pages, each with its own pre-rendered HTML
// (good for SEO and works on any static host without rewrite rules).
// Runs on 5174 so it can run alongside the POS app (frontend, port 5173).
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const root = process.cwd();
  return {
    plugins: [react(), seoHead(env)],
    ssr: { noExternal: ['lucide-react'] },
    build: isSsrBuild ? {} : {
      rollupOptions: {
        input: {
          main: resolve(root, 'index.html'),
          privacy: resolve(root, 'privacy-policy/index.html'),
          terms: resolve(root, 'terms-and-conditions/index.html'),
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5174,
      // Lets VITE_API_URL=/api reach the CRYZO backend in development without CORS setup.
      proxy: {
        '/api': { target: env.VITE_API_PROXY_TARGET || 'http://localhost:5000', changeOrigin: true },
      },
    },
    preview: { port: 4174 },
  };
});
