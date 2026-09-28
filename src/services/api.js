import { API_URL, DEMO_API_URL } from '../config';

/** True when the backend API is configured (VITE_API_URL). */
export const apiConfigured = Boolean(API_URL);

/**
 * Loads the active subscription plans from the CRYZO backend — the same plans the
 * super admin manages in the POS app (Subscription Plans screen).
 * Public endpoint: GET {API_URL}/subscriptions/plans/active (backend/routes/subscriptions.js).
 * Throws if the API isn't configured or doesn't respond; nothing is hard-coded here.
 */
export async function fetchPlans({ signal } = {}) {
  if (!API_URL) throw new Error('VITE_API_URL is not configured');
  const res = await fetch(`${API_URL}/subscriptions/plans/active`, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Plans request failed (HTTP ${res.status})`);
  const rows = await res.json();
  if (!Array.isArray(rows)) throw new Error('Unexpected plans response');
  return rows
    .filter((p) => p && p.name != null && p.price != null)
    .map((p) => ({
      id: p.id ?? p.name,
      name: String(p.name),
      duration: Number(p.duration_days) || 0,
      unit: p.duration_unit || 'days',
      label: p.duration_label || `${p.duration_days} ${p.duration_unit || 'days'}`,
      price: Number(p.price) || 0,
      description: p.description || '',
    }));
  // Order is kept exactly as returned by the API (backend sorts by duration).
}

/** True when a demo-request endpoint is available (VITE_DEMO_API_URL, or derived from VITE_API_URL). */
export const demoApiConfigured = Boolean(DEMO_API_URL);

/**
 * Sends a demo request to the backend (POST /api/public/demo-request), which emails it to the team.
 * Resolves to { ok, status, message, errors }.
 */
export async function submitDemoRequest(payload) {
  if (!DEMO_API_URL) return { ok: false, status: 0 };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(DEMO_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    let data = {};
    try { data = await res.json(); } catch { /* non-JSON response */ }
    return { ok: res.ok, status: res.status, message: data.message, errors: data.errors };
  } finally {
    clearTimeout(timer);
  }
}
