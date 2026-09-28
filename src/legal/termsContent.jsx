import { BRAND } from '../content';
import { LEGAL, operatorName, PRIVACY_PATH } from './legalConfig';

/* Terms & Conditions content for CRYZO. */

const A = ({ href, children }) => (
  <a href={href} className="font-semibold text-brand-text underline decoration-brand/40 underline-offset-2 hover:decoration-brand">{children}</a>
);

const courts = LEGAL.jurisdictionCity ? `the courts at ${LEGAL.jurisdictionCity}, India` : 'the competent courts in India';

export const TERMS = {
  title: 'Terms & Conditions',
  description: 'The terms that apply when restaurants and their staff use CRYZO’s restaurant POS, billing and management software.',
  intro: (
    <>
      These Terms &amp; Conditions (“Terms”) govern your use of the {BRAND.name} website, web app, Android POS app, online
      ordering pages, QR menus and WhatsApp ordering bot (the “Services”), provided by {operatorName} (“we”, “us”).
      By creating an account, starting a trial or using the Services, you agree to these Terms and to our{' '}
      <A href={PRIVACY_PATH}>Privacy Policy</A>. If you use the Services for a business, you confirm you are authorised to accept
      these Terms on its behalf.
    </>
  ),
  sections: [
    {
      id: 'definitions',
      title: 'Definitions',
      blocks: [
        <ul key="1">
          <li><strong>“You” / “Restaurant”</strong> — the business or person that holds a {BRAND.name} account.</li>
          <li><strong>“Users”</strong> — owners, managers, cashiers, waiters, kitchen staff and others you give access to your account.</li>
          <li><strong>“Your Data”</strong> — menus, orders, invoices, customer, staff, stock and other information entered into your account.</li>
          <li><strong>“Plan”</strong> — the subscription and duration you choose, including any free trial.</li>
        </ul>,
      ],
    },
    {
      id: 'accounts',
      title: 'Eligibility and accounts',
      blocks: [
        <ul key="1">
          <li>You must be at least 18 years old and able to enter into a binding contract.</li>
          <li>Provide accurate account and business information and keep it up to date.</li>
          <li>Keep login credentials confidential. You are responsible for all activity under your account, including actions by Users you add and the roles and permissions you give them.</li>
          <li>Tell us promptly if you suspect unauthorised access to your account.</li>
        </ul>,
      ],
    },
    {
      id: 'plans-and-payment',
      title: 'Plans, free trial and payment',
      blocks: [
        <ul key="1">
          <li>Plans are offered for fixed durations. The price and duration of your Plan are those shown or agreed with you when you subscribe.</li>
          <li>A free trial, where offered, gives access for the trial period stated. We may change or end trial offers at any time.</li>
          <li>When a Plan or trial ends, access to the Services may be limited until the subscription is renewed. Your Data is not deleted merely because a Plan has expired; see “Termination” below.</li>
          <li>Unless stated otherwise, prices are in Indian Rupees and exclusive of applicable taxes.</li>
          <li>Fees are non-refundable once a Plan period has started, except where required by law or agreed with us in writing.</li>
          <li>We may change Plan prices for future periods. Changes will not affect a Plan period you have already paid for.</li>
        </ul>,
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      blocks: [
        <p key="0">You and your Users must not:</p>,
        <ul key="1">
          <li>use the Services for anything unlawful, fraudulent or misleading;</li>
          <li>send spam or unsolicited messages through the WhatsApp or SMS features, or break the policies of those messaging platforms;</li>
          <li>try to access other Restaurants’ data, bypass security or permission controls, or disrupt the Services;</li>
          <li>copy, resell, reverse engineer or create derivative works of the software, except where the law expressly allows it; or</li>
          <li>upload malicious code or content that infringes others’ rights.</li>
        </ul>,
      ],
    },
    {
      id: 'your-data',
      title: 'Your Data and responsibilities',
      blocks: [
        <ul key="1">
          <li>You own Your Data. You give us permission to host, process and display it only as needed to provide and support the Services, as described in our <A href={PRIVACY_PATH}>Privacy Policy</A>.</li>
          <li>You are responsible for collecting customer and staff information lawfully, giving any required notices and obtaining any required consent — including before sending WhatsApp or SMS messages.</li>
          <li>You are responsible for the prices, taxes (including GST rates and your GSTIN), discounts and other settings you configure, and for your own tax filings and record-keeping. {BRAND.name} calculates bills from the settings you provide and is not tax or legal advice.</li>
          <li>You can download reports and menu data from the Services. We recommend keeping your own copies of important records.</li>
        </ul>,
      ],
    },
    {
      id: 'third-party-services',
      title: 'Third-party services',
      blocks: [
        <p key="1">Some features work with third-party services, such as the WhatsApp Business Platform or UltraMsg, SMS providers and your printers and devices. Your use of those services is subject to their own terms, and any charges they apply (for example WhatsApp messaging fees on your own account) are your responsibility. We are not responsible for the availability or actions of third-party services.</p>,
      ],
    },
    {
      id: 'availability',
      title: 'Availability and support',
      blocks: [
        <ul key="1">
          <li>We aim to keep the Services available and working well, but we do not guarantee uninterrupted or error-free operation. Planned maintenance, internet or power outages and third-party failures may affect access.</li>
          <li>The Services need an internet connection to sync orders, KOTs and reports across devices.</li>
          <li>We may improve, change or retire features over time. If we remove a core feature you rely on, we will try to give reasonable notice.</li>
          <li>Support is available by phone, WhatsApp and email using the contact details below.</li>
        </ul>,
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual property',
      blocks: [
        <p key="1">The Services, software, design and the {BRAND.name} name and logo belong to us or our licensors. These Terms give you a limited, non-exclusive, non-transferable right to use the Services during your Plan — no other rights are granted. If you send us suggestions or feedback, we may use them without any obligation to you.</p>,
      ],
    },
    {
      id: 'termination',
      title: 'Suspension and termination',
      blocks: [
        <ul key="1">
          <li>You may stop using the Services at any time and ask us to close your account.</li>
          <li>We may suspend or terminate access if you seriously or repeatedly breach these Terms, fail to pay fees due, or if required by law. Where reasonable, we will warn you first and give you a chance to fix the issue.</li>
          <li>After closure, Your Data is deleted or anonymised as described in our <A href={PRIVACY_PATH}>Privacy Policy</A>. Please download anything you need before closing your account.</li>
        </ul>,
      ],
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers',
      blocks: [
        <p key="1">To the extent permitted by law, the Services are provided “as is” and “as available”, without warranties of any kind, whether express or implied, including fitness for a particular purpose. You are responsible for checking bills, taxes, stock and reports before relying on them for business, legal or tax decisions.</p>,
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      blocks: [
        <p key="1">To the extent permitted by law, we are not liable for any indirect, incidental, special or consequential loss, or for loss of profits, revenue, business or data. Our total liability arising from or relating to the Services is limited to the fees you paid us for the Services in the three (3) months before the event giving rise to the claim. Nothing in these Terms limits liability that cannot be limited under applicable law.</p>,
      ],
    },
    {
      id: 'indemnity',
      title: 'Indemnity',
      blocks: [
        <p key="1">You agree to indemnify us against claims, losses and costs (including reasonable legal fees) arising from Your Data, your use of the Services in breach of these Terms or the law, or messages you send to your customers through the Services.</p>,
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing law and disputes',
      blocks: [
        <p key="1">These Terms are governed by the laws of India. We encourage you to contact us first so we can try to resolve any concern informally. Subject to that, {courts} will have exclusive jurisdiction over any dispute arising from these Terms or the Services.</p>,
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these Terms',
      blocks: [
        <p key="1">We may update these Terms from time to time. We will change the “Last updated” date above and, for significant changes, notify account owners by email or inside the app. Continuing to use the Services after changes take effect means you accept the updated Terms.</p>,
        <p key="2">If any part of these Terms is found unenforceable, the rest remains in effect. These Terms, together with our Privacy Policy and any order or plan details agreed with you, are the entire agreement between you and us about the Services.</p>,
      ],
    },
    {
      id: 'contact',
      title: 'Contact us',
      blocks: [
        <ul key="1" className="lp-legal-contact">
          {LEGAL.entityName && <li><strong>Company:</strong> {LEGAL.entityName}</li>}
          <li><strong>Email:</strong> <A href={`mailto:${BRAND.email}`}>{BRAND.email}</A></li>
          <li><strong>Phone:</strong> <A href={`tel:${BRAND.phone.replace(/\s/g, '')}`}>{BRAND.phone}</A></li>
          {LEGAL.address && <li><strong>Address:</strong> {LEGAL.address}</li>}
        </ul>,
      ],
    },
  ],
};
