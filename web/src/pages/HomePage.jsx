import { useState } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import RecentTools from "../components/RecentTools";
import TrendingTools from "../components/TrendingTools";

const DOCS = [
  { slug: "rent-receipt-generator", name: "Rent Receipt", icon: "🏠", category: "Rental", desc: "Generate rent receipts for HRA tax exemption. Free PDF download.", popular: true },
  { slug: "rental-agreement-generator", name: "Rental Agreement", icon: "📋", category: "Rental", desc: "Create 11-month rental agreement with all legal clauses.", popular: true },
  { slug: "salary-slip-generator", name: "Salary Slip", icon: "💰", category: "HR", desc: "Generate salary slips with all components — basic, HRA, DA, deductions.", popular: true },
  { slug: "experience-letter-generator", name: "Experience Letter", icon: "📜", category: "HR", desc: "Create professional experience certificates for employees." },
  { slug: "relieving-letter-generator", name: "Relieving Letter", icon: "✅", category: "HR", desc: "Generate relieving letters confirming end of employment." },
  { slug: "offer-letter-generator", name: "Offer Letter", icon: "🤝", category: "HR", desc: "Create job offer letters with compensation details." },
  { slug: "noc-letter-generator", name: "NOC Letter", icon: "📄", category: "Legal", desc: "Generate No Objection Certificates for various purposes." },
  { slug: "appointment-letter-generator", name: "Appointment Letter", icon: "📩", category: "HR", desc: "Create appointment letters for new employees." },
  { slug: "invoice-generator", name: "Invoice", icon: "🧾", category: "Business", desc: "Generate GST-compliant invoices with tax calculations.", popular: true },
  { slug: "bonafide-certificate-generator", name: "Bonafide Certificate", icon: "🎓", category: "Legal", desc: "Create bonafide certificates for students and employees." },
  { slug: "power-of-attorney-generator", name: "Power of Attorney", icon: "⚖️", category: "Legal", desc: "Generate general or special power of attorney documents." },
  { slug: "leave-application-generator", name: "Leave Application", icon: "🏖️", category: "HR", desc: "Create leave applications — casual, sick, earned, maternity.", popular: true },
  { slug: "resignation-letter-generator", name: "Resignation Letter", icon: "👋", category: "HR", desc: "Generate professional resignation letters.", popular: true },
  { slug: "authorization-letter-generator", name: "Authorization Letter", icon: "🔑", category: "Legal", desc: "Create authorization letters for third-party actions." },
  { slug: "salary-certificate-generator", name: "Salary Certificate", icon: "📃", category: "HR", desc: "Generate salary certificates for loans, visas, and verification.", popular: true },
];

const CATEGORIES = ["All", "HR", "Rental", "Business", "Legal"];

export default function HomePage() {
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? DOCS : DOCS.filter((d) => d.category === category);

  return (
    <>
      <SeoHead
        title="Free Document Generator for India | DoAide Docs"
        description="Generate rent receipts, rental agreements, salary slips, experience letters, invoices and more. 100% free, no login required. Download as PDF instantly."
        slug=""
        faqs={[
          { q: "Is DoAide Docs really free?", a: "Yes, all document generators are 100% free with no login required." },
          { q: "Can I download documents as PDF?", a: "Yes, every document can be downloaded as PDF instantly." },
          { q: "Is my data safe?", a: "All documents are generated in your browser. No data is sent to any server." },
        ]}
      />
      <div className="page-container">
        <div className="hero">
          <div className="free-badge">✓ 100% FREE — No Login Required</div>
          <h1>Free <span>Document Generator</span> for India</h1>
          <p>
            Generate rent receipts, salary slips, experience letters, invoices and more.
            Download as PDF instantly. All processing happens in your browser — your data never leaves your device.
          </p>
        </div>

        <RecentTools />

        <div className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="doc-grid">
          {filtered.map((doc) => (
            <Link key={doc.slug} to={`/${doc.slug}`} className="doc-card">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="doc-card-icon">{doc.icon}</span>
                {doc.popular && <span className="popular-badge">Popular</span>}
              </div>
              <h3>{doc.name} Generator</h3>
              <p>{doc.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" }}>
                <span className="doc-card-tag">{doc.category}</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold, #d97706)" }}>Generate Now →</span>
              </div>
            </Link>
          ))}
        </div>

        <TrendingTools />

        <section className="explore-more" style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border, #e5e7eb)" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem", color: "var(--heading, #1f2937)" }}>You Might Also Need</h2>
          <div className="doc-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <a href="https://resume.doaide.com" className="doc-card" target="_blank" rel="noopener noreferrer">
              <span className="doc-card-icon" style={{ fontSize: "1.5rem" }}>📝</span>
              <h3>Resume Builder</h3>
              <p>Build ATS-friendly resumes with AI suggestions. Free PDF download.</p>
              <span className="doc-card-tag">Career</span>
            </a>
            <a href="https://gst.doaide.com" className="doc-card" target="_blank" rel="noopener noreferrer">
              <span className="doc-card-icon" style={{ fontSize: "1.5rem" }}>🏷️</span>
              <h3>GST Tools</h3>
              <p>GST calculator, GSTIN lookup, HSN codes, and filing due dates.</p>
              <span className="doc-card-tag">Tax</span>
            </a>
            <a href="https://contracts.doaide.com" className="doc-card" target="_blank" rel="noopener noreferrer">
              <span className="doc-card-icon" style={{ fontSize: "1.5rem" }}>📋</span>
              <h3>Contracts</h3>
              <p>Draft NDAs, service agreements, and employment contracts with AI.</p>
              <span className="doc-card-tag">Legal</span>
            </a>
            <a href="https://409a.doaide.com" className="doc-card" target="_blank" rel="noopener noreferrer">
              <span className="doc-card-icon" style={{ fontSize: "1.5rem" }}>📊</span>
              <h3>409A Valuations</h3>
              <p>Independent, defensible startup valuations with AI-assisted intake.</p>
              <span className="doc-card-tag">Finance</span>
            </a>
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold, #d97706)", textDecoration: "none" }}>
              Explore all DoAide tools &rarr;
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
