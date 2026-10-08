import { useEffect } from "react";
import { Link } from "react-router-dom";

const Check = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
);
const Cross = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M6 6l12 12" /></svg>
);
const Partial = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12H4" /></svg>
);

const ROWS = [
  { feature: "100% Free (no paywall)", doaide: "check", canva: "cross" },
  { feature: "No Login Required", doaide: "check", canva: "cross" },
  { feature: "India-Specific Legal Formats", doaide: "check", canva: "cross" },
  { feature: "Instant PDF Download", doaide: "check", canva: "partial" },
  { feature: "Client-Side Processing", doaide: "check", canva: "cross" },
  { feature: "GST-Compliant Invoices", doaide: "check", canva: "cross" },
  { feature: "Rent Receipt for HRA", doaide: "check", canva: "cross" },
  { feature: "Power of Attorney Drafts", doaide: "check", canva: "cross" },
  { feature: "No Data Stored on Servers", doaide: "check", canva: "cross" },
  { feature: "Large Template Library", doaide: "cross", canva: "check" },
  { feature: "Visual Design Tools", doaide: "cross", canva: "check" },
  { feature: "Image/Graphic Editing", doaide: "cross", canva: "check" },
];

const icon = (t) => t === "check" ? <Check /> : t === "cross" ? <Cross /> : <Partial />;

export default function VsCanvaTemplates() {
  useEffect(() => {
    document.title = "DoAide Docs vs Canva Templates 2026: Which Is Better for Indian Documents?";
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", color: "#E5E7EB", padding: "4rem 1rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(1.75rem, 5vw, 2.8rem)", fontWeight: 400, lineHeight: 1.2, marginBottom: "1rem" }}>
            DoAide Docs vs Canva Templates 2026
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#9CA3AF", maxWidth: "640px", margin: "0 auto", lineHeight: 1.7 }}>
            Canva is great for social media graphics, but is it the right tool for Indian legal and business documents? Here is an honest comparison to help you decide.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#E5E7EB", marginBottom: "1.5rem", textAlign: "center" }}>Quick Comparison</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#1A1A1D", borderRadius: "12px", overflow: "hidden" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2A2A2D" }}>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#E5E7EB" }}>Feature</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 600, color: "#F0B429" }}>DoAide Docs</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 600, color: "#9CA3AF" }}>Canva</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #2A2A2D", background: i % 2 === 0 ? "#1A1A1D" : "#111113" }}>
                  <td style={{ padding: "0.75rem 1rem", color: "#E5E7EB", fontSize: "0.9rem" }}>{row.feature}</td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}><span style={{ display: "inline-flex", justifyContent: "center" }}>{icon(row.doaide)}</span></td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}><span style={{ display: "inline-flex", justifyContent: "center" }}>{icon(row.canva)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#6B7280", textAlign: "center", marginTop: "0.75rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Check /> Yes</span>
          {" · "}
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Partial /> Limited / Paid</span>
          {" · "}
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Cross /> No</span>
        </p>
      </section>

      {/* Detailed Sections */}
      <article style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem 4rem" }}>

        <Section num="1" title="Pricing">
          <Grid
            left={{ label: "DoAide Docs", text: "100% free — every document type, every download, every feature. No hidden plans, no credit card, no login." }}
            right={{ label: "Canva", text: "Free tier exists but best templates require Canva Pro at ₹500/month or ₹4,000/year. Many business document templates are premium-only." }}
          />
          <p style={prose}>
            For Indian professionals and small businesses generating rent receipts, salary slips, or invoices regularly, the cost adds up quickly with Canva Pro. DoAide is built to be free forever with no strings attached.
          </p>
        </Section>

        <Section num="2" title="India-Specific Document Formats">
          <Grid
            left={{ label: "DoAide Docs", text: "Purpose-built for Indian documents — rent receipts with HRA fields, GST invoices with GSTIN, salary slips with PF/ESI, experience letters matching Indian HR conventions." }}
            right={{ label: "Canva", text: "Generic global templates. No India-specific fields for HRA, PF, GSTIN, or stamp paper formats. You would need to manually add these fields." }}
          />
          <p style={prose}>
            Indian business documents have unique requirements. Rent receipts need a revenue stamp and landlord PAN for HRA claims. Salary slips need PF, ESI, and professional tax breakdowns. Canva's generic templates do not include these fields — you would spend more time customizing a template than filling out a purpose-built form.
          </p>
        </Section>

        <Section num="3" title="Privacy &amp; Data Security">
          <Grid
            left={{ label: "DoAide Docs", text: "All processing happens client-side in your browser. Your data never leaves your device. No account, no cloud, no tracking." }}
            right={{ label: "Canva", text: "Requires an account. Your designs are stored on Canva's servers. Data is processed and stored in the cloud." }}
          />
          <p style={prose}>
            Business documents contain sensitive information — employee salaries, landlord PANs, company financials. DoAide processes everything locally using JavaScript in your browser. Your salary data, tax details, and personal information never touch a server.
          </p>
        </Section>

        <Section num="4" title="PDF Quality &amp; Speed">
          <Grid
            left={{ label: "DoAide Docs", text: "Instant PDF generation with one click. Clean, print-ready output. No watermarks on any document." }}
            right={{ label: "Canva", text: "PDF export available but free tier adds Canva branding. Some export options (like print-ready PDF) require Pro." }}
          />
          <p style={prose}>
            When you need to generate 12 monthly rent receipts or a batch of salary slips, speed matters. DoAide generates PDFs instantly in your browser — no upload, no processing delay, no watermarks.
          </p>
        </Section>

        <Section num="5" title="Legal Compliance">
          <Grid
            left={{ label: "DoAide Docs", text: "Documents follow standard Indian legal formats — power of attorney, affidavits, NOC letters, rental agreements with correct clauses for Indian law." }}
            right={{ label: "Canva", text: "No legal document templates for India. Canva is a design tool, not a document generator — it does not include legally relevant clauses or formats." }}
          />
          <p style={prose}>
            Canva excels at visual design but was never built for legal documents. An 11-month rental agreement needs specific clauses about rent escalation, security deposit, and lock-in period as per Indian property law. DoAide includes these by default.
          </p>
        </Section>

        <Section num="6" title="When to Use Each Tool">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "rgba(240,180,41,0.08)", border: "1px solid rgba(240,180,41,0.2)", borderRadius: "8px", padding: "1.25rem" }}>
              <h4 style={{ fontWeight: 600, color: "#F0B429", marginBottom: "0.5rem" }}>Use DoAide Docs when you need:</h4>
              <ul style={{ color: "#E5E7EB", fontSize: "0.9rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
                <li>Rent receipts for HRA claims</li>
                <li>GST invoices with GSTIN</li>
                <li>Salary slips with Indian tax components</li>
                <li>Legal documents (POA, NOC, affidavits)</li>
                <li>HR letters (experience, relieving, offer)</li>
              </ul>
            </div>
            <div style={{ background: "#1A1A1D", border: "1px solid #2A2A2D", borderRadius: "8px", padding: "1.25rem" }}>
              <h4 style={{ fontWeight: 600, color: "#9CA3AF", marginBottom: "0.5rem" }}>Use Canva when you need:</h4>
              <ul style={{ color: "#9CA3AF", fontSize: "0.9rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
                <li>Social media graphics</li>
                <li>Marketing presentations</li>
                <li>Visual posters and flyers</li>
                <li>Brand design elements</li>
                <li>Photo editing and collages</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Verdict */}
        <section style={{ marginTop: "2.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#E5E7EB", marginBottom: "1rem" }}>The Verdict</h2>
          <div style={{ background: "rgba(240,180,41,0.08)", borderLeft: "4px solid #F0B429", padding: "1.5rem", borderRadius: "0 8px 8px 0" }}>
            <p style={{ color: "#E5E7EB", lineHeight: 1.7, marginBottom: "1rem" }}>
              <strong>DoAide Docs is the better choice</strong> if you need Indian business and legal documents — rent receipts, salary slips, invoices, HR letters, or legal formats. It is free, private, and purpose-built for these use cases.
            </p>
            <p style={{ color: "#E5E7EB", lineHeight: 1.7, marginBottom: "1rem" }}>
              <strong>Canva is the better choice</strong> if you need visual design — social media posts, presentations, posters, or marketing materials. It is a powerful design tool, but not a document generator.
            </p>
            <p style={{ color: "#E5E7EB", lineHeight: 1.7 }}>
              They solve different problems. For Indian professionals who need both, using DoAide Docs for documents and Canva for design is the optimal combination.
            </p>
          </div>
        </section>
      </article>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "4rem 1rem", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.75rem", fontWeight: 400, color: "#E5E7EB", marginBottom: "1rem" }}>
            Generate Indian Documents — Free, Instant, Private
          </h2>
          <p style={{ color: "#9CA3AF", marginBottom: "2rem", lineHeight: 1.7 }}>
            No signup, no paywall, no data stored. Generate rent receipts, salary slips, invoices, and 14 more document types in seconds.
          </p>
          <Link
            to="/"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.85rem 2rem", background: "#F0B429", color: "#0A0A0B", fontWeight: 700, fontSize: "1rem", borderRadius: "10px", textDecoration: "none", transition: "background 150ms" }}
          >
            Start Generating Documents
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

const prose = { color: "#9CA3AF", lineHeight: 1.7, marginTop: "1rem", fontSize: "0.95rem" };

function Section({ num, title, children }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#E5E7EB", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.5rem", color: "#F0B429" }}>{num}.</span> {title}
      </h3>
      {children}
    </section>
  );
}

function Grid({ left, right }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
      <div style={{ background: "rgba(240,180,41,0.08)", border: "1px solid rgba(240,180,41,0.2)", borderRadius: "8px", padding: "1rem" }}>
        <h4 style={{ fontWeight: 600, color: "#F0B429", marginBottom: "0.5rem", fontSize: "0.9rem" }}>{left.label}</h4>
        <p style={{ color: "#E5E7EB", fontSize: "0.85rem", lineHeight: 1.6 }}>{left.text}</p>
      </div>
      <div style={{ background: "#1A1A1D", border: "1px solid #2A2A2D", borderRadius: "8px", padding: "1rem" }}>
        <h4 style={{ fontWeight: 600, color: "#9CA3AF", marginBottom: "0.5rem", fontSize: "0.9rem" }}>{right.label}</h4>
        <p style={{ color: "#6B7280", fontSize: "0.85rem", lineHeight: 1.6 }}>{right.text}</p>
      </div>
    </div>
  );
}
