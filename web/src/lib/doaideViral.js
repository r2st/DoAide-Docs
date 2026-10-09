const STORAGE_KEY = 'doaide_recent_tools';

export function trackToolVisit(name, path) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filtered = stored.filter(t => t.path !== path);
    filtered.unshift({ name, path, ts: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, 20)));
  } catch {}
}

export function getRecentTools(max = 5) {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').slice(0, max);
  } catch {
    return [];
  }
}

export function getDailyCount(toolName) {
  const today = new Date().toISOString().slice(0, 10);
  const hash = [...(today + toolName)].reduce((a, c) => a + c.charCodeAt(0), 0);
  return 500 + (hash % 2000);
}

export function getDailyRating(toolName) {
  const today = new Date().toISOString().slice(0, 10);
  const hash = [...(today + toolName + 'rating')].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (4.6 + (hash % 4) * 0.1).toFixed(1);
}

export function getRatingCount(toolName) {
  const today = new Date().toISOString().slice(0, 10);
  const hash = [...(today + toolName + 'rcount')].reduce((a, c) => a + c.charCodeAt(0), 0);
  return 200 + (hash % 800);
}

export const TOOL_MAP = {
  '/rent-receipt-generator': 'Rent Receipt',
  '/rental-agreement-generator': 'Rental Agreement',
  '/salary-slip-generator': 'Salary Slip',
  '/experience-letter-generator': 'Experience Letter',
  '/relieving-letter-generator': 'Relieving Letter',
  '/offer-letter-generator': 'Offer Letter',
  '/noc-letter-generator': 'NOC Letter',
  '/appointment-letter-generator': 'Appointment Letter',
  '/invoice-generator': 'Invoice Generator',
  '/bonafide-certificate-generator': 'Bonafide Certificate',
  '/power-of-attorney-generator': 'Power of Attorney',
  '/leave-application-generator': 'Leave Application',
  '/resignation-letter-generator': 'Resignation Letter',
  '/authorization-letter-generator': 'Authorization Letter',
  '/salary-certificate-generator': 'Salary Certificate',
  '/affidavit-generator': 'Affidavit',
  '/partnership-deed-generator': 'Partnership Deed',
  '/employee-warning-letter-generator': 'Warning Letter',
  '/internship-certificate-generator': 'Internship Certificate',
};

export function trackReferral() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('ref') === 'share') {
      const key = 'doaide_referral_count';
      const count = parseInt(localStorage.getItem(key) || '0', 10);
      localStorage.setItem(key, String(count + 1));
      const url = new URL(window.location);
      url.searchParams.delete('ref');
      window.history.replaceState({}, '', url.pathname + url.search);
    }
  } catch {}
}

export function getReferralCount() {
  try {
    return parseInt(localStorage.getItem('doaide_referral_count') || '0', 10);
  } catch { return 0; }
}

export function shouldShowReferralBanner() {
  try {
    const dismissed = localStorage.getItem('doaide_referral_dismissed');
    if (!dismissed) return true;
    return Date.now() - parseInt(dismissed, 10) > 7 * 24 * 60 * 60 * 1000;
  } catch { return true; }
}

export function dismissReferralBanner() {
  try {
    localStorage.setItem('doaide_referral_dismissed', String(Date.now()));
  } catch {}
}

export const TRENDING_TOOLS = [
  { name: 'GST Calculator', url: 'https://gst.doaide.com/calculator', product: 'GSTBot', icon: '🧮' },
  { name: 'Income Tax Calculator', url: 'https://tax.doaide.com/income-tax-calculator', product: 'TaxFile', icon: '💰' },
  { name: 'Premium Calculator', url: 'https://insurekit.doaide.com/premium-calculator', product: 'InsureKit', icon: '₹' },
  { name: 'Resume Builder', url: 'https://resume.doaide.com', product: 'Resume', icon: '📝' },
  { name: 'SIP Calculator', url: 'https://tax.doaide.com/sip-calculator', product: 'TaxFile', icon: '📈' },
  { name: 'GSTIN Lookup', url: 'https://gst.doaide.com/lookup', product: 'GSTBot', icon: '🔍' },
  { name: 'EMI Calculator', url: 'https://tax.doaide.com/emi-calculator', product: 'TaxFile', icon: '🏠' },
  { name: 'Cover Letter', url: 'https://resume.doaide.com/cover-letter-generator', product: 'Resume', icon: '✉️' },
  { name: 'Plan Comparison', url: 'https://insurekit.doaide.com/compare-plans', product: 'InsureKit', icon: '⚖️' },
  { name: 'ATS Checker', url: 'https://resume.doaide.com/ats-checker', product: 'Resume', icon: '✅' },
];
