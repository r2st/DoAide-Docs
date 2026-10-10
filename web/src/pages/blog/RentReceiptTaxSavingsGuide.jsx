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
  ul: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)" },
  ol: { paddingLeft: 20, marginBottom: 16, fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)" },
  link: { color: "var(--gold)", fontWeight: 500, textDecoration: "none" },
  callout: { padding: 20, background: "var(--gold-bg)", border: "1px solid rgba(240,180,41,0.2)", borderRadius: "var(--radius-lg)", marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)" },
  calloutTitle: { fontWeight: 600, color: "var(--gold)", marginBottom: 8 },
  table: { width: "100%", borderCollapse: "collapse", marginBottom: 24, fontSize: 14 },
  th: { textAlign: "left", padding: "10px 8px", borderBottom: "2px solid var(--border)", color: "var(--text-secondary)", fontWeight: 600, background: "var(--surface)" },
  td: { padding: "10px 8px", borderBottom: "1px solid var(--border)" },
};

const FAQS = [
  { q: "Is rent receipt mandatory for HRA exemption?", a: "Yes, rent receipts are mandatory if your annual rent exceeds ₹1,00,000 (approximately ₹8,333 per month). Even below this threshold, employers may request receipts for processing HRA exemption. It is good practice to maintain rent receipts regardless of the amount." },
  { q: "Can I claim HRA if I live in my own house?", a: "No, HRA exemption under Section 10(13A) is only available to salaried individuals who pay rent for their accommodation. If you own the house you live in, you cannot claim HRA. However, if you own a house in one city but rent in another city due to employment, you can claim HRA for the rented accommodation." },
  { q: "Do rent receipts need a revenue stamp?", a: "Yes, a revenue stamp of ₹1 is required on rent receipts when the monthly rent exceeds ₹5,000 and the receipt is for cash payment. For payments made via bank transfer, cheque, or UPI, a revenue stamp is not required. The landlord should sign across the revenue stamp." },
  { q: "What if my landlord does not have a PAN card?", a: "If your annual rent exceeds ₹1,00,000 and your landlord does not have a PAN, you must obtain a declaration from the landlord to that effect. The declaration should include the landlord's name, address, and a statement that they do not hold a PAN. Without this, your employer may reject the HRA claim." },
  { q: "Can I generate rent receipts for previous months?", a: "Yes, you can generate rent receipts for any past period using the DoAide Docs Rent Receipt Generator. Simply enter the relevant month, year, and payment details. This is useful if you forgot to collect receipts earlier and need them for tax filing or employer submission." },
  { q: "Is HRA exemption available under the new tax regime?", a: "No, HRA exemption under Section 10(13A) is not available under the new tax regime (Section 115BAC). If you opt for the new tax regime, you forgo HRA exemption along with most other deductions. The old tax regime continues to allow HRA exemption for salaried individuals paying rent." },
];

export default function RentReceiptTaxSavingsGuide() {
  return (
    <div style={s.page}>
      <SeoHead
        title="Rent Receipt Generator: Free Tool for Tax Savings Under Section 10(13A) | DoAide Docs"
        description="Generate free rent receipts for HRA tax exemption under Section 10(13A). Complete guide to rent receipt format, HRA calculation, and tax savings for salaried employees in India."
        slug="blog/rent-receipt-generator-tax-savings"
        faqs={FAQS}
        blog={{
          headline: "Rent Receipt Generator: Free Tool for Tax Savings Under Section 10(13A)",
          datePublished: "2026-10-10",
          dateModified: "2026-10-10",
          wordCount: 1050,
        }}
      />
      <Link to="/blog" style={s.backLink}>← Back to Blog</Link>

      <h1 style={s.title}>Rent Receipt Generator: Free Tool for Tax Savings Under Section 10(13A)</h1>
      <p style={s.meta}>Published October 2026 · 8 min read</p>

      <p style={s.p}>
        If you are a salaried employee in India receiving House Rent Allowance (HRA) as part of your salary, rent
        receipts are essential for claiming tax exemption under Section 10(13A) of the Income Tax Act. Without proper
        rent receipts, your employer will tax the entire HRA component, costing you thousands of rupees every year.
        This guide explains how HRA exemption works, how to calculate your eligible amount, and how to generate
        compliant rent receipts instantly using the{" "}
        <Link to="/rent-receipt-generator" style={s.link}>DoAide Docs Rent Receipt Generator</Link>.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Generate Rent Receipts Instantly</div>
        Use our <Link to="/rent-receipt-generator" style={s.link}>free Rent Receipt Generator</Link> to create
        properly formatted rent receipts with landlord details, tenant information, and revenue stamp note.
        Download as PDF — no login, no signup, 100% private.
      </div>

      <h2 style={s.h2}>What is HRA Exemption Under Section 10(13A)?</h2>
      <p style={s.p}>
        House Rent Allowance (HRA) is a salary component that employers pay to cover the rental expenses of employees.
        Under Section 10(13A) of the Income Tax Act, 1961, a portion of this HRA can be exempt from income tax,
        provided the employee actually pays rent for accommodation. The exemption is not automatic — you must submit
        rent receipts to your employer as proof of rental payment.
      </p>
      <p style={s.p}>
        This exemption is available only under the old tax regime. Employees who opt for the new tax regime under
        Section 115BAC cannot claim HRA exemption. For many salaried individuals, especially those in metro cities
        with high rents, the old regime with HRA exemption results in significantly lower tax liability.
      </p>

      <h2 style={s.h2}>How HRA Exemption is Calculated</h2>
      <p style={s.p}>
        The HRA exemption is the minimum of three amounts. Understanding this formula helps you estimate your
        potential tax savings:
      </p>
      <ol style={s.ol}>
        <li><strong>Actual HRA received</strong> from your employer during the financial year.</li>
        <li><strong>50% of basic salary</strong> if you live in a metro city (Delhi, Mumbai, Chennai, Kolkata), or <strong>40% of basic salary</strong> for non-metro cities.</li>
        <li><strong>Actual rent paid minus 10% of basic salary</strong> — the net rental expense above the threshold.</li>
      </ol>

      <h3 style={s.h3}>Example Calculation</h3>
      <p style={s.p}>
        Consider an employee in Bangalore (non-metro) with a basic salary of ₹50,000/month, HRA of ₹20,000/month,
        and actual rent of ₹18,000/month:
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Component</th>
              <th style={s.th}>Annual Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Actual HRA received</td><td style={s.td}>₹2,40,000</td></tr>
            <tr><td style={s.td}>40% of basic salary (non-metro)</td><td style={s.td}>₹2,40,000</td></tr>
            <tr><td style={s.td}>Rent paid – 10% of basic</td><td style={s.td}>₹1,56,000</td></tr>
            <tr><td style={s.td}><strong>HRA exemption (minimum)</strong></td><td style={s.td}><strong>₹1,56,000</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p style={s.p}>
        In this example, ₹1,56,000 of the HRA is tax-exempt. At a 30% tax bracket, this saves approximately
        ₹48,672 in taxes (including cess). Without rent receipts, this entire amount would be taxable.
      </p>

      <h2 style={s.h2}>What Information Must a Rent Receipt Contain?</h2>
      <p style={s.p}>
        For a rent receipt to be accepted by your employer and the Income Tax Department, it must include:
      </p>
      <ul style={s.ul}>
        <li><strong>Tenant name</strong> — full name of the employee paying rent</li>
        <li><strong>Landlord name</strong> — full name of the property owner receiving rent</li>
        <li><strong>Landlord PAN</strong> — mandatory if annual rent exceeds ₹1,00,000</li>
        <li><strong>Rental address</strong> — complete address of the rented property</li>
        <li><strong>Rent amount</strong> — monthly rent paid (in figures and words)</li>
        <li><strong>Payment period</strong> — month and year for which rent is paid</li>
        <li><strong>Payment mode</strong> — cash, bank transfer, cheque, or UPI</li>
        <li><strong>Revenue stamp</strong> — ₹1 stamp required for cash payments above ₹5,000/month</li>
        <li><strong>Landlord signature</strong> — the landlord must sign the receipt</li>
      </ul>
      <p style={s.p}>
        Our <Link to="/rent-receipt-generator" style={s.link}>Rent Receipt Generator</Link> automatically
        formats all these fields in the standard layout accepted by employers and the IT department.
      </p>

      <h2 style={s.h2}>When to Submit Rent Receipts</h2>
      <p style={s.p}>
        Most employers collect rent receipts twice a year — typically in January (for April-September) and March
        (for October-March). Some companies accept quarterly submissions. Check your company's HR policy for
        deadlines. Late submissions may result in the HRA being taxed in full for those months.
      </p>
      <p style={s.p}>
        It is advisable to generate and store rent receipts monthly, even if your employer only collects them
        periodically. This ensures you have a complete record in case of an income tax notice or audit. Keep
        digital copies (PDFs) alongside any physical receipts.
      </p>

      <h2 style={s.h2}>Revenue Stamp Rules for Rent Receipts</h2>
      <p style={s.p}>
        When rent is paid in cash and the monthly amount exceeds ₹5,000, a revenue stamp of ₹1 must be affixed
        to the receipt. The landlord should sign across the stamp. For payments made through bank transfer, UPI,
        or cheque, no revenue stamp is needed — the bank transaction record serves as additional proof.
      </p>
      <p style={s.p}>
        Revenue stamps are available at most post offices and some stationery shops. The requirement is under the
        Indian Stamp Act and not affixing one can technically invalidate a cash receipt, though in practice most
        employers accept receipts without the stamp as long as other details are complete.
      </p>

      <h2 style={s.h2}>Common Mistakes to Avoid</h2>
      <ul style={s.ul}>
        <li><strong>Inconsistent amounts</strong> — Ensure the rent amount on receipts matches what you declared in the investment declaration submitted to your employer at the start of the year.</li>
        <li><strong>Missing landlord PAN</strong> — If annual rent exceeds ₹1,00,000, the landlord's PAN is mandatory. Request it early to avoid last-minute issues.</li>
        <li><strong>Incorrect dates</strong> — Each receipt should cover a specific month. Do not generate a single receipt for the entire year.</li>
        <li><strong>No proof of payment</strong> — For large rent amounts, maintain bank transfer records alongside receipts. Cash-only payments for high rents may attract scrutiny.</li>
        <li><strong>Claiming HRA without paying rent</strong> — Generating fake rent receipts is tax fraud under Section 276C and can result in penalties of 100-300% of the tax evaded.</li>
      </ul>

      <h2 style={s.h2}>HRA vs Home Loan: Can You Claim Both?</h2>
      <p style={s.p}>
        Yes, you can claim both HRA exemption and home loan benefits simultaneously in specific situations. If you
        own a house in one city (say your hometown) and rent a house in another city where you work, you can claim
        HRA for the rented house and home loan interest deduction (Section 24) plus principal repayment deduction
        (Section 80C) for the owned house. However, you cannot claim both if the rented and owned properties are
        in the same city, as it would be difficult to justify why you are renting when you own a house nearby.
      </p>

      <h2 style={s.h2}>Step-by-Step: Generate Rent Receipts with DoAide Docs</h2>
      <ol style={s.ol}>
        <li>Open the <Link to="/rent-receipt-generator" style={s.link}>Rent Receipt Generator</Link></li>
        <li>Enter tenant name, landlord name, and landlord PAN (if applicable)</li>
        <li>Fill in the property address and monthly rent amount</li>
        <li>Select the payment month, year, and payment mode</li>
        <li>Preview the receipt in real-time and download as PDF</li>
        <li>Print, affix revenue stamp (for cash payments over ₹5,000), and get it signed</li>
      </ol>
      <p style={s.p}>
        The entire process takes less than a minute. Generate receipts for multiple months by changing the date
        and downloading each one. All data stays in your browser — nothing is sent to any server.
      </p>

      <h2 style={s.h2}>Related Tools</h2>
      <p style={s.p}>
        DoAide Docs offers several related document generators that salaried professionals may need:
      </p>
      <ul style={s.ul}>
        <li><Link to="/salary-slip-generator" style={s.link}>Salary Slip Generator</Link> — Generate salary slips with HRA, basic, DA, PF, and TDS breakdowns</li>
        <li><Link to="/salary-certificate-generator" style={s.link}>Salary Certificate Generator</Link> — Income verification for bank loans and visa applications</li>
        <li><Link to="/rental-agreement-generator" style={s.link}>Rental Agreement Generator</Link> — Create 11-month rental agreements between landlord and tenant</li>
        <li><Link to="/invoice-generator" style={s.link}>Invoice Generator</Link> — GST-compliant invoices for freelancers and businesses</li>
      </ul>

      <FAQ items={FAQS} />

      <div style={{ marginTop: 40, padding: 20, background: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--gold)" }}>Popular Tools</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            { to: "/rent-receipt-generator", label: "Rent Receipt" },
            { to: "/salary-slip-generator", label: "Salary Slip" },
            { to: "/salary-certificate-generator", label: "Salary Certificate" },
            { to: "/rental-agreement-generator", label: "Rental Agreement" },
          ].map((t) => (
            <Link key={t.to} to={t.to} style={{ padding: "8px 16px", background: "var(--gold-bg)", border: "1px solid rgba(240,180,41,0.2)", borderRadius: 20, fontSize: 13, color: "var(--gold)", textDecoration: "none", fontWeight: 500 }}>
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
