import { Link } from "react-router-dom";
import SeoHead from "../../components/SeoHead";
import FAQ from "../../components/FAQ";

const s = {
  page: { maxWidth: 800, margin: "0 auto" },
  backLink: { color: "var(--text-muted)", fontSize: 13, textDecoration: "none", display: "inline-block", marginBottom: 24 },
  title: { fontFamily: "var(--font-display)", fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  meta: { color: "var(--text-muted)", fontSize: 13, marginBottom: 32 },
  h2: { fontFamily: "var(--font-display)", fontSize: 24, marginTop: 40, marginBottom: 12, color: "var(--text)" },
  h3: { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 8, color: "var(--text)" },
  p: { fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: 16 },
  table: { width: "100%", borderCollapse: "collapse", marginBottom: 24, fontSize: 14 },
  th: { textAlign: "left", padding: "10px 8px", borderBottom: "2px solid var(--border)", color: "var(--text-secondary)", fontWeight: 600, background: "var(--surface)" },
  td: { padding: "10px 8px", borderBottom: "1px solid var(--border)" },
  link: { color: "var(--gold)", fontWeight: 500, textDecoration: "none" },
  callout: { padding: 20, background: "var(--gold-bg)", border: "1px solid rgba(240,180,41,0.2)", borderRadius: "var(--radius-lg)", marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)" },
  calloutTitle: { fontWeight: 600, color: "var(--gold)", marginBottom: 8 },
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)" },
  ol: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)" },
  sampleDoc: { padding: 20, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", marginBottom: 24, fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)" },
};

const FAQS = [
  { q: "Is an 11-month rent agreement legally valid in India?", a: "Yes, an 11-month rent agreement is legally valid under the Indian Contract Act. It is the most common format because agreements of 12 months or longer must be registered under the Registration Act, 1908, which involves higher stamp duty and registration fees. An 11-month agreement can be renewed upon expiry by mutual consent." },
  { q: "What is the stamp duty for a rent agreement?", a: "Stamp duty varies by state. In Maharashtra, it is ₹100-₹500 depending on the rent amount. In Delhi, it is typically ₹100 for 11-month agreements. In Karnataka, it is 1% of the annual rent. In Uttar Pradesh, it is ₹10-₹200. Check with your local Sub-Registrar for exact rates. E-stamp papers are available in most states and are easier to obtain." },
  { q: "Can I make a rent agreement without stamp paper?", a: "Technically, a rent agreement on plain paper is valid between the parties as a contract. However, it will not be admissible as evidence in court without proper stamp duty. For HRA claims, bank verification, and police verification, stamp paper is expected. The cost is minimal (₹100-₹500), so it is advisable to always use stamp paper." },
  { q: "Is an online rent agreement valid?", a: "Yes, many states now allow e-registration of rent agreements. Maharashtra, Karnataka, and Delhi offer online registration portals. An e-stamped and registered agreement has the same legal standing as a physical one. For unregistered agreements (11-month or less), generating and printing the document is sufficient." },
  { q: "What should a rent agreement include?", a: "A comprehensive rent agreement must include: names and addresses of landlord and tenant, property description, monthly rent amount, security deposit, lease duration, rent escalation clause, maintenance responsibility, lock-in period, notice period for termination, restrictions (subletting, pets, commercial use), and signatures of both parties and two witnesses." },
  { q: "Do I need witnesses for a rent agreement?", a: "While not strictly mandatory for an unregistered 11-month agreement, it is strongly recommended to have two witnesses sign the agreement. For registered agreements (12 months+), witnesses are mandatory. Witnesses add legal weight to the document and help resolve disputes if they arise." },
];

export default function HowToWriteRentAgreement() {
  return (
    <div style={s.page}>
      <SeoHead
        title="How to Write a Rent Agreement — Complete Guide with Format | DoAide Docs"
        description="Step-by-step guide to writing a rent agreement in India. 11-month rental agreement format, essential clauses, stamp duty by state, registration process, and free template download."
        slug="blog/how-to-write-rent-agreement"
        faqs={FAQS}
      />
      <Link to="/blog" style={s.backLink}>← Back to Blog</Link>

      <h1 style={s.title}>How to Write a Rent Agreement — Complete Guide with Format</h1>
      <p style={s.meta}>Updated October 2026 · 12 min read</p>

      <p style={s.p}>
        A well-drafted rent agreement protects both landlord and tenant. It defines the terms of tenancy, prevents
        disputes, and serves as legal evidence if issues arise. In India, the standard 11-month rental agreement is the
        most common format because it avoids the mandatory registration requirement of longer leases. This guide covers
        everything you need to know — from essential clauses to stamp duty rates by state.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Generate Your Agreement Instantly</div>
        Use our <Link to="/rental-agreement-generator" style={s.link}>Free Rental Agreement Generator</Link> to
        create a properly formatted rent agreement in minutes. Fill in the details, preview, and download as PDF.
      </div>

      <h2 style={s.h2}>Why a Written Rent Agreement Matters</h2>
      <ul style={s.ul}>
        <li><strong>Legal protection</strong> — Defines rights and obligations of both parties</li>
        <li><strong>Dispute resolution</strong> — Serves as evidence in case of disagreements</li>
        <li><strong>HRA tax exemption</strong> — Required for claiming HRA deduction under Section 10(13A)</li>
        <li><strong>Address proof</strong> — Can be used as proof of address for Aadhaar, bank accounts, and more</li>
        <li><strong>Police verification</strong> — Required for tenant police verification in many cities</li>
        <li><strong>Loan applications</strong> — Banks may require a rent agreement for loan processing</li>
      </ul>

      <h2 style={s.h2}>Essential Clauses Checklist</h2>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Clause</th><th style={s.th}>Description</th><th style={s.th}>Required?</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Parties</td><td style={s.td}>Full names, addresses of landlord and tenant</td><td style={s.td}>Yes</td></tr>
          <tr><td style={s.td}>Property Description</td><td style={s.td}>Address, floor, flat number, area</td><td style={s.td}>Yes</td></tr>
          <tr><td style={s.td}>Lease Duration</td><td style={s.td}>Start date, end date (typically 11 months)</td><td style={s.td}>Yes</td></tr>
          <tr><td style={s.td}>Monthly Rent</td><td style={s.td}>Rent amount in figures and words</td><td style={s.td}>Yes</td></tr>
          <tr><td style={s.td}>Security Deposit</td><td style={s.td}>Amount, refund terms (typically 2-10 months)</td><td style={s.td}>Yes</td></tr>
          <tr><td style={s.td}>Rent Due Date</td><td style={s.td}>Date by which rent must be paid each month</td><td style={s.td}>Yes</td></tr>
          <tr><td style={s.td}>Rent Escalation</td><td style={s.td}>Annual increase % (typically 5-10%)</td><td style={s.td}>Recommended</td></tr>
          <tr><td style={s.td}>Maintenance</td><td style={s.td}>Who pays society maintenance charges</td><td style={s.td}>Recommended</td></tr>
          <tr><td style={s.td}>Lock-in Period</td><td style={s.td}>Minimum period before either party can terminate</td><td style={s.td}>Recommended</td></tr>
          <tr><td style={s.td}>Notice Period</td><td style={s.td}>Advance notice for termination (typically 1-2 months)</td><td style={s.td}>Recommended</td></tr>
          <tr><td style={s.td}>Restrictions</td><td style={s.td}>Subletting, pets, commercial use, modifications</td><td style={s.td}>Recommended</td></tr>
          <tr><td style={s.td}>Utilities</td><td style={s.td}>Who pays electricity, water, gas, internet</td><td style={s.td}>Recommended</td></tr>
          <tr><td style={s.td}>Signatures</td><td style={s.td}>Landlord, tenant, and two witnesses</td><td style={s.td}>Yes</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>11-Month vs Registered Lease</h2>
      <p style={s.p}>
        In India, rental agreements of 12 months or longer must be registered under the Registration Act, 1908. This
        involves higher stamp duty, registration fees (typically 1% of annual rent), and a visit to the Sub-Registrar
        office. That is why 11-month agreements are the standard practice:
      </p>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Feature</th><th style={s.th}>11-Month Agreement</th><th style={s.th}>Registered Lease</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Registration</td><td style={s.td}>Not mandatory</td><td style={s.td}>Mandatory</td></tr>
          <tr><td style={s.td}>Stamp Duty</td><td style={s.td}>₹100-₹500</td><td style={s.td}>Higher (varies by state)</td></tr>
          <tr><td style={s.td}>Registration Fee</td><td style={s.td}>None</td><td style={s.td}>1% of annual rent (approx.)</td></tr>
          <tr><td style={s.td}>Court Admissibility</td><td style={s.td}>Valid if on stamp paper</td><td style={s.td}>Full legal standing</td></tr>
          <tr><td style={s.td}>Renewal</td><td style={s.td}>New agreement needed</td><td style={s.td}>As per lease terms</td></tr>
          <tr><td style={s.td}>Best For</td><td style={s.td}>Residential, short-term</td><td style={s.td}>Commercial, long-term</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>Stamp Duty by State</h2>
      <p style={s.p}>
        Stamp duty for rent agreements varies significantly by state. Here are the rates for major states:
      </p>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>State</th><th style={s.th}>Stamp Duty (11-Month)</th><th style={s.th}>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Maharashtra</td><td style={s.td}>₹100-₹500</td><td style={s.td}>₹100 (rent &lt; ₹5K), ₹500 (higher)</td></tr>
          <tr><td style={s.td}>Karnataka</td><td style={s.td}>₹200-₹500</td><td style={s.td}>Or 1% of annual rent</td></tr>
          <tr><td style={s.td}>Delhi</td><td style={s.td}>₹100</td><td style={s.td}>Flat rate for unregistered</td></tr>
          <tr><td style={s.td}>Uttar Pradesh</td><td style={s.td}>₹10-₹200</td><td style={s.td}>Varies by rent amount</td></tr>
          <tr><td style={s.td}>Tamil Nadu</td><td style={s.td}>₹20</td><td style={s.td}>1% of annual rent for registered</td></tr>
          <tr><td style={s.td}>Telangana</td><td style={s.td}>₹100-₹500</td><td style={s.td}>Based on rent and deposit</td></tr>
          <tr><td style={s.td}>West Bengal</td><td style={s.td}>₹100</td><td style={s.td}>Flat rate for standard agreements</td></tr>
          <tr><td style={s.td}>Rajasthan</td><td style={s.td}>₹20-₹100</td><td style={s.td}>Varies by rent amount</td></tr>
        </tbody>
      </table>

      <h2 style={s.h2}>How to Register a Rent Agreement</h2>
      <p style={s.p}>
        If you choose to register (mandatory for 12+ months), follow these steps:
      </p>
      <ol style={s.ol}>
        <li><strong>Purchase e-stamp paper</strong> of the required value from an authorized vendor or online portal</li>
        <li><strong>Draft the agreement</strong> with all essential clauses (use our <Link to="/rental-agreement-generator" style={s.link}>generator</Link>)</li>
        <li><strong>Print on stamp paper</strong> and sign with two witnesses</li>
        <li><strong>Visit the Sub-Registrar office</strong> with the agreement, ID proofs (Aadhaar/PAN), property documents, and passport photos</li>
        <li><strong>Pay the registration fee</strong> (typically 1% of annual rent)</li>
        <li><strong>Biometric verification</strong> of landlord, tenant, and witnesses</li>
        <li><strong>Collect the registered copy</strong> (usually within 2-3 working days)</li>
      </ol>

      <h2 style={s.h2}>Tenant Rights and Landlord Rights</h2>
      <h3 style={s.h3}>Tenant Rights</h3>
      <ul style={s.ul}>
        <li>Right to peaceful possession of the rented property</li>
        <li>Right to essential services (water, electricity)</li>
        <li>Right to get security deposit refunded (minus legitimate deductions)</li>
        <li>Protection against arbitrary eviction during the agreement period</li>
        <li>Right to receive rent receipts for HRA claims</li>
      </ul>

      <h3 style={s.h3}>Landlord Rights</h3>
      <ul style={s.ul}>
        <li>Right to receive rent on time as per the agreement</li>
        <li>Right to evict for non-payment, subletting, or misuse</li>
        <li>Right to inspect the property with reasonable notice</li>
        <li>Right to deduct from security deposit for damages beyond normal wear</li>
        <li>Right to increase rent as per the escalation clause</li>
      </ul>

      <h2 style={s.h2}>Common Mistakes to Avoid</h2>
      <ol style={s.ol}>
        <li><strong>No written agreement</strong> — Verbal agreements are hard to enforce. Always have a written document.</li>
        <li><strong>Missing security deposit terms</strong> — Clearly state the deposit amount, conditions for deduction, and refund timeline (typically within 30-60 days of vacating).</li>
        <li><strong>No rent escalation clause</strong> — Without it, the landlord cannot increase rent during the tenure or at renewal.</li>
        <li><strong>Vague property description</strong> — Include the exact address, floor, flat number, and area to prevent disputes.</li>
        <li><strong>No maintenance responsibility</strong> — Specify who pays for society maintenance, repairs, and what constitutes "normal wear."</li>
        <li><strong>Missing notice period</strong> — Always define how much advance notice is needed to terminate the agreement.</li>
      </ol>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Create Your Rent Agreement Now</div>
        Our <Link to="/rental-agreement-generator" style={s.link}>Free Rental Agreement Generator</Link> includes
        all the essential clauses mentioned in this guide. Fill in the details, preview the agreement, and download as
        PDF instantly. Need rent receipts too? Use our <Link to="/rent-receipt-generator" style={s.link}>Rent Receipt Generator</Link>.
      </div>

      <FAQ items={FAQS} />
    </div>
  );
}
