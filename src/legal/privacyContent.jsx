import { BRAND } from '../content';
import { LEGAL, operatorName, TERMS_PATH } from './legalConfig';

/* Privacy Policy content. Written for CRYZO's actual data flows as found in the codebase
 * (backend controllers, database schema, frontend and android-pos). */

const A = ({ href, children, ext }) => (
  <a href={href} className="font-semibold text-brand-text underline decoration-brand/40 underline-offset-2 hover:decoration-brand"
    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
);

export const PRIVACY = {
  title: 'Privacy Policy',
  description: 'How CRYZO collects, uses, shares and protects personal information across its restaurant POS web app, Android app, online ordering pages and WhatsApp ordering bot.',
  intro: (
    <>
      This Privacy Policy explains how {operatorName} (“we”, “us”) handles personal information when you visit this
      website or use the {BRAND.name} restaurant POS system — including the web app, the Android POS app, restaurant online
      ordering pages, QR menus and the WhatsApp ordering bot (together, the “Services”). Please read it together with our{' '}
      <A href={TERMS_PATH}>Terms &amp; Conditions</A>.
    </>
  ),
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are and our role',
      blocks: [
        <p key="1">{BRAND.name} provides point-of-sale, billing and restaurant management software to restaurants, cafes and other food businesses (“Restaurants”).</p>,
        <ul key="2">
          <li><strong>When we decide why and how data is used</strong> — for example, information about Restaurant owners and their user accounts, or messages you send us — we act as the Data Fiduciary (controller) for that information.</li>
          <li><strong>When a Restaurant uses {BRAND.name} to record information about its own customers and staff</strong> — such as customer phone numbers, online orders or employee records — we process that information on the Restaurant’s behalf as its Data Processor. The Restaurant is responsible for informing those people and, where needed, obtaining their consent. If you are a customer of a Restaurant, please contact that Restaurant first about your data; we will help them respond.</li>
        </ul>,
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      blocks: [
        <h3 key="h1">Restaurant accounts</h3>,
        <ul key="1">
          <li>Name, email address and phone number of account users, and their role and permissions.</li>
          <li>Passwords — stored only in hashed form, never in plain text.</li>
          <li>Business details entered in settings, such as restaurant name, address, phone, email, GST number, logo, taxes, opening hours and receipt text.</li>
        </ul>,
        <h3 key="h2">Data Restaurants enter while using the Services</h3>,
        <ul key="2">
          <li>Menus, tables, orders, kitchen order tickets (KOTs), invoices and reports.</li>
          <li>Payment records — the payment mode (for example cash, card or UPI) and amount. {BRAND.name} does not collect or store card numbers or bank account details.</li>
          <li>Stock and purchase records, including supplier details the Restaurant chooses to enter.</li>
          <li>Employee records — such as name, phone, email, position and salary — if the Restaurant uses the Employees module.</li>
          <li>Customer records — such as name, phone number, email, address, visit count, amount spent, loyalty points and notes.</li>
        </ul>,
        <h3 key="h3">Customers ordering online or on WhatsApp</h3>,
        <ul key="3">
          <li>Name, phone number, email (optional), saved delivery addresses and order history on a Restaurant’s online ordering page.</li>
          <li>One-time password (OTP) verification records, such as the phone number and the time the code was sent and verified.</li>
          <li>For the WhatsApp ordering bot: your WhatsApp phone number, the messages you send to the bot, your cart and order details, and technical delivery logs from the messaging provider.</li>
        </ul>,
        <h3 key="h4">Technical and security information</h3>,
        <ul key="4">
          <li>Server logs that may include IP address, browser or device information, and request times.</li>
          <li>Audit logs of actions taken inside a Restaurant’s account (for example which user changed a menu item or cancelled an order).</li>
          <li>A login token and basic profile saved in your browser’s session/local storage so you stay signed in. The Services do not use advertising or tracking cookies.</li>
        </ul>,
        <h3 key="h5">Information you send us</h3>,
        <ul key="5">
          <li>Details you share when you request a demo or contact support by WhatsApp, email or phone — such as your name, phone, email, restaurant name, city and number of outlets.</li>
          <li>When you submit the demo form on this website, your details are sent to our team by email. They are not saved in the {BRAND.name} product database. If sending fails, the form lets you send the same details to us by WhatsApp or email instead.</li>
        </ul>,
      ],
    },
    {
      id: 'android-permissions',
      title: 'Android app permissions',
      blocks: [
        <p key="0">The {BRAND.name} Android POS app asks only for the device permissions it needs:</p>,
        <ul key="1">
          <li><strong>Internet and network state</strong> — to connect to the {BRAND.name} servers and sync orders in real time.</li>
          <li><strong>Bluetooth (connect and scan)</strong> — only to find and connect to Bluetooth thermal printers for printing bills and KOTs. The app does not use Bluetooth to determine your location.</li>
          <li><strong>Microphone</strong> — used only when you choose to use a voice feature in the app. Audio is not recorded in the background and is not stored by us.</li>
        </ul>,
        <p key="2">You can deny or revoke these permissions at any time in your phone’s settings; the related feature (for example printing) will then stop working.</p>,
      ],
    },
    {
      id: 'how-we-use',
      title: 'How we use information',
      blocks: [
        <ul key="1">
          <li>To provide the Services: sign-in, billing, orders, KOTs, kitchen display, invoices, reports, stock, printing and online ordering.</li>
          <li>To verify phone numbers with OTPs and to send order-related messages when a Restaurant enables WhatsApp.</li>
          <li>To manage subscriptions, respond to demo and support requests, and send important service notices.</li>
          <li>To keep the Services secure — for example limiting repeated login attempts, investigating misuse and keeping audit trails.</li>
          <li>To maintain and improve the Services using aggregated or de-identified information.</li>
          <li>To comply with legal obligations and enforce our Terms.</li>
        </ul>,
        <p key="2">We do not use personal information for third-party advertising, and we do not sell personal information.</p>,
      ],
    },
    {
      id: 'sharing',
      title: 'How information is shared',
      blocks: [
        <p key="0">We share personal information only as needed to run the Services, with:</p>,
        <ul key="1">
          <li><strong>The Restaurant</strong> — a Restaurant can see the orders, customer and staff records in its own account.</li>
          <li><strong>Hosting and infrastructure providers</strong> that store and run the Services for us.</li>
          <li><strong>SMS providers</strong> (such as MSG91 and Fast2SMS) that deliver OTP codes.</li>
          <li><strong>WhatsApp messaging providers</strong> (Meta’s WhatsApp Business Platform or UltraMsg), when a Restaurant connects WhatsApp.</li>
          <li><strong>Email delivery providers</strong> that send account emails (such as verification messages) and deliver demo requests from this website to our team.</li>
          <li><strong>A QR-code image service</strong> (api.qrserver.com), which receives a Restaurant’s public ordering link to draw its QR code.</li>
          <li><strong>Authorities or other parties</strong> when required by law, to protect rights and safety, or as part of a merger or sale of the business (subject to this Policy).</li>
        </ul>,
        <p key="2">These providers process information under their own terms and privacy policies. Some may process data outside India; where that happens we rely on the safeguards permitted by applicable law.</p>,
      ],
    },
    {
      id: 'security',
      title: 'How we protect information',
      blocks: [
        <ul key="1">
          <li>Passwords are hashed, and access inside each account is controlled by roles and permissions.</li>
          <li>Each Restaurant’s operational data is kept in its own separate database.</li>
          <li>Login attempts are rate-limited, security headers are applied, and important actions are recorded in audit logs.</li>
          <li>We use encrypted (HTTPS) connections for the hosted Services.</li>
        </ul>,
        <p key="2">No system is completely secure. Please keep your password private, give staff only the permissions they need, and tell us immediately if you suspect unauthorised access.</p>,
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep information',
      blocks: [
        <p key="1">We keep account and operational data while a Restaurant’s account is active and for as long as needed to provide the Services. When an account is closed, we delete or anonymise its data within a reasonable period, unless we must keep some records longer to meet legal, tax, accounting or dispute-resolution requirements. OTP and technical logs are kept only for as long as they are useful for security and troubleshooting.</p>,
        <p key="2">Restaurants can download reports and menu data before closing their account.</p>,
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights and choices',
      blocks: [
        <p key="1">Subject to applicable law, including India’s Digital Personal Data Protection Act, 2023, you may:</p>,
        <ul key="2">
          <li>ask for a summary of the personal information we process about you;</li>
          <li>ask us to correct, complete or update it;</li>
          <li>ask us to erase it where it is no longer needed or you withdraw consent (withdrawal does not affect processing already done);</li>
          <li>nominate another person to exercise your rights in the event of death or incapacity; and</li>
          <li>raise a grievance with us, and if unresolved, with the Data Protection Board of India.</li>
        </ul>,
        <p key="3">To make a request, contact us using the details below. We may need to verify your identity. If your data was entered by a Restaurant, we may forward your request to that Restaurant.</p>,
      ],
    },
    {
      id: 'children',
      title: 'Children',
      blocks: [
        <p key="1">The Services are meant for businesses and are not directed at children. We do not knowingly collect personal information from anyone under 18 years of age. If you believe a child has provided us personal information, please contact us and we will delete it.</p>,
      ],
    },
    {
      id: 'third-party-links',
      title: 'Third-party links and services',
      blocks: [
        <p key="1">The Services may link to or work with third-party websites and services, such as WhatsApp or payment apps a customer chooses to use. Their handling of your information is governed by their own policies, not this one.</p>,
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this Policy',
      blocks: [
        <p key="1">We may update this Policy from time to time. We will change the “Last updated” date above and, for significant changes, notify account owners by email or inside the app before the changes take effect.</p>,
      ],
    },
    {
      id: 'contact',
      title: 'Grievance Officer and contact',
      blocks: [
        <p key="1">For questions, requests or complaints about this Policy or your personal information, contact our Grievance Officer. We will acknowledge and respond within the time required by applicable law.</p>,
        <ul key="2" className="lp-legal-contact">
          {LEGAL.grievanceOfficer.name && <li><strong>Name:</strong> {LEGAL.grievanceOfficer.name}</li>}
          <li><strong>Email:</strong> <A href={`mailto:${LEGAL.grievanceOfficer.email}`}>{LEGAL.grievanceOfficer.email}</A></li>
          <li><strong>Phone:</strong> <A href={`tel:${LEGAL.grievanceOfficer.phone.replace(/\s/g, '')}`}>{LEGAL.grievanceOfficer.phone}</A></li>
          {LEGAL.address && <li><strong>Address:</strong> {LEGAL.address}</li>}
        </ul>,
      ],
    },
  ],
};
