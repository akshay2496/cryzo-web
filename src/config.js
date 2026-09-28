/**
 * Runtime configuration (set in `.env`, see `.env.example`).
 *
 * VITE_POS_APP_URL  Base URL of the CRYZO POS web app (the `frontend` project).
 *                   "Login" buttons go to <url>/login.
 * VITE_API_URL      Base URL of the CRYZO backend API (e.g. https://api.example.com/api).
 *                   Pricing plans are loaded only from GET /subscriptions/plans/active,
 *                   and demo requests go to /public/demo-request.
 * VITE_DEMO_API_URL Endpoint that receives demo requests (POST JSON) and emails them to the team.
 *                   Defaults to {VITE_API_URL}/public/demo-request (backend/routes/demoRequest.js).
 *                   If neither is set, the form hands the details over to WhatsApp / email instead.
 */
const trim = (v) => (v || '').trim().replace(/\/+$/, '');

const POS_APP_URL = trim(import.meta.env.VITE_POS_APP_URL) || 'http://localhost:5173';

export const LOGIN_URL = `${POS_APP_URL}/login`;
export const API_URL = trim(import.meta.env.VITE_API_URL);
export const DEMO_API_URL = trim(import.meta.env.VITE_DEMO_API_URL) || (API_URL ? `${API_URL}/public/demo-request` : '');
