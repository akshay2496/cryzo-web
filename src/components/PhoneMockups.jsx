import { useEffect, useRef, useState } from 'react';
import {
  Search, ShoppingCart, ClipboardList, ChefHat, BarChart3, Settings, Plus, Minus, Clock, Printer,
  TrendingUp, IndianRupee, Receipt, Users, UtensilsCrossed, ChevronRight, Wifi, BatteryFull, Signal,
} from 'lucide-react';

/* =============================================================================
 * Code-built phone mockups of the CRYZO Android POS app (dark theme, brand orange).
 * They mirror the real app screens (android-pos/ui/screens) with readable
 * sample data, and stay sharp at any size — unlike the small Play Store PNGs.
 * All figures are SAMPLE DATA for illustration.
 * ============================================================================= */

const BASE_W = 260; // design width of the phone in px (everything inside is laid out for this width)
const BASE_H = 540;

const inr = (n, d = 0) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d })}`;

function Veg({ veg = true }) {
  return (
    <span className={`inline-flex h-2.5 w-2.5 items-center justify-center rounded-[2px] border ${veg ? 'border-[#12b76a]' : 'border-[#f04438]'}`}>
      <span className={`h-1 w-1 rounded-full ${veg ? 'bg-[#12b76a]' : 'bg-[#f04438]'}`} />
    </span>
  );
}

function Pill({ tone = 'orange', children }) {
  const t = {
    orange: 'bg-[#fc8019]/15 text-[#ff9f4d]',
    green: 'bg-[#12b76a]/15 text-[#32d583]',
    blue: 'bg-[#2e90fa]/15 text-[#53b1fd]',
    red: 'bg-[#f04438]/15 text-[#f97066]',
    gray: 'bg-white/10 text-slate-300',
  }[tone];
  return <span className={`rounded-full px-1.5 py-[1px] text-[8.5px] font-semibold ${t}`}>{children}</span>;
}

function AppHeader({ title, sub, right }) {
  return (
    <div className="relative overflow-hidden border-t-2 border-[#fc8019] bg-gradient-to-b from-[#1e222b] to-[#171a21] px-3 pb-2.5 pt-2">
      <div className="absolute -right-6 -top-8 h-16 w-16 rounded-full bg-[#fc8019]/10" />
      <div className="relative flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold text-white">{title}</p>
          {sub && <p className="truncate text-[9px] text-slate-400">{sub}</p>}
        </div>
        {right}
      </div>
    </div>
  );
}

const NAV = [
  { key: 'pos', label: 'POS', icon: ShoppingCart },
  { key: 'orders', label: 'Orders', icon: ClipboardList },
  { key: 'kitchen', label: 'Kitchen', icon: ChefHat },
  { key: 'reports', label: 'Reports', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

function BottomNav({ active }) {
  return (
    <div className="grid grid-cols-5 border-t border-white/10 bg-[#171a21] px-1 pb-2 pt-1.5">
      {NAV.map((n) => (
        <span key={n.key} className={`flex flex-col items-center gap-0.5 text-[8px] font-medium ${n.key === active ? 'text-[#ff9130]' : 'text-slate-400'}`}>
          <n.icon size={13} strokeWidth={n.key === active ? 2.4 : 2} />
          {n.label}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------- Screens ------------------------------- */

const POS_ITEMS = [
  { name: 'Tandoori Roti', price: 40, veg: true, qty: 2 },
  { name: 'Paneer Tikka', price: 180, veg: true, qty: 1 },
  { name: 'Butter Chicken', price: 280, veg: false, qty: 1 },
  { name: 'Dal Fry', price: 90, veg: true },
  { name: 'Jeera Rice', price: 120, veg: true },
  { name: 'Veg Biryani', price: 150, veg: true },
  { name: 'Garlic Naan', price: 60, veg: true },
  { name: 'Chicken Biryani', price: 240, veg: false },
];

function PosScreen() {
  const cart = POS_ITEMS.filter((i) => i.qty);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const sub = cart.reduce((s, i) => s + i.qty * i.price, 0);
  return (
    <>
      <AppHeader title="POS Billing" sub="Table 5 · Dine-in · Round 1" right={<Pill>T-5</Pill>} />
      <div className="flex-1 space-y-2 overflow-hidden px-2.5 py-2">
        <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2 py-1.5 text-[9px] text-slate-400">
          <Search size={10} /> Search menu items…
        </div>
        <div className="flex gap-1 overflow-hidden">
          {['All', 'Roti', 'Starters', 'Main', 'Rice'].map((c, i) => (
            <span key={c} className={`shrink-0 rounded-md px-2 py-0.5 text-[8.5px] font-semibold ${i === 3 ? 'bg-[#fc8019] text-[#0f1115]' : 'bg-white/[0.06] text-slate-400'}`}>{c}</span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {POS_ITEMS.map((it) => (
            <div key={it.name} className={`rounded-lg border p-1.5 ${it.qty ? 'border-[#fc8019]/70 bg-[#fc8019]/[0.09]' : 'border-white/[0.08] bg-white/[0.03]'}`}>
              <div className="flex items-center justify-between"><Veg veg={it.veg} />{it.qty && <span className="rounded bg-[#fc8019] px-1 text-[8px] font-bold text-[#0f1115]">×{it.qty}</span>}</div>
              <p className="mt-1 truncate text-[10px] font-semibold text-white">{it.name}</p>
              <div className="mt-0.5 flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#ff9130]">{inr(it.price)}</span>
                {it.qty ? (
                  <span className="flex items-center gap-1 rounded-md bg-white/10 px-1 text-[9px] text-white"><Minus size={8} />{it.qty}<Plus size={8} /></span>
                ) : (
                  <span className="flex h-4 w-4 items-center justify-center rounded-md border border-white/15 text-slate-300"><Plus size={9} /></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-2.5 mb-2 flex items-center justify-between rounded-xl bg-[#fc8019] px-3 py-2 text-[#0f1115]">
        <span className="text-[10px] font-semibold">{count} items · {inr(sub)}</span>
        <span className="flex items-center gap-0.5 text-[10px] font-bold">Place Order <ChevronRight size={11} /></span>
      </div>
      <BottomNav active="pos" />
    </>
  );
}

function CartScreen() {
  const cart = POS_ITEMS.filter((i) => i.qty);
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const sub = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = sub * 0.025;
  return (
    <>
      <AppHeader title="Order Summary" sub={`Table 5 · ${count} items`} right={<Pill tone="green">KOT sent</Pill>} />
      <div className="flex-1 space-y-1.5 overflow-hidden px-2.5 py-2">
        {cart.map((it, i) => (
          <div key={it.name + i} className="flex items-center gap-2 rounded-lg bg-white/[0.04] p-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#fc8019]/15 text-[9px] font-bold text-[#ff9130]">{it.qty}×</span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1 truncate text-[10px] font-semibold text-white"><Veg veg={it.veg} /> {it.name}</p>
              <p className="text-[8.5px] text-slate-400">{inr(it.price)} each</p>
            </div>
            <span className="text-[10px] font-bold text-white">{inr(it.price * it.qty)}</span>
          </div>
        ))}
        <div className="mt-2 space-y-1 rounded-lg border border-dashed border-white/15 p-2 text-[9.5px] text-slate-400">
          <div className="flex justify-between"><span>Subtotal</span><span>{inr(sub, 2)}</span></div>
          <div className="flex justify-between"><span>CGST 2.5%</span><span>{inr(tax, 2)}</span></div>
          <div className="flex justify-between"><span>SGST 2.5%</span><span>{inr(tax, 2)}</span></div>
          <div className="flex justify-between border-t border-white/10 pt-1 text-[11px] font-bold text-white"><span>Total</span><span>{inr(sub + tax * 2, 2)}</span></div>
        </div>
        <p className="pt-1 text-[8.5px] font-bold uppercase tracking-wider text-slate-400">Payment mode</p>
        <div className="grid grid-cols-3 gap-1.5">
          {['Cash', 'Card', 'UPI'].map((m) => (
            <span key={m} className={`rounded-lg border py-1.5 text-center text-[9.5px] font-semibold ${m === 'UPI' ? 'border-[#fc8019] bg-[#fc8019]/15 text-[#ff9f4d]' : 'border-white/10 text-slate-300'}`}>{m}</span>
          ))}
        </div>
      </div>
      <div className="mx-2.5 mb-2 grid grid-cols-2 gap-1.5">
        <span className="flex items-center justify-center gap-1 rounded-xl bg-white/10 py-2 text-[10px] font-semibold text-white"><ChefHat size={11} /> Add Items</span>
        <span className="flex items-center justify-center gap-1 rounded-xl bg-[#fc8019] py-2 text-[10px] font-bold text-[#0f1115]"><Printer size={11} /> Print Bill</span>
      </div>
      <BottomNav active="pos" />
    </>
  );
}

const KOTS = [
  { no: 24, where: 'Table 5', meta: 'Round 1 · Tandoor', ago: '2 min', state: 'pending', items: [['Tandoori Roti', 2], ['Paneer Tikka', 1]] },
  { no: 23, where: 'Token 18', meta: 'Takeaway · Main', ago: '6 min', state: 'preparing', items: [['Butter Chicken', 1], ['Jeera Rice', 1]] },
  { no: 22, where: 'Table 2', meta: 'Round 2 · Main', ago: '9 min', state: 'ready', items: [['Dal Fry', 1]] },
];

function KitchenScreen() {
  const btn = {
    pending: ['Start Preparing', 'bg-[#2e90fa] text-white'],
    preparing: ['Mark Ready', 'bg-[#12b76a] text-white'],
    ready: ['Served', 'bg-white/10 text-slate-300'],
  };
  const pill = { pending: ['New', 'orange'], preparing: ['Preparing', 'blue'], ready: ['Ready', 'green'] };
  return (
    <>
      <AppHeader title="Kitchen Display" sub="Live · 3 active KOTs" right={<span className="flex items-center gap-1 text-[9px] font-semibold text-[#32d583]"><span className="h-1.5 w-1.5 rounded-full bg-[#32d583]" />Live</span>} />
      <div className="flex gap-1 px-2.5 pt-2">
        {[['Pending', 1], ['Preparing', 1], ['Ready', 1]].map(([t, n], i) => (
          <span key={t} className={`rounded-md px-2 py-0.5 text-[8.5px] font-semibold ${i === 0 ? 'bg-[#fc8019] text-[#0f1115]' : 'bg-white/[0.06] text-slate-400'}`}>{t} ({n})</span>
        ))}
      </div>
      <div className="flex-1 space-y-1.5 overflow-hidden px-2.5 py-2">
        {KOTS.map((k) => (
          <div key={k.no} className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-2">
            <div className="flex items-center justify-between">
              <p className="text-[10.5px] font-bold text-white">KOT #{k.no} <span className="font-medium text-slate-400">· {k.where}</span></p>
              <Pill tone={pill[k.state][1]}>{pill[k.state][0]}</Pill>
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-[8.5px] text-slate-400"><Clock size={8} /> {k.ago} ago · {k.meta}</p>
            <ul className="mt-1.5 space-y-0.5">
              {k.items.map(([n, q]) => (
                <li key={n} className="flex items-center justify-between text-[9.5px] text-slate-200"><span>{n}</span><span className="font-bold text-white">×{q}</span></li>
              ))}
            </ul>
            <span className={`mt-1.5 block rounded-lg py-1 text-center text-[9px] font-bold ${btn[k.state][1]}`}>{btn[k.state][0]}</span>
          </div>
        ))}
      </div>
      <BottomNav active="kitchen" />
    </>
  );
}

const ORDERS = [
  { id: '#1044', where: 'Table 5 · Dine-in', amt: 567, st: ['Preparing', 'orange'], t: '2m' },
  { id: '#1043', where: 'Online · Delivery', amt: 820, st: ['Ready', 'green'], t: '8m' },
  { id: '#1042', where: 'Table 2 · Dine-in', amt: 1240, st: ['Served', 'blue'], t: '15m' },
  { id: '#1041', where: 'Token 18 · Takeaway', amt: 310, st: ['Paid', 'gray'], t: '21m' },
  { id: '#1040', where: 'WhatsApp · Takeaway', amt: 560, st: ['Paid', 'gray'], t: '34m' },
];

function OrdersScreen() {
  return (
    <>
      <AppHeader title="Orders" sub="Today · 42 orders" right={<Pill tone="blue">Live</Pill>} />
      <div className="flex gap-1 px-2.5 pt-2">
        {['All', 'Dine-in', 'Takeaway', 'Online'].map((c, i) => (
          <span key={c} className={`rounded-md px-2 py-0.5 text-[8.5px] font-semibold ${i === 0 ? 'bg-[#fc8019] text-[#0f1115]' : 'bg-white/[0.06] text-slate-400'}`}>{c}</span>
        ))}
      </div>
      <div className="flex-1 space-y-1.5 overflow-hidden px-2.5 py-2">
        {ORDERS.map((o) => (
          <div key={o.id} className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] p-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fc8019]/15 text-[#ff9130]"><Receipt size={12} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[10.5px] font-bold text-white">{o.id} <span className="text-[8.5px] font-medium text-slate-400">· {o.t} ago</span></p>
              <p className="truncate text-[9px] text-slate-400">{o.where}</p>
            </div>
            <div className="text-right">
              <p className="text-[10.5px] font-bold text-white">{inr(o.amt)}</p>
              <Pill tone={o.st[1]}>{o.st[0]}</Pill>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="orders" />
    </>
  );
}

function ReportsScreen() {
  const bars = [52, 64, 48, 76, 60, 94, 82];
  return (
    <>
      <AppHeader title="Dashboard" sub="Today’s summary" right={<Pill tone="green">+12%</Pill>} />
      <div className="flex-1 space-y-2 overflow-hidden px-2.5 py-2">
        <div className="grid grid-cols-2 gap-1.5">
          {[
            ['Total Sales', '₹18,420', IndianRupee, '#fc8019'],
            ['Orders', '42', ClipboardList, '#2e90fa'],
            ['Avg. Order', '₹438', Receipt, '#12b76a'],
            ['Customers', '35', Users, '#a78bfa'],
          ].map(([l, v, Icon, c]) => (
            <div key={l} className="rounded-xl border-l-2 bg-white/[0.05] p-2" style={{ borderColor: c }}>
              <p className="flex items-center gap-1 text-[8.5px] text-slate-400"><Icon size={9} style={{ color: c }} /> {l}</p>
              <p className="text-[13px] font-extrabold text-white">{v}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-white/[0.05] p-2">
          <p className="flex items-center justify-between text-[10px] font-bold text-white">Weekly Sales <TrendingUp size={10} className="text-[#32d583]" /></p>
          <div className="mt-2 flex h-16 items-end gap-1.5">
            {bars.map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: i === 5 ? '#fc8019' : 'rgba(255,255,255,.14)' }} />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[7.5px] text-slate-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="flex-1 text-center">{d}</span>)}</div>
        </div>
        <div className="rounded-xl bg-white/[0.05] p-2">
          <p className="text-[10px] font-bold text-white">Top Selling Items</p>
          {[['Butter Chicken', 38, 10640], ['Paneer Tikka', 42, 7560], ['Jeera Rice', 55, 6600]].map(([n, o, a], i) => (
            <div key={n} className="mt-1 flex items-center justify-between text-[9px]">
              <span className="text-slate-300">{i + 1}. {n}</span>
              <span className="text-[#ff9130]">{o} orders</span>
              <span className="font-bold text-white">{inr(a)}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="reports" />
    </>
  );
}

function MenuScreen() {
  const cats = [['Roti & Bread', 8], ['Starters', 12], ['Main Course', 16], ['Rice & Biryani', 7], ['Beverages', 9]];
  const items = [['Paneer Tikka', 180, true, true], ['Butter Chicken', 280, false, true], ['Veg Biryani', 150, true, false]];
  return (
    <>
      <AppHeader title="Menu Management" sub="5 categories · 52 items" right={<span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#fc8019] text-[#0f1115]"><Plus size={12} /></span>} />
      <div className="flex-1 space-y-1.5 overflow-hidden px-2.5 py-2">
        <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2 py-1.5 text-[9px] text-slate-400"><Search size={10} /> Search items…</div>
        {cats.map(([c, n], i) => (
          <div key={c} className="flex items-center gap-2 rounded-xl bg-white/[0.04] p-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#fc8019]/15 text-[#ff9130]"><UtensilsCrossed size={11} /></span>
            <span className="flex-1 text-[10px] font-semibold text-white">{c}</span>
            <span className="text-[8.5px] text-slate-400">{n} items</span>
            <ChevronRight size={11} className={i === 1 ? 'text-[#ff9130]' : 'text-slate-600'} />
          </div>
        ))}
        <p className="pt-1 text-[8.5px] font-bold uppercase tracking-wider text-slate-400">Starters</p>
        {items.map(([n, p, veg, on]) => (
          <div key={n} className="flex items-center gap-2 rounded-lg border border-white/[0.06] px-2 py-1.5">
            <Veg veg={veg} />
            <span className="flex-1 truncate text-[10px] text-white">{n}</span>
            <span className="text-[10px] font-bold text-[#ff9130]">{inr(p)}</span>
            <span className={`relative h-3.5 w-6 rounded-full ${on ? 'bg-[#12b76a]' : 'bg-white/15'}`}>
              <span className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white ${on ? 'right-0.5' : 'left-0.5'}`} />
            </span>
          </div>
        ))}
      </div>
      <BottomNav active="settings" />
    </>
  );
}

export const PHONE_SCREENS = {
  pos: { Component: PosScreen, label: 'CRYZO Android app — POS billing screen with menu items, quantities and a running total (sample data)' },
  cart: { Component: CartScreen, label: 'CRYZO Android app — order summary with items, CGST, SGST and total (sample data)' },
  kitchen: { Component: KitchenScreen, label: 'CRYZO Android app — kitchen display with new, preparing and ready KOTs (sample data)' },
  orders: { Component: OrdersScreen, label: 'CRYZO Android app — orders list with order numbers, tables, amounts and statuses (sample data)' },
  reports: { Component: ReportsScreen, label: 'CRYZO Android app — dashboard with today’s sales, weekly chart and top selling items (sample data)' },
  menu: { Component: MenuScreen, label: 'CRYZO Android app — menu management with categories, prices and availability toggles (sample data)' },
};

/**
 * Phone frame + screen. The screen is laid out at BASE_W and scaled to fit, so text and
 * spacing stay proportional at any size.
 *  - `width` (px): fixed rendered width.
 *  - `fluid`: fill the parent's width instead (keeps aspect ratio, no layout shift).
 */
export function PhoneMockup({ screen = 'pos', width = BASE_W, fluid = false, className = '' }) {
  const entry = PHONE_SCREENS[screen] || PHONE_SCREENS.pos;
  const { Component } = entry;
  const outerW = BASE_W + 16; // 8px bezel each side
  const outerH = BASE_H + 16;
  const ref = useRef(null);
  const [measured, setMeasured] = useState(fluid ? null : width);

  useEffect(() => {
    if (!fluid || !ref.current) return undefined;
    const el = ref.current;
    const update = () => setMeasured(el.clientWidth || null);
    update();
    if (!('ResizeObserver' in window)) return undefined;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fluid]);

  const w = fluid ? measured : width;
  const scale = (w || outerW) / outerW;

  return (
    <figure
      ref={ref}
      role="img"
      aria-label={entry.label}
      className={`relative m-0 ${fluid ? 'w-full' : 'shrink-0'} ${className}`}
      style={fluid ? { aspectRatio: `${outerW} / ${outerH}` } : { width, height: outerH * scale }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left rounded-[38px] bg-gradient-to-b from-[#2a2f3a] to-[#14171d] p-2 shadow-[0_30px_60px_-20px_rgba(15,17,21,.55),inset_0_0_0_1px_rgba(255,255,255,.08)]"
        style={{ width: outerW, height: outerH, transform: `scale(${scale})`, visibility: w ? 'visible' : 'hidden' }}
        aria-hidden="true"
      >
        <div className="relative flex h-full w-full select-none flex-col overflow-hidden rounded-[30px] bg-[#0f1115] text-left font-sans">
          {/* status bar + notch */}
          <div className="relative flex items-center justify-between px-5 pb-1 pt-2 text-[9px] font-semibold text-white">
            <span>9:41</span>
            <span className="absolute left-1/2 top-1.5 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1"><Signal size={9} /><Wifi size={9} /><BatteryFull size={11} /></span>
          </div>
          {/* Screen content is client-rendered (decorative, aria-hidden) to keep the HTML light */}
          {w ? <Component /> : null}
        </div>
      </div>
    </figure>
  );
}
