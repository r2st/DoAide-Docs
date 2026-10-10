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
  { q: "Is it mandatory for companies to issue salary slips in India?", a: "Yes, under the Payment of Wages Act, 1936, and various state-specific Shops and Establishment Acts, employers are required to provide pay slips to employees. The salary slip serves as proof of income and is needed for tax filing, loan applications, and visa processing. Failure to provide salary slips can invite penalties during labour inspections." },
  { q: "What is the difference between CTC, gross salary, and net salary?", a: "CTC (Cost to Company) is the total expense a company incurs for an employee, including employer contributions to PF, gratuity, and insurance. Gross salary is the total salary before deductions (basic + HRA + allowances + bonuses). Net salary (take-home pay) is what the employee receives after deducting PF, professional tax, TDS, and other deductions from the gross salary." },
  { q: "How is professional tax calculated on salary slips?", a: "Professional tax rates vary by state. Most states charge ₹200/month (₹2,400/year) for employees earning above a threshold (typically ₹15,000-₹25,000/month). Some states like Maharashtra charge ₹300 for February. States like Rajasthan and Delhi do not levy professional tax at all. The employer deducts it from salary and deposits it with the state government." },
  { q: "What are the current EPF contribution rates?", a: "As of FY 2026-27, the employee contributes 12% of basic salary + DA to EPF. The employer also contributes 12%, of which 3.67% goes to EPF and 8.33% to EPS (Employee Pension Scheme). The contribution is calculated on basic + DA up to ₹15,000/month for EPS and on actual basic + DA for EPF, unless the employee opts out (for basic above ₹15,000)." },
  { q: "Can I use a salary slip as address proof?", a: "Yes, salary slips are accepted as supporting documents for address proof by many institutions, though they are not a primary address proof. Banks, passport offices, and government agencies typically accept salary slips alongside other documents to verify your employment and income. The address on the salary slip should match the address you are trying to verify." },
  { q: "How long should a company retain salary records?", a: "Under Indian labour laws, companies should retain salary records for at least 3 years (Payment of Wages Act) to 8 years (depending on the applicable act and state rules). For tax purposes, records should be kept for at least 6 years from the end of the relevant assessment year. It is best practice to maintain digital records indefinitely." },
];

export default function SalarySlipFormat2026() {
  return (
    <div style={s.page}>
      <SeoHead
        title="Salary Slip Format 2026: Free Template for Indian Companies | DoAide Docs"
        description="Download free salary slip format for 2026 with all components — basic, HRA, DA, PF, ESI, TDS, professional tax. Complete guide to salary slip structure for Indian companies."
        slug="blog/salary-slip-format-2026"
        faqs={FAQS}
        blog={{
          headline: "Salary Slip Format 2026: Free Template for Indian Companies",
          datePublished: "2026-10-10",
          dateModified: "2026-10-10",
          wordCount: 1100,
        }}
      />
      <Link to="/blog" style={s.backLink}>← Back to Blog</Link>

      <h1 style={s.title}>Salary Slip Format 2026: Free Template for Indian Companies</h1>
      <p style={s.meta}>Published October 2026 · 9 min read</p>

      <p style={s.p}>
        A salary slip (also called a pay slip or wage slip) is a document that employers issue to employees every month,
        detailing the breakdown of their salary — earnings, deductions, and net pay. In India, salary slips are
        legally mandated under labour laws and are essential for income tax filing, bank loan applications, visa
        processing, and employment verification. This guide covers the standard salary slip format used by Indian
        companies in 2026, including all statutory components and deductions.
      </p>

      <div style={s.callout}>
        <div style={s.calloutTitle}>Generate Salary Slips Instantly</div>
        Use our <Link to="/salary-slip-generator" style={s.link}>free Salary Slip Generator</Link> to create
        professional salary slips with all statutory components. Download as PDF — no login, no data stored.
      </div>

      <h2 style={s.h2}>Standard Salary Slip Components</h2>
      <p style={s.p}>
        A complete Indian salary slip contains three main sections: employee details, earnings, and deductions.
        Here is the standard structure followed by most companies:
      </p>

      <h3 style={s.h3}>Employee Information Section</h3>
      <ul style={s.ul}>
        <li><strong>Employee name</strong> — full legal name as per employment records</li>
        <li><strong>Employee ID</strong> — unique identification number assigned by the company</li>
        <li><strong>Designation</strong> — current job title or role</li>
        <li><strong>Department</strong> — the functional department within the organization</li>
        <li><strong>Date of joining</strong> — the employee's start date</li>
        <li><strong>PAN number</strong> — required for TDS calculation and Form 16</li>
        <li><strong>Bank account number</strong> — salary credit account details</li>
        <li><strong>UAN</strong> — Universal Account Number for EPF (12 digits)</li>
        <li><strong>Pay period</strong> — the month and year the salary covers</li>
        <li><strong>Working days / paid days</strong> — total days and leave details</li>
      </ul>

      <h3 style={s.h3}>Earnings (Credits)</h3>
      <p style={s.p}>
        Earnings make up the gross salary. The typical breakup in Indian companies:
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Component</th>
              <th style={s.th}>Typical %</th>
              <th style={s.th}>Tax Treatment</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Basic Salary</td><td style={s.td}>40-50% of CTC</td><td style={s.td}>Fully taxable</td></tr>
            <tr><td style={s.td}>House Rent Allowance (HRA)</td><td style={s.td}>40-50% of basic</td><td style={s.td}>Exempt under Sec 10(13A) with rent receipts</td></tr>
            <tr><td style={s.td}>Dearness Allowance (DA)</td><td style={s.td}>Varies</td><td style={s.td}>Fully taxable</td></tr>
            <tr><td style={s.td}>Conveyance Allowance</td><td style={s.td}>₹1,600/month</td><td style={s.td}>Exempt up to ₹1,600/month</td></tr>
            <tr><td style={s.td}>Medical Allowance</td><td style={s.td}>₹1,250/month</td><td style={s.td}>Taxable (medical reimbursement of ₹15,000 removed from FY 2018-19)</td></tr>
            <tr><td style={s.td}>Special Allowance</td><td style={s.td}>Balancing figure</td><td style={s.td}>Fully taxable</td></tr>
            <tr><td style={s.td}>Leave Travel Allowance (LTA)</td><td style={s.td}>Varies</td><td style={s.td}>Exempt for actual travel in a block of 4 years</td></tr>
            <tr><td style={s.td}>Performance Bonus</td><td style={s.td}>Varies</td><td style={s.td}>Fully taxable</td></tr>
          </tbody>
        </table>
      </div>

      <h3 style={s.h3}>Deductions (Debits)</h3>
      <p style={s.p}>
        Deductions reduce the gross salary to arrive at the net take-home pay:
      </p>
      <div style={{ overflowX: "auto" }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Deduction</th>
              <th style={s.th}>Rate / Amount</th>
              <th style={s.th}>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Employee PF (EPF)</td><td style={s.td}>12% of basic + DA</td><td style={s.td}>Mandatory if basic ≤ ₹15,000/month at joining</td></tr>
            <tr><td style={s.td}>ESI (Employee)</td><td style={s.td}>0.75% of gross</td><td style={s.td}>Applicable if gross ≤ ₹21,000/month</td></tr>
            <tr><td style={s.td}>Professional Tax</td><td style={s.td}>₹200/month (varies by state)</td><td style={s.td}>Not applicable in Delhi, Rajasthan, UP</td></tr>
            <tr><td style={s.td}>TDS (Income Tax)</td><td style={s.td}>As per tax slab</td><td style={s.td}>Based on estimated annual income after deductions</td></tr>
            <tr><td style={s.td}>Loan Recovery</td><td style={s.td}>As applicable</td><td style={s.td}>For salary advances or company loans</td></tr>
          </tbody>
        </table>
      </div>

      <h2 style={s.h2}>Salary Slip Format: Sample Layout</h2>
      <p style={s.p}>
        A professional salary slip typically uses a two-column layout with earnings on the left and deductions on the
        right, preceded by the employee information header and followed by the net pay summary. The company logo
        and registered address appear at the top. Here is the standard order:
      </p>
      <ol style={s.ol}>
        <li><strong>Company header</strong> — logo, company name, registered address</li>
        <li><strong>Pay slip title</strong> — "Pay Slip for the Month of [Month Year]"</li>
        <li><strong>Employee details</strong> — name, ID, designation, department, UAN, PAN</li>
        <li><strong>Attendance summary</strong> — total days, present days, leaves, LOP days</li>
        <li><strong>Earnings column</strong> — basic, HRA, DA, conveyance, special allowance, bonuses</li>
        <li><strong>Deductions column</strong> — PF, ESI, professional tax, TDS, other deductions</li>
        <li><strong>Summary</strong> — gross earnings, total deductions, net pay (in words and figures)</li>
        <li><strong>Footer</strong> — "This is a computer-generated document and does not require a signature"</li>
      </ol>

      <h2 style={s.h2}>Key Changes in 2026 Salary Slips</h2>
      <p style={s.p}>
        Several regulatory changes affect salary slip calculations for FY 2026-27:
      </p>
      <ul style={s.ul}>
        <li><strong>New tax regime as default</strong> — The new tax regime (Section 115BAC) is now the default. Employees must explicitly opt for the old regime with their employer to claim HRA, LTA, and other exemptions.</li>
        <li><strong>Standard deduction increased</strong> — Standard deduction for salaried employees is ₹75,000 under the new regime (Budget 2024 revision), reducing taxable income for all salaried employees.</li>
        <li><strong>EPF threshold unchanged</strong> — The PF contribution ceiling remains at ₹15,000/month for EPS. Employer and employee PF contributions remain at 12% each of basic + DA.</li>
        <li><strong>ESI wage ceiling</strong> — ESI applicability continues at ₹21,000/month gross salary.</li>
      </ul>

      <h2 style={s.h2}>Why Employees Need Salary Slips</h2>
      <p style={s.p}>
        Salary slips serve multiple important purposes beyond monthly pay tracking:
      </p>
      <ul style={s.ul}>
        <li><strong>Income tax filing</strong> — salary slips are needed to verify Form 16 details and compute taxable income accurately</li>
        <li><strong>Bank loans</strong> — banks require 3-6 months of salary slips for home loans, car loans, and personal loans as proof of income and repayment capacity</li>
        <li><strong>Visa applications</strong> — most embassies require 3-6 months of salary slips to verify employment and financial stability</li>
        <li><strong>New employment</strong> — prospective employers may request recent salary slips to determine compensation offers</li>
        <li><strong>Rental agreements</strong> — landlords may request salary slips as proof of income before signing a{" "}
          <Link to="/rental-agreement-generator" style={s.link}>rental agreement</Link></li>
        <li><strong>Salary certificate</strong> — employers use salary slip data to issue{" "}
          <Link to="/salary-certificate-generator" style={s.link}>salary certificates</Link> for verification</li>
      </ul>

      <h2 style={s.h2}>How to Generate a Salary Slip with DoAide Docs</h2>
      <ol style={s.ol}>
        <li>Open the <Link to="/salary-slip-generator" style={s.link}>Salary Slip Generator</Link></li>
        <li>Enter company name and employee details (name, ID, designation, department)</li>
        <li>Fill in the earnings — basic salary, HRA, DA, conveyance, and special allowance</li>
        <li>Add deductions — EPF, ESI, professional tax, TDS</li>
        <li>Preview the salary slip in real-time with automatic net pay calculation</li>
        <li>Download as a professionally formatted PDF</li>
      </ol>
      <p style={s.p}>
        The generator handles all calculations automatically — enter the gross components and it computes
        totals, deductions, and net pay. Perfect for small businesses, startups, and HR departments that
        need a quick, no-cost solution for generating employee pay slips.
      </p>

      <h2 style={s.h2}>Related Tools for HR Professionals</h2>
      <p style={s.p}>
        DoAide Docs provides a complete suite of HR document generators:
      </p>
      <ul style={s.ul}>
        <li><Link to="/offer-letter-generator" style={s.link}>Offer Letter Generator</Link> — create job offer letters with CTC and designation</li>
        <li><Link to="/appointment-letter-generator" style={s.link}>Appointment Letter Generator</Link> — formal appointment confirmation for new hires</li>
        <li><Link to="/experience-letter-generator" style={s.link}>Experience Letter Generator</Link> — employment verification letters for departing employees</li>
        <li><Link to="/relieving-letter-generator" style={s.link}>Relieving Letter Generator</Link> — end-of-employment confirmation letters</li>
        <li><Link to="/employee-warning-letter-generator" style={s.link}>Warning Letter Generator</Link> — formal disciplinary warning letters</li>
        <li><Link to="/leave-application-generator" style={s.link}>Leave Application Generator</Link> — employee leave request forms</li>
      </ul>

      <FAQ items={FAQS} />

      <div style={{ marginTop: 40, padding: 20, background: "var(--surface)", borderRadius: "var(--radius-lg)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--gold)" }}>HR Document Suite</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            { to: "/salary-slip-generator", label: "Salary Slip" },
            { to: "/offer-letter-generator", label: "Offer Letter" },
            { to: "/experience-letter-generator", label: "Experience Letter" },
            { to: "/appointment-letter-generator", label: "Appointment Letter" },
            { to: "/relieving-letter-generator", label: "Relieving Letter" },
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
