/* Server entry used only at build time (scripts/prerender.mjs) to pre-render each page
 * to static HTML, so search engines and link previews see the full content without JS. */
import { renderToString } from 'react-dom/server';
import App from './App';
import LegalPage from './legal/LegalPage';
import { PRIVACY } from './legal/privacyContent';
import { TERMS } from './legal/termsContent';

export function render(page) {
  if (page === 'privacy') return renderToString(<LegalPage doc={PRIVACY} kind="privacy" />);
  if (page === 'terms') return renderToString(<LegalPage doc={TERMS} kind="terms" />);
  return renderToString(<App />);
}
