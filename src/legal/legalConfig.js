import { BRAND } from '../content.js';

/**
 * Business details used by the Privacy Policy and Terms & Conditions pages.
 * Fill in the empty values before going live — empty fields are simply left out
 * of the pages (nothing is shown as a placeholder).
 */
export const LEGAL = {
  effectiveDate: '28 September 2026',
  effectiveDateISO: '2026-09-28', // same date in YYYY-MM-DD (used in search-engine data)
  // Registered legal name of the business that operates CRYZO (e.g. "XYZ Technologies Pvt. Ltd.").
  entityName: '',
  // Registered / postal address, shown in the contact blocks.
  address: '',
  // City whose courts have jurisdiction (e.g. "Mumbai, Maharashtra"). Empty → "competent courts in India".
  jurisdictionCity: '',
  grievanceOfficer: {
    name: '', // Name of the Grievance Officer
    email: BRAND.email,
    phone: BRAND.phone,
  },
};

/** "CRYZO" or "CRYZO (operated by XYZ Pvt. Ltd.)" */
export const operatorName = LEGAL.entityName ? `${BRAND.name} (operated by ${LEGAL.entityName})` : BRAND.name;

export const PRIVACY_PATH = '/privacy-policy/';
export const TERMS_PATH = '/terms-and-conditions/';
