import { Link, Outlet, useLocation } from "react-router-dom";
import SeoHead from "../../components/SeoHead";

const ARTICLES = [
  {
    slug: "free-legal-document-templates-india",
    title: "Free Legal Document Templates India — Download PDF Instantly",
    description: "Top free legal document templates for India — rent agreements, affidavits, power of attorney, NOC letters, and more. Generate and download as PDF with no login.",
  },
  {
    slug: "how-to-write-rent-agreement",
    title: "How to Write a Rent Agreement — Complete Guide with Format",
    description: "Step-by-step guide to writing a rent agreement in India. 11-month rental agreement format, essential clauses, stamp duty, registration, and free template download.",
  },
  {
    slug: "how-to-write-employee-warning-letter",
    title: "How to Write an Employee Warning Letter — Complete Guide with Format",
    description: "Step-by-step guide to writing an employee warning letter in India. Includes format, legal considerations, progressive discipline, and a free generator.",
  },
  {
    slug: "how-to-write-internship-certificate",
    title: "How to Write an Internship Certificate — Complete Guide with Format",
    description: "Complete guide to creating internship certificates in India. Essential elements, sample format, university requirements, and a free generator.",
  },
  {
    slug: "rent-receipt-generator-tax-savings",
    title: "Rent Receipt Generator: Free Tool for Tax Savings Under Section 10(13A)",
    description: "Generate free rent receipts for HRA tax exemption. Complete guide to rent receipt format, HRA calculation, and tax savings for salaried employees in India.",
  },
  {
    slug: "salary-slip-format-2026",
    title: "Salary Slip Format 2026: Free Template for Indian Companies",
    description: "Download free salary slip format for 2026 with all components — basic, HRA, DA, PF, ESI, TDS. Complete guide for Indian companies.",
  },
  {
    slug: "experience-letter-format-guide",
    title: "Experience Letter Format: Professional Template with Examples",
    description: "Free experience letter format with professional examples. Complete guide to writing experience letters for Indian companies.",
  },
];

export { ARTICLES };

const s = {
  page: { maxWidth: 800, margin: "0 auto" },
  backLink: { color: "var(--text-muted)", fontSize: 13, textDecoration: "none", display: "inline-block", marginBottom: 24 },
  title: { fontFamily: "var(--font-display)", fontSize: 36, marginBottom: 8, lineHeight: 1.2 },
  subtitle: { color: "var(--text-muted)", fontSize: 14, marginBottom: 40 },
  card: { display: "block", padding: 20, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", marginBottom: 16, textDecoration: "none", transition: "border-color 0.2s" },
  cardTitle: { fontFamily: "var(--font-display)", fontSize: 18, color: "var(--text)", marginBottom: 6 },
  cardDesc: { fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 },
  readMore: { fontSize: 13, color: "var(--gold)", fontWeight: 500, marginTop: 8, display: "inline-block" },
};

export default function BlogLayout() {
  const { pathname } = useLocation();
  const isIndex = pathname === "/blog" || pathname === "/blog/";

  return (
    <div style={s.page}>
      <SeoHead
        title="DoAide Docs Blog — Document Templates & Legal Guides"
        description="Expert guides on legal documents, rent agreements, affidavits, partnership deeds, and professional templates for India."
        slug="blog"
      />
      <Link to="/" style={s.backLink}>← Back to Docs</Link>
      {isIndex && (
        <>
          <h1 style={s.title}>Docs Blog</h1>
          <p style={s.subtitle}>Guides and resources for legal documents in India</p>
        </>
      )}
      <Outlet />
    </div>
  );
}

export function BlogIndex() {
  return (
    <div>
      {ARTICLES.map((a) => (
        <Link key={a.slug} to={`/blog/${a.slug}`} style={s.card}>
          <div style={s.cardTitle}>{a.title}</div>
          <div style={s.cardDesc}>{a.description}</div>
          <span style={s.readMore}>Read more →</span>
        </Link>
      ))}
    </div>
  );
}
