import {
  Receipt, ClipboardList, LayoutGrid, Ticket, ChefHat, Boxes, UtensilsCrossed, BarChart3,
  UserCog, ShoppingBag, Building2, Users, Store, Coffee, Sandwich, CloudCog, Croissant, Soup,
  Zap, Package, Layers, TrendingUp, Settings2, Printer, Smartphone, QrCode, Percent, Wallet,
  MessageCircle, FileSpreadsheet, FileText, Globe, Bell, ShieldCheck, ToggleRight, Headphones,
  Sparkles, Radio,
} from 'lucide-react';

/* ==========================================================================
 * CRYZO landing page content.
 *
 * Every capability listed here was verified against this repository
 * (frontend pages, backend routes/controllers and the android-pos app).
 * No customer names, testimonials, logos or usage statistics are invented.
 * ========================================================================== */

export const BRAND = {
  name: 'CRYZO',
  tagline: 'Restaurant POS, Billing & Management System',
  // Public contact (phone same as frontend/src/pages/SubscriptionExpired.jsx)
  phone: '+91 8169612293',
  email: 'info@cryzo.shop',
};

export const whatsappNumber = BRAND.phone.replace(/[^0-9]/g, '');

/* ------------------------------ Navigation ------------------------------ */
export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features', menu: 'features' },
  { id: 'solutions', label: 'Solutions', menu: 'solutions' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact' },
];

/* ---------------------- Capability strip (no fake stats) ---------------------- */
export const CAPABILITIES = [
  { icon: Percent, label: 'GST billing with CGST / SGST' },
  { icon: Ticket, label: 'KOT with rounds & kitchen sections' },
  { icon: Wallet, label: 'Cash, card & UPI payment modes' },
  { icon: Printer, label: 'Thermal receipts & A4 invoices' },
  { icon: Smartphone, label: 'Web app + Android POS app' },
  { icon: Radio, label: 'Real-time sync across devices' },
  { icon: MessageCircle, label: 'WhatsApp ordering bot' },
  { icon: QrCode, label: 'QR menu & online ordering page' },
  { icon: Bell, label: 'Low-stock alerts' },
  { icon: ShieldCheck, label: 'Role-based permissions' },
];

/* -------------------- Alternating feature showcase rows -------------------- */
export const SHOWCASE = [
  {
    id: 'billing',
    eyebrow: 'Billing & Invoicing',
    title: 'Bill a full table in seconds, not minutes',
    text: 'Search the menu, tap to add items with add-ons, apply discounts and service charge, and settle by cash, card or UPI. GST is split into CGST and SGST automatically.',
    points: [
      'Dine-in, takeaway and delivery orders with token numbers',
      'Item add-ons / modifiers and veg / non-veg tags',
      'Thermal receipts and A4 PDF invoices',
      'Voice search to find menu items faster',
    ],
    visual: { type: 'phones', screens: ['pos', 'cart'] },
  },
  {
    id: 'kitchen',
    eyebrow: 'Orders, KOT & Kitchen Display',
    title: 'Every order reaches the kitchen the moment it’s placed',
    text: 'KOTs are sent instantly to the kitchen display with live status updates, so cooks, captains and cashiers always see the same order — no lost paper slips.',
    points: [
      'KOT rounds for items added later to the same table',
      'Section-wise KOTs for different kitchen counters',
      'Sound alerts for new orders on the kitchen screen',
      'Track every order from placed to served in one list',
    ],
    visual: { type: 'phones', screens: ['kitchen', 'orders'] },
  },
  {
    id: 'inventory',
    eyebrow: 'Inventory & Purchases',
    title: 'Know what’s in stock before service starts',
    text: 'Track stock for menu items, record purchases from suppliers and get low-stock and out-of-stock lists so nothing runs out in the middle of a rush.',
    points: [
      'Stock tracked per item, including piece-wise stock',
      'Stock updates automatically as orders are billed',
      'Low-stock and out-of-stock views',
      'Purchase entries with supplier and cost details',
    ],
    visual: { type: 'inventory' },
  },
  {
    id: 'reports',
    eyebrow: 'Reports & Analytics',
    title: 'Clear numbers at the end of every day',
    text: 'From today’s sales to item-wise and tax reports, CRYZO turns every bill into insight you can act on — and download when your accountant asks.',
    points: [
      'Daily, monthly, category and item-wise sales',
      'Tax, payment-mode, table and parcel reports',
      'Profit and waiter performance reports',
      'Download reports as CSV (opens in Excel)',
    ],
    visual: { type: 'phones', screens: ['reports', 'menu'] },
  },
  {
    id: 'online',
    eyebrow: 'Online & WhatsApp Orders',
    title: 'Take orders from your own online channels',
    text: 'Give customers your own online ordering link and QR menu, or let them order through a WhatsApp chat bot. Every online order lands in the same POS as your dine-in orders.',
    points: [
      'Online ordering page with OTP login and saved addresses',
      'WhatsApp bot: browse menu, add to cart, checkout, track order',
      'Delivery and takeaway with delivery charges',
      'QR code digital menu card for tables',
    ],
    visual: { type: 'whatsapp' },
  },
];

/* ------------------------------ Module grid ------------------------------ */
export const MODULES = [
  { icon: Receipt, title: 'Billing & Invoicing', text: 'GST bills, discounts, service charge, receipts and PDF invoices.' },
  { icon: ClipboardList, title: 'Order Management', text: 'Dine-in, takeaway, delivery and online orders in one list.' },
  { icon: LayoutGrid, title: 'Table Management', text: 'Floor-wise view with available, occupied and reserved tables.' },
  { icon: Ticket, title: 'Kitchen Order Tickets', text: 'Instant KOTs with rounds and kitchen sections.' },
  { icon: ChefHat, title: 'Kitchen Display System', text: 'Live KOT screen with preparing / ready status and alerts.' },
  { icon: Boxes, title: 'Inventory & Stock', text: 'Stock levels, purchases, low-stock and out-of-stock lists.' },
  { icon: UtensilsCrossed, title: 'Menu Management', text: 'Categories, add-ons, availability and Excel import.' },
  { icon: BarChart3, title: 'Sales Reports', text: 'Sales, tax, item, payment, profit and staff reports with CSV download.' },
  { icon: UserCog, title: 'Staff & Roles', text: 'Users, employees and custom role permissions.' },
  { icon: ShoppingBag, title: 'Online Orders', text: 'Own ordering page, QR menu and WhatsApp orders.' },
  { icon: Users, title: 'Customer Management', text: 'Phone lookup, visit history and loyalty points.' },
  {
    icon: Building2,
    title: 'Multi-Outlet',
    text: 'Each outlet runs as its own account with separate menu, staff and data.',
    note: 'Combined chain dashboard not available yet',
  },
];

/* ---------------------------- Dashboard showcase ---------------------------- */
export const STEPS = [
  { icon: Settings2, title: 'Set up your restaurant', text: 'Add menu, tables, taxes, printers and staff roles — or import your menu from Excel.' },
  { icon: ClipboardList, title: 'Take orders & bill', text: 'Punch orders, send KOTs to the kitchen and settle bills with any payment mode.' },
  { icon: TrendingUp, title: 'Track & grow', text: 'Watch live sales and use reports to plan menus, staff and stock.' },
];

/* ------------------------------ Outlet types ------------------------------ */
export const OUTLETS = [
  {
    id: 'restaurants', icon: Store, title: 'Restaurants',
    text: 'Run dine-in service smoothly — captains take orders table-wise, KOTs go to the right kitchen section, and bills are ready the moment guests ask.',
    features: ['Table management', 'KOT rounds & sections', 'Service charge', 'Waiter performance report'],
    screen: 'pos',
  },
  {
    id: 'cafes', icon: Coffee, title: 'Cafes & Coffee Shops',
    text: 'Quick counter billing with add-ons for every drink, loyalty points for regulars and a menu that’s easy to update every season.',
    features: ['Fast counter billing', 'Add-ons / modifiers', 'Loyalty points', 'QR digital menu'],
    screen: 'cart',
  },
  {
    id: 'qsr', icon: Sandwich, title: 'Fast Food Outlets',
    text: 'Token-based ordering and a live kitchen display keep queues moving during the lunch and dinner rush.',
    features: ['Token numbers', 'Takeaway orders', 'Kitchen display', 'Parcel report'],
    screen: 'kitchen',
  },
  {
    id: 'cloud', icon: CloudCog, title: 'Cloud Kitchens',
    text: 'Delivery-first operations with your own online ordering page, WhatsApp orders and tight stock control.',
    features: ['Online ordering page', 'WhatsApp ordering bot', 'Delivery charges', 'Stock tracking'],
    screen: 'orders',
  },
  {
    id: 'bakeries', icon: Croissant, title: 'Bakeries',
    text: 'Piece-wise stock, quick item search and clean receipts for a busy display counter.',
    features: ['Piece-wise stock', 'Quick item search', 'Low-stock alerts', 'Thermal receipts'],
    screen: 'menu',
  },
  {
    id: 'foodcourts', icon: Soup, title: 'Food Courts',
    text: 'Give every counter its own outlet account with its own menu, staff and sales — all on the same platform.',
    features: ['Separate outlet accounts', 'Role permissions', 'Token numbers', 'Daily sales report'],
    screen: 'reports',
  },
];

/* --------------------------------- Why us --------------------------------- */
export const BENEFITS = [
  { icon: Zap, title: 'Simplify billing', text: 'Fewer taps from order to payment, with GST, discounts and receipts handled for you.' },
  { icon: ClipboardList, title: 'Manage orders efficiently', text: 'Dine-in, takeaway and online orders and their KOTs tracked on one screen.' },
  { icon: Package, title: 'Track inventory', text: 'Stock moves with every bill, and low-stock lists warn you early.' },
  { icon: TrendingUp, title: 'Monitor sales live', text: 'Today’s sales, orders and best-sellers update as you trade.' },
  { icon: Layers, title: 'Smoother workflows', text: 'Counter, floor, kitchen and back office working from the same live data.' },
  { icon: Headphones, title: 'Direct support', text: 'Talk to the CRYZO team on call, WhatsApp or email when you need help.' },
];

/* -------------------------- Integrations & add-ons -------------------------- */
export const INTEGRATIONS = [
  { icon: MessageCircle, title: 'WhatsApp Business', text: 'Connect via Meta WhatsApp Cloud API or UltraMsg for WhatsApp ordering and order updates.' },
  { icon: Printer, title: 'Thermal printers', text: 'ESC/POS printing over Bluetooth (Android app), USB / serial and network (LAN) printers.' },
  { icon: FileSpreadsheet, title: 'Excel & CSV', text: 'Import and export menus in Excel, and download reports as CSV.' },
  { icon: FileText, title: 'PDF invoices', text: 'Generate A4 PDF invoices to download or share.' },
];

export const ADDONS = [
  { icon: Smartphone, title: 'Android POS app', text: 'Billing, KOTs, orders and reports on Android phones and tablets.' },
  { icon: ChefHat, title: 'Kitchen display screen', text: 'A live KOT screen for any browser or tablet in the kitchen.' },
  { icon: Globe, title: 'Online ordering page', text: 'Your own ordering link with OTP login and saved addresses.' },
  { icon: QrCode, title: 'QR digital menu', text: 'A shareable menu card customers open by scanning a QR code.' },
  { icon: Sparkles, title: 'WhatsApp ordering bot', text: 'Customers browse, order and track — right inside WhatsApp.' },
  { icon: ToggleRight, title: 'Module controls', text: 'Turn modules on or off per outlet so staff see only what they need.' },
];

export const OUTLET_COUNTS = ['1 outlet', '2–3 outlets', '4–10 outlets', 'More than 10'];

/* ----------------------------------- FAQ ----------------------------------- */
export const FAQS = [
  {
    q: 'What is a restaurant POS system?',
    a: 'A restaurant POS (point of sale) system handles orders, billing and payments, and connects them to the kitchen, inventory and reports. CRYZO brings billing, tables, KOTs, kitchen display, menu, stock, staff and analytics together in one restaurant management system.',
  },
  {
    q: 'How does CRYZO work day to day?',
    a: 'Staff punch an order on the web app or Android app, and a KOT reaches the kitchen display instantly. When guests are ready, you generate a GST bill, record the payment (cash, card or UPI) and print or share the receipt. Every sale flows into the dashboard and reports automatically.',
  },
  {
    q: 'Does it work on mobile and tablets?',
    a: 'Yes. The web app is responsive on phones, tablets and desktops, and there is a dedicated Android POS app for billing, KOTs, orders and reports.',
  },
  {
    q: 'Can I manage both online and offline orders?',
    a: 'Yes. Dine-in, takeaway and delivery orders are handled at the POS. Orders from your own online ordering page, QR menu and WhatsApp bot appear in the Online Orders screen alongside them.',
  },
  {
    q: 'Does it support inventory management?',
    a: 'Yes. You can track stock per item (including piece-wise stock), record purchases, and view low-stock and out-of-stock items. Stock is reduced automatically as orders are billed for items that track stock.',
  },
  {
    q: 'Can I manage multiple branches?',
    a: 'Each outlet runs as its own CRYZO account with its own menu, staff and data, so multiple branches can be set up on the platform. A single combined dashboard across all branches is not available yet.',
  },
  {
    q: 'Which printers are supported?',
    a: 'CRYZO prints ESC/POS thermal receipts and KOTs. The Android app prints over Bluetooth, and the web setup supports USB / serial and network (LAN) printers. A4 PDF invoices are also available.',
  },
  {
    q: 'How do I get a free demo?',
    a: 'Fill in the demo form on this page and send your details to us on WhatsApp or email, or call us directly. We will walk you through CRYZO using a setup that matches your restaurant.',
  },
];
