import { useState } from "react";
import SeoHead from "../components/SeoHead";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "rental-agreement-generator";

const FAQS = [
  { q: "Why are rental agreements typically made for 11 months?", a: "In India, agreements for 12 months or more must be registered under the Registration Act, 1908, which involves stamp duty and registration fees. An 11-month agreement avoids mandatory registration while remaining legally valid." },
  { q: "Is stamp duty required for an 11-month rental agreement?", a: "While registration is not mandatory for agreements under 12 months, stamp duty requirements vary by state. Most states require nominal stamp paper (Rs 100-500) for such agreements." },
  { q: "Can a rental agreement be renewed?", a: "Yes, an 11-month agreement can be renewed by mutual consent of both parties. A fresh agreement or an addendum can be executed for the renewal period." },
  { q: "What clauses should a rental agreement include?", a: "A comprehensive rental agreement should include rent amount, security deposit, tenure, notice period, maintenance responsibilities, restrictions on subletting, and termination conditions." },
  { q: "Is a notarised rental agreement legally valid?", a: "A notarised agreement is legally valid but carries less evidentiary weight than a registered agreement. For high-value properties, registration is recommended." },
];

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export default function RentalAgreementGenerator() {
  const [form, setForm] = useState({
    landlordName: "",
    landlordAddress: "",
    tenantName: "",
    tenantAddress: "",
    propertyAddress: "",
    monthlyRent: "",
    securityDeposit: "",
    agreementDate: todayStr(),
    tenureDays: "330",
    noticePeriod: "1",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const endDate = () => {
    if (!form.agreementDate) return "___";
    const d = new Date(form.agreementDate);
    d.setDate(d.getDate() + parseInt(form.tenureDays || 330, 10));
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  const fmtDate = (iso) => {
    if (!iso) return "___";
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  const handleDownload = () => {
    createPdf({
      title: "Rental Agreement",
      filename: "rental-agreement.pdf",
      renderFn: (ctx) => renderPdf(ctx, form, endDate(), fmtDate),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Rental Agreement\nLandlord: ${form.landlordName}\nTenant: ${form.tenantName}\nProperty: ${form.propertyAddress}\nRent: Rs ${form.monthlyRent}/month\nDeposit: Rs ${form.securityDeposit}\nTenure: ${form.tenureDays} days\n\nGenerated at docs.doaide.com`
    );
  };

  const clauses = [
    `The Landlord hereby lets out and the Tenant hereby takes on rent the premises located at "${form.propertyAddress || "________"}" (hereinafter referred to as "the premises") for a period of ${form.tenureDays || "330"} days commencing from ${fmtDate(form.agreementDate)} and ending on ${endDate()}.`,
    `The Tenant shall pay a monthly rent of Rs ${form.monthlyRent || "____"} (Rupees ${form.monthlyRent || "____"} Only) on or before the 5th of each calendar month.`,
    `The Tenant has paid a security deposit of Rs ${form.securityDeposit || "____"} (Rupees ${form.securityDeposit || "____"} Only) which shall be refunded without interest at the time of vacating the premises, after adjusting for any damages or unpaid dues.`,
    `Either party may terminate this agreement by giving ${form.noticePeriod || "1"} month(s) written notice to the other party.`,
    "The Tenant shall use the premises solely for residential purposes and shall not sublet, assign, or transfer the premises or any part thereof.",
    "The Tenant shall maintain the premises in good condition and shall be responsible for minor repairs. Major structural repairs shall be the responsibility of the Landlord.",
    "The Tenant shall not make any structural alterations or additions to the premises without prior written consent of the Landlord.",
    "The Landlord or their authorised representative shall have the right to inspect the premises at reasonable hours after giving prior notice.",
  ];

  return (
    <>
      <SeoHead
        title="Free Rental Agreement Generator Online | DoAide Docs"
        description="Generate 11-month rental agreement online for free. Includes all legal clauses, landlord-tenant details, and security deposit terms. Download as PDF."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Rental Agreement</span> Generator</h1>
          <p>Create a legally formatted 11-month rental agreement with all essential clauses. Fill in details, preview, and download as PDF.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Agreement Details</h2>

            <h3 style={{ fontSize: "0.95rem", margin: "0.5rem 0" }}>Landlord Details</h3>
            <div className="form-group">
              <label>Landlord Name *</label>
              <input value={form.landlordName} onChange={set("landlordName")} placeholder="Full legal name" />
            </div>
            <div className="form-group">
              <label>Landlord Address</label>
              <input value={form.landlordAddress} onChange={set("landlordAddress")} placeholder="Permanent address" />
            </div>

            <h3 style={{ fontSize: "0.95rem", margin: "0.5rem 0" }}>Tenant Details</h3>
            <div className="form-group">
              <label>Tenant Name *</label>
              <input value={form.tenantName} onChange={set("tenantName")} placeholder="Full legal name" />
            </div>
            <div className="form-group">
              <label>Tenant Address</label>
              <input value={form.tenantAddress} onChange={set("tenantAddress")} placeholder="Permanent address" />
            </div>

            <h3 style={{ fontSize: "0.95rem", margin: "0.5rem 0" }}>Property & Terms</h3>
            <div className="form-group">
              <label>Property Address *</label>
              <input value={form.propertyAddress} onChange={set("propertyAddress")} placeholder="Full address of the rental property" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Monthly Rent (Rs) *</label>
                <input type="number" value={form.monthlyRent} onChange={set("monthlyRent")} placeholder="e.g. 15000" />
              </div>
              <div className="form-group">
                <label>Security Deposit (Rs) *</label>
                <input type="number" value={form.securityDeposit} onChange={set("securityDeposit")} placeholder="e.g. 50000" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Agreement Date</label>
                <input type="date" value={form.agreementDate} onChange={set("agreementDate")} />
              </div>
              <div className="form-group">
                <label>Tenure (Days)</label>
                <input type="number" value={form.tenureDays} onChange={set("tenureDays")} placeholder="330" />
              </div>
            </div>

            <div className="form-group">
              <label>Notice Period (Months)</label>
              <input type="number" value={form.noticePeriod} onChange={set("noticePeriod")} placeholder="1" />
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>RENTAL AGREEMENT</h3>
              <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#666" }}>
                Date: {fmtDate(form.agreementDate)}
              </p>
              <hr />

              <p style={{ marginTop: "1rem" }}>
                This Rental Agreement is entered into between <strong>{form.landlordName || "________"}</strong>,
                residing at {form.landlordAddress || "________"} (hereinafter referred to as the "Landlord") and{" "}
                <strong>{form.tenantName || "________"}</strong>, residing at {form.tenantAddress || "________"}{" "}
                (hereinafter referred to as the "Tenant").
              </p>

              <h4 style={{ marginTop: "1rem" }}>Terms and Conditions</h4>
              <ol style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                {clauses.map((c, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>{c}</li>
                ))}
              </ol>

              <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                IN WITNESS WHEREOF, the parties have signed this agreement on {fmtDate(form.agreementDate)}.
              </p>

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>
                    {form.landlordName || "Landlord Signature"}
                  </p>
                </div>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>
                    {form.tenantName || "Tenant Signature"}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>Witness 1</p>
                </div>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>Witness 2</p>
                </div>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-primary" onClick={handleDownload}>Download PDF</button>
              <button className="btn-secondary" onClick={printPreview}>Print</button>
              <button className="btn-whatsapp" onClick={handleWhatsApp}>WhatsApp</button>
            </div>
          </div>
        </div>

        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, form, endDateStr, fmtDate) {
  ctx.addLine("RENTAL AGREEMENT", { bold: true, size: 16, align: "center" });
  ctx.addGap();
  ctx.addLine(`Date: ${fmtDate(form.agreementDate)}`, { size: 10, align: "right" });
  ctx.addHr();
  ctx.addGap();

  ctx.addParagraph(
    `This Rental Agreement is entered into between ${form.landlordName || "________"}, residing at ${form.landlordAddress || "________"} (hereinafter referred to as the "Landlord") and ${form.tenantName || "________"}, residing at ${form.tenantAddress || "________"} (hereinafter referred to as the "Tenant").`
  );
  ctx.addGap();

  ctx.addLine("Terms and Conditions", { bold: true, size: 12 });
  ctx.addGap();

  const clauses = [
    `The Landlord hereby lets out and the Tenant hereby takes on rent the premises located at "${form.propertyAddress || "________"}" for a period of ${form.tenureDays || "330"} days commencing from ${fmtDate(form.agreementDate)} and ending on ${endDateStr}.`,
    `The Tenant shall pay a monthly rent of Rs ${form.monthlyRent || "____"} on or before the 5th of each calendar month.`,
    `The Tenant has paid a security deposit of Rs ${form.securityDeposit || "____"} which shall be refunded without interest at the time of vacating the premises, after adjusting for any damages or unpaid dues.`,
    `Either party may terminate this agreement by giving ${form.noticePeriod || "1"} month(s) written notice to the other party.`,
    "The Tenant shall use the premises solely for residential purposes and shall not sublet, assign, or transfer the premises.",
    "The Tenant shall maintain the premises in good condition and shall be responsible for minor repairs. Major structural repairs shall be the responsibility of the Landlord.",
    "The Tenant shall not make any structural alterations without prior written consent of the Landlord.",
    "The Landlord or their authorised representative shall have the right to inspect the premises at reasonable hours after giving prior notice.",
  ];

  clauses.forEach((c, i) => {
    ctx.addParagraph(`${i + 1}. ${c}`);
    ctx.addGap(0.5);
  });

  ctx.addGap();
  ctx.addParagraph(`IN WITNESS WHEREOF, the parties have signed this agreement on ${fmtDate(form.agreementDate)}.`);
  ctx.addGap(3);
  ctx.addHr();

  const halfW = ctx.contentWidth / 2;
  ctx.addTableRow([form.landlordName || "Landlord", form.tenantName || "Tenant"], [halfW, halfW]);
  ctx.addTableRow(["(Landlord)", "(Tenant)"], [halfW, halfW]);
  ctx.addGap(2);
  ctx.addTableRow(["Witness 1: _______________", "Witness 2: _______________"], [halfW, halfW]);
}
