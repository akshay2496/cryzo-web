import { ChefHat, CheckCircle2, Search, Printer, LayoutGrid, Receipt, BarChart3, Boxes, Users, Settings2, TrendingUp, IndianRupee, ShoppingBag, UtensilsCrossed, Clock } from 'lucide-react';
import { PreviewBadge } from './Primitives';

/* Sample data only — used to illustrate the product UI. */
const HERO_ITEMS = [
  { name: 'Tandoori Roti', price: 40, veg: true, qty: 2 },
  { name: 'Paneer Tikka', price: 180, veg: true, qty: 1 },
  { name: 'Butter Chicken', price: 280, veg: false, qty: 1 },
  { name: 'Dal Fry', price: 90, veg: true },
  { name: 'Jeera Rice', price: 120, veg: true },
  { name: 'Veg Biryani', price: 150, veg: true },
];
const CATS = ['All', 'Roti', 'Starters', 'Main Course', 'Rice', 'Beverages'];

const inr = (n, d = 0) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d })}`;

function VegMark({ veg }) {
  return (
    <span
      className={`inline-flex h-3 w-3 items-center justify-center rounded-[3px] border ${veg ? 'border-success' : 'border-[#f04438]'}`}
      role="img"
      aria-label={veg ? 'Veg' : 'Non-veg'}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${veg ? 'bg-success' : 'bg-[#f04438]'}`} />
    </span>
  );
}

/** Hero visual: POS billing screen + floating status cards. */
export function HeroBillingMockup({ floating = true, solid = false }) {
  const cart = HERO_ITEMS.filter((i) => i.qty);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cgst = subtotal * 0.025;
  const total = subtotal + cgst * 2;

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* glow */}
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-tr from-brand/30 via-transparent to-info/25 blur-2xl" aria-hidden="true" />

      <figure
        className={`${solid ? 'bg-ink-2 border border-white/10 shadow-[0_40px_80px_-30px_rgba(15,17,21,.55)]' : 'lp-glass'} overflow-hidden rounded-[22px] sm:rounded-[26px] text-left`}
        aria-label="Preview of the CRYZO POS billing screen with sample menu items and a running bill"
      >
        {/* window bar */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f04438]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f79009]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/80" />
          </div>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-xs font-semibold text-white">POS Billing</p>
            <p className="truncate text-[10px] text-slate-400">Table 5 · Dine-in</p>
          </div>
          <PreviewBadge dark>Preview</PreviewBadge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_210px]">
          {/* menu */}
          <div className="p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-[11px] text-slate-400">
              <Search size={13} aria-hidden="true" /> Search menu items…
            </div>
            <div className="mb-3 flex gap-1.5 overflow-hidden" aria-hidden="true">
              {CATS.map((c, i) => (
                <span
                  key={c}
                  className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-semibold ${
                    i === 1 ? 'bg-brand text-ink' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {c}
                </span>
              ))}
            </div>
            <ul className="grid grid-cols-2 gap-2 lg:grid-cols-3">
              {HERO_ITEMS.map((item) => (
                <li
                  key={item.name}
                  className={`relative rounded-xl border p-2.5 ${
                    item.qty ? 'border-brand/70 bg-brand/[0.08]' : 'border-white/[0.08] bg-white/[0.03]'
                  }`}
                >
                  {item.qty && (
                    <span className="absolute right-2 top-2 rounded-md bg-brand px-1.5 text-[9px] font-bold text-ink">
                      ×{item.qty}
                    </span>
                  )}
                  <VegMark veg={item.veg} />
                  <p className="mt-1.5 truncate text-[11px] font-semibold text-white">{item.name}</p>
                  <p className="text-[11px] font-bold text-brand-light">{inr(item.price)}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* bill */}
          <div className="border-t border-white/10 bg-black/20 p-3 sm:border-l sm:border-t-0 sm:p-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Your order</p>
            <ul className="space-y-1.5">
              {cart.map((i) => (
                <li key={i.name} className="flex items-center justify-between gap-2 border-l-2 border-brand pl-2 text-[11px]">
                  <span className="truncate text-slate-200">{i.name} <span className="text-slate-400">×{i.qty}</span></span>
                  <span className="font-semibold text-white">{inr(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 space-y-1 border-t border-dashed border-white/15 pt-2 text-[10px] text-slate-400">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(subtotal, 2)}</dd></div>
              <div className="flex justify-between"><dt>CGST 2.5%</dt><dd>{inr(cgst, 2)}</dd></div>
              <div className="flex justify-between"><dt>SGST 2.5%</dt><dd>{inr(cgst, 2)}</dd></div>
              <div className="flex justify-between pt-1 text-xs font-bold text-white"><dt>Total</dt><dd>{inr(total, 2)}</dd></div>
            </dl>
            <div className="mt-3 grid grid-cols-2 gap-1.5" aria-hidden="true">
              <span className="flex items-center justify-center gap-1 rounded-lg bg-white/10 py-2 text-[10px] font-semibold text-white">
                <ChefHat size={12} /> KOT
              </span>
              <span className="flex items-center justify-center gap-1 rounded-lg bg-brand py-2 text-[10px] font-bold text-ink">
                <Printer size={12} /> Print Bill
              </span>
            </div>
          </div>
        </div>
      </figure>

      {floating && (
        <>
      {/* floating cards */}
      <div className="lp-float pointer-events-none absolute -left-3 -top-5 hidden sm:block lg:-left-10" aria-hidden="true">
        <div className="lp-glass flex items-center gap-3 rounded-2xl px-3.5 py-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/15 text-success">
            <ChefHat size={18} />
          </span>
          <div>
            <p className="text-xs font-bold text-white">KOT #24 sent</p>
            <p className="text-[10px] text-slate-400">Kitchen · Table 5</p>
          </div>
          <span className="lp-pulse-dot ml-1 h-2 w-2 rounded-full bg-success text-success" />
        </div>
      </div>

      <div className="lp-float lp-float-delay pointer-events-none absolute -bottom-6 -right-2 hidden sm:block lg:-right-8" aria-hidden="true">
        <div className="lp-glass flex items-center gap-3 rounded-2xl px-3.5 py-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand-light">
            <CheckCircle2 size={18} />
          </span>
          <div>
            <p className="text-xs font-bold text-white">Paid via UPI</p>
            <p className="text-[10px] text-slate-400">{inr(total, 2)} · Bill settled</p>
          </div>
        </div>
      </div>

      <div className="lp-float lp-float-slow pointer-events-none absolute -bottom-16 left-8 hidden xl:block" aria-hidden="true">
        <div className="lp-glass rounded-2xl px-3.5 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tables</p>
          <div className="mt-1.5 grid grid-cols-4 gap-1">
            {['#12b76a', '#f04438', '#12b76a', '#f79009', '#f04438', '#12b76a', '#12b76a', '#f04438'].map((c, i) => (
              <span key={i} className="h-4 w-4 rounded-[5px]" style={{ background: `${c}33`, border: `1px solid ${c}` }} />
            ))}
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
}

/* ---------------- Dashboard showcase ---------------- */

const HOURLY = [2, 3.5, 3, 6, 9.5, 7, 4, 3.2, 5, 8.6, 11, 9]; // ₹ thousands, sample
const HOURS = ['11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p'];
const TOP_ITEMS = [
  { name: 'Butter Chicken', orders: 38, amount: 10640 },
  { name: 'Tandoori Roti', orders: 85, amount: 3400 },
  { name: 'Paneer Tikka', orders: 42, amount: 7560 },
  { name: 'Jeera Rice', orders: 55, amount: 6600 },
];
const RECENT = [
  { id: '#1044', table: 'T-5', amount: 567, status: 'Preparing', tone: 'orange' },
  { id: '#1043', table: 'Online', amount: 820, status: 'Ready', tone: 'green' },
  { id: '#1042', table: 'T-2', amount: 1240, status: 'Served', tone: 'blue' },
  { id: '#1041', table: 'Token 18', amount: 310, status: 'Preparing', tone: 'orange' },
];
const STOCK = [
  { name: 'Paneer', left: '1.5 kg', level: 18, tone: '#f04438' },
  { name: 'Butter Naan dough', left: '24 pcs', level: 30, tone: '#f79009' },
  { name: 'Basmati Rice', left: '6 kg', level: 45, tone: '#f79009' },
];
const TONE = {
  green: 'bg-success/10 text-[#067647]',
  orange: 'bg-brand/10 text-brand-text',
  blue: 'bg-info/10 text-[#175cd3]',
};

function buildPath(values, w, h, pad = 6) {
  const max = Math.max(...values) * 1.1;
  const step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)]);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return { line: d, area: `${d} L ${pts[pts.length - 1][0]} ${h} L ${pts[0][0]} ${h} Z`, pts };
}

export function DashboardPreview() {
  const W = 560;
  const H = 180;
  const { line, area, pts } = buildPath(HOURLY, W, H);
  const peak = pts[10];
  const kpis = [
    { label: "Today's Sales", value: '₹18,420', delta: '+12%', icon: IndianRupee, c: '#fc8019' },
    { label: 'Orders', value: '42', delta: '+8%', icon: ShoppingBag, c: '#2e90fa' },
    { label: 'Avg. Order', value: '₹438', delta: '+3%', icon: Receipt, c: '#12b76a' },
    { label: 'Customers', value: '35', delta: '+10%', icon: Users, c: '#7a5af8' },
  ];
  const nav = [LayoutGrid, Receipt, UtensilsCrossed, ChefHat, Boxes, BarChart3, Settings2];

  return (
    <figure
      className="overflow-hidden rounded-[22px] border border-slate-200 bg-white text-left shadow-[0_40px_100px_-40px_rgba(15,17,21,.45)]"
      aria-label="Preview of the CRYZO dashboard with sample sales, orders, top items and payment summaries"
    >
      {/* top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="hidden sm:block flex-1 max-w-xs mx-auto rounded-lg bg-white border border-slate-200 px-3 py-1 text-center text-[11px] text-slate-500">
          Dashboard · Today's summary
        </div>
        <PreviewBadge />
      </div>

      <div className="flex">
        {/* sidebar */}
        <div className="hidden md:flex flex-col items-center gap-3 border-r border-slate-100 bg-ink px-3 py-5" aria-hidden="true">
          <img src="/brand/cryzo-mark-96.png" alt="" width="32" height="32" className="mb-2 rounded-lg" loading="lazy" />
          {nav.map((Icon, i) => (
            <span key={i} className={`flex h-9 w-9 items-center justify-center rounded-xl ${i === 0 ? 'bg-brand text-ink' : 'text-slate-500'}`}>
              <Icon size={17} />
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1 space-y-4 p-4 sm:p-5">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {kpis.map((k, i) => (
              <div key={k.label} className="rounded-2xl border border-slate-100 bg-white p-3 sm:p-4" data-reveal style={{ '--lp-delay': `${i * 80}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500">{k.label}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${k.c}1a`, color: k.c }} aria-hidden="true">
                    <k.icon size={14} />
                  </span>
                </div>
                <p className="mt-1.5 text-lg sm:text-xl font-extrabold text-slate-900">{k.value}</p>
                <p className="text-[11px] font-semibold text-[#067647]">{k.delta} <span className="font-normal text-slate-500">vs last week</span></p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            {/* area chart */}
            <div className="rounded-2xl border border-slate-100 p-3 sm:p-4" data-reveal>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">Hourly sales</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#067647]"><TrendingUp size={12} aria-hidden="true" /> Peak 9 PM</span>
              </div>
              <svg viewBox={`0 0 ${W} ${H + 18}`} className="h-auto w-full" role="img" aria-label="Sample hourly sales chart peaking at 9 PM">
                <defs>
                  <linearGradient id="lpArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fc8019" stopOpacity=".35" />
                    <stop offset="100%" stopColor="#fc8019" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((g) => (
                  <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#eef1f5" strokeDasharray="4 6" />
                ))}
                <path d={area} fill="url(#lpArea)" />
                <path d={line} fill="none" stroke="#fc8019" strokeWidth="3" strokeLinecap="round" className="lp-draw" />
                <circle cx={peak[0]} cy={peak[1]} r="6" fill="#fff" stroke="#fc8019" strokeWidth="3" />
                {HOURS.map((h, i) => (
                  <text key={h} x={pts[i][0]} y={H + 14} textAnchor="middle" fontSize="11" fill="#94a3b8">{h}</text>
                ))}
              </svg>
            </div>

            {/* payment split */}
            <div className="rounded-2xl border border-slate-100 p-3 sm:p-4" data-reveal style={{ '--lp-delay': '120ms' }}>
              <p className="mb-3 text-sm font-bold text-slate-900">Payment modes</p>
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 42 42" className="h-24 w-24 shrink-0 -rotate-90" role="img" aria-label="Sample payment split: UPI 52%, Cash 31%, Card 17%">
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#fc8019" strokeWidth="6" strokeDasharray="52 48" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#2e90fa" strokeWidth="6" strokeDasharray="31 69" strokeDashoffset="-52" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="#12b76a" strokeWidth="6" strokeDasharray="17 83" strokeDashoffset="-83" />
                </svg>
                <ul className="space-y-2 text-xs">
                  {[['UPI', '52%', '#fc8019'], ['Cash', '31%', '#2e90fa'], ['Card', '17%', '#12b76a']].map(([l, v, c]) => (
                    <li key={l} className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} aria-hidden="true" />
                      <span className="text-slate-600">{l}</span>
                      <span className="font-bold text-slate-900">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex items-end gap-1.5 h-16" aria-hidden="true">
                {[45, 58, 40, 70, 55, 88, 76].map((h, i) => (
                  <span key={i} className="lp-bar flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 5 ? '#fc8019' : '#e2e8f0', '--lp-delay': `${i * 60}ms` }} />
                ))}
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-slate-500" aria-hidden="true">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="flex-1 text-center">{d}</span>)}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {/* top items */}
            <div className="rounded-2xl border border-slate-100 p-3 sm:p-4" data-reveal>
              <p className="mb-2 text-sm font-bold text-slate-900">Top selling items</p>
              <ul className="divide-y divide-slate-100">
                {TOP_ITEMS.map((t, i) => (
                  <li key={t.name} className="flex items-center justify-between gap-2 py-2 text-xs">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-600">{i + 1}</span>
                      <span className="truncate font-medium text-slate-800">{t.name}</span>
                    </span>
                    <span className="shrink-0 text-slate-500">{t.orders} orders</span>
                    <span className="shrink-0 font-bold text-slate-900">{inr(t.amount)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* active orders */}
            <div className="rounded-2xl border border-slate-100 p-3 sm:p-4" data-reveal style={{ '--lp-delay': '120ms' }}>
              <p className="mb-2 flex items-center justify-between text-sm font-bold text-slate-900">
                Active orders <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500"><Clock size={11} aria-hidden="true" /> Live</span>
              </p>
              <ul className="divide-y divide-slate-100">
                {RECENT.map((o) => (
                  <li key={o.id} className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 py-2 text-xs">
                    <span className="font-semibold text-slate-900">{o.id}</span>
                    <span className="truncate text-slate-500">{o.table}</span>
                    <span className="font-bold text-slate-900">{inr(o.amount)}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${TONE[o.tone]}`}>{o.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* low stock */}
            <div className="rounded-2xl border border-slate-100 p-3 sm:p-4" data-reveal style={{ '--lp-delay': '200ms' }}>
              <p className="mb-2 flex items-center justify-between text-sm font-bold text-slate-900">
                Low stock <span className="rounded-full bg-[#f04438]/10 px-2 py-0.5 text-[10px] font-semibold text-[#b42318]">3 items</span>
              </p>
              <ul className="space-y-3">
                {STOCK.map((st) => (
                  <li key={st.name} className="text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium text-slate-800">{st.name}</span>
                      <span className="shrink-0 font-semibold text-slate-600">{st.left}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                      <div className="h-full rounded-full" style={{ width: `${st.level}%`, background: st.tone }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

/* ---------------- Inventory preview (sample data) ---------------- */
const INVENTORY = [
  { item: 'Paneer', unit: 'kg', qty: 1.5, min: 5, status: 'Low' },
  { item: 'Chicken (boneless)', unit: 'kg', qty: 12, min: 8, status: 'OK' },
  { item: 'Butter Naan dough', unit: 'pcs', qty: 24, min: 40, status: 'Low' },
  { item: 'Basmati Rice', unit: 'kg', qty: 0, min: 10, status: 'Out' },
  { item: 'Cold Drink 250 ml', unit: 'pcs', qty: 86, min: 24, status: 'OK' },
];
const STATUS_STYLE = {
  OK: 'bg-[#12b76a]/10 text-[#067647]',
  Low: 'bg-[#f79009]/10 text-[#b54708]',
  Out: 'bg-[#f04438]/10 text-[#b42318]',
};

export function InventoryMock() {
  return (
    <figure
      className="relative w-full overflow-hidden rounded-[22px] border border-slate-200 bg-white text-left shadow-[0_30px_80px_-40px_rgba(15,17,21,.45)]"
      aria-label="Preview of the CRYZO stock screen with sample items, quantities and low-stock status"
    >
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-900"><Boxes size={16} className="text-brand-dark" aria-hidden="true" /> Stock</p>
        <PreviewBadge />
      </div>
      <div className="grid grid-cols-3 gap-2 p-4 pb-2" aria-hidden="true">
        {[['Items tracked', '48', 'text-slate-900'], ['Low stock', '2', 'text-[#b54708]'], ['Out of stock', '1', 'text-[#b42318]']].map(([l, v, c]) => (
          <div key={l} className="rounded-xl border border-slate-100 p-2.5">
            <p className="text-[10px] font-medium text-slate-500">{l}</p>
            <p className={`text-lg font-extrabold ${c}`}>{v}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto px-4 pb-4">
        <table className="w-full min-w-[300px] text-left text-xs">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-slate-500">
              <th scope="col" className="py-2 font-semibold">Item</th>
              <th scope="col" className="py-2 font-semibold">In stock</th>
              <th scope="col" className="py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {INVENTORY.map((r) => (
              <tr key={r.item}>
                <td className="py-2.5 pr-2 font-medium text-slate-800">{r.item}</td>
                <td className="py-2.5 pr-2 text-slate-600">{r.qty} {r.unit}</td>
                <td className="py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[r.status]}`}>{r.status === 'Out' ? 'Out of stock' : r.status === 'Low' ? 'Low stock' : 'In stock'}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-4 mb-4 flex items-center justify-between rounded-xl bg-[#fff6ee] px-3 py-2.5 text-xs" aria-hidden="true">
        <span className="font-semibold text-slate-800">Purchase entry · Fresh Dairy Supplies</span>
        <span className="font-bold text-brand-text">+10 kg Paneer</span>
      </div>
    </figure>
  );
}

/* ---------------- WhatsApp ordering preview (sample chat) ---------------- */
function Bubble({ from = 'bot', children }) {
  const me = from === 'me';
  return (
    <div className={`flex ${me ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-[12px] leading-snug shadow-sm ${me ? 'rounded-br-md bg-[#d9fdd3] text-slate-800' : 'rounded-bl-md bg-white text-slate-800'}`}>
        {children}
      </div>
    </div>
  );
}

export function WhatsAppMock() {
  return (
    <div className="relative mx-auto grid w-full max-w-[560px] gap-5 sm:grid-cols-[1fr_0.9fr] sm:items-end">
      <figure
        className="overflow-hidden rounded-[26px] border border-slate-200 bg-[#efeae2] text-left shadow-[0_30px_70px_-35px_rgba(15,17,21,.5)]"
        aria-label="Sample WhatsApp chat where a customer orders from the CRYZO ordering bot"
      >
        <div className="flex items-center gap-2.5 bg-[#075e54] px-4 py-3 text-white">
          <img src="/brand/cryzo-mark-96.png" alt="" width="30" height="30" className="rounded-full" loading="lazy" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Your Restaurant</p>
            <p className="text-[10px] text-white/70">Ordering bot · sample chat</p>
          </div>
        </div>
        <div className="space-y-2 p-3">
          <Bubble>👋 Welcome! Reply <b>1</b> to view the menu, <b>2</b> to track an order.</Bubble>
          <Bubble from="me">1</Bubble>
          <Bubble>Main Course: 1. Butter Chicken ₹280 · 2. Dal Fry ₹90 · 3. Veg Biryani ₹150</Bubble>
          <Bubble from="me">1 x2</Bubble>
          <Bubble>🛒 Cart: Butter Chicken ×2 — ₹560. Delivery or takeaway?</Bubble>
          <Bubble from="me">Takeaway</Bubble>
          <Bubble>✅ Order placed! We’ll message you when it’s ready.</Bubble>
        </div>
      </figure>

      <figure className="rounded-[22px] border border-slate-200 bg-white p-4 text-left shadow-[0_24px_60px_-35px_rgba(15,17,21,.45)]" aria-label="Sample online order card in the CRYZO Online Orders screen">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Online Orders</p>
          <span className="lp-pulse-dot h-2 w-2 rounded-full bg-success text-success" aria-hidden="true" />
        </div>
        <p className="mt-3 text-sm font-bold text-slate-900">#1045 · WhatsApp</p>
        <p className="text-xs text-slate-500">Takeaway · 2 items</p>
        <p className="mt-2 text-xl font-extrabold text-slate-900">₹560</p>
        <div className="mt-3 grid grid-cols-2 gap-2" aria-hidden="true">
          <span className="rounded-lg bg-ink py-2 text-center text-[11px] font-semibold text-white">Accept</span>
          <span className="rounded-lg border border-slate-200 py-2 text-center text-[11px] font-semibold text-slate-700">View</span>
        </div>
        <div className="mt-4 border-t border-dashed border-slate-200 pt-3">
          <p className="text-[11px] font-semibold text-slate-500">Also arriving from</p>
          <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-semibold">
            <span className="rounded-full bg-[#fff4ea] px-2 py-1 text-brand-text">Ordering page</span>
            <span className="rounded-full bg-[#eaf4ff] px-2 py-1 text-[#175cd3]">QR menu</span>
          </div>
        </div>
      </figure>
    </div>
  );
}
