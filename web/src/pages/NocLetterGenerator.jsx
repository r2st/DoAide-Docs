import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "noc-letter-generator";

const PURPOSE_OPTIONS = [
  { value: "employment", label: "Employment" },
  { value: "education", label: "Education" },
  { value: "travel", label: "Travel" },
  { value: "vehicle", label: "Vehicle Transfer" },
  { value: "property", label: "Property" },
  { value: "other", label: "Other" },
];

function getPurposeText(purpose, customPurpose, recipientName) {
  const name = recipientName || "________";
  switch (purpose) {
    case "employment":
      return `has no objection to ${name} seeking employment or taking up a position with any other organization. ${name} has fulfilled all obligations and there are no pending dues or liabilities.`;
    case "education":
      return `has no objection to ${name} pursuing higher education at any recognized institution. ${name} is released from all current obligations and is free to enroll in any academic program of their choice.`;
    case "travel":
      return `has no objection to ${name} traveling abroad for personal or professional purposes. ${name} has fulfilled all obligations and is permitted to travel as per their plans.`;
    case "vehicle":
      return `has no objection to the transfer of the vehicle owned by ${name}. All dues related to the vehicle have been cleared and there are no pending claims or liabilities against it.`;
    case "property":
      return `has no objection to ${name} proceeding with the sale, purchase, or transfer of the property in question. There are no pending disputes, liens, or encumbrances associated with the said property.`;
    case "other":
      return `has no objection to ${name} ${customPurpose || "proceeding with the stated purpose"}. All relevant obligations have been fulfilled and there are no pending dues or liabilities.`;
    default:
      return `has no objection to ${name} proceeding with the stated purpose.`;
  }
}

const FAQS = [
  {
    q: "What is a No Objection Certificate (NOC)?",
    a: "A No Objection Certificate (NOC) is a legal document issued by an organization, institution, or individual stating that they have no objection to the details mentioned in the certificate. It is commonly used for employment, education, vehicle transfer, property transactions, and travel purposes.",
  },
  {
    q: "When is a NOC required?",
    a: "A NOC is required in various situations such as when changing jobs (from current employer), applying for higher education, transferring vehicle ownership, buying or selling property, applying for a visa or passport, or when a lender clears a loan. The specific requirements depend on the authority requesting the NOC.",
  },
  {
    q: "What are the different types of NOC?",
    a: "Common types of NOC include: Employment NOC (from employer for job change), Education NOC (from institution for further studies), Vehicle NOC (for transferring vehicle registration), Property NOC (for real estate transactions), Travel NOC (for visa or passport applications), and Loan NOC (after loan repayment completion).",
  },
  {
    q: "Is notarization required for a NOC?",
    a: "Notarization is not always mandatory for a NOC, but it adds legal validity and authenticity to the document. Some authorities and government departments may require a notarized NOC. It is advisable to get the NOC notarized if it is being used for official or legal purposes such as property registration or court proceedings.",
  },
  {
    q: "What is the validity period of a NOC?",
    a: "A NOC does not have a universal validity period. Its validity depends on the issuing authority and the purpose for which it is issued. Some NOCs are valid for 6 months to 1 year, while others may have no expiry date. It is recommended to check with the requesting authority about the acceptable validity period.",
  },
];

export default function NocLetterGenerator() {
  const [form, setForm] = useState({
    issuerName: "",
    issuerDesignation: "",
    organization: "",
    recipientName: "",
    purpose: "employment",
    customPurpose: "",
    issueDate: new Date().toISOString().split("T")[0],
    referenceNo: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const purposeLabel =
    PURPOSE_OPTIONS.find((p) => p.value === form.purpose)?.label || "General";

  const handleDownload = () => {
    createPdf({
      title: "No Objection Certificate",
      filename: `noc-letter-${form.purpose}-${form.issueDate || "undated"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just created a professional NOC (No Objection Certificate) using DoAide Docs -- completely free and no login needed. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  return (
    <>
      <SeoHead
        title="Free NOC Letter Generator Online | DoAide Docs"
        description="Generate No Objection Certificate (NOC) online for free. Create professional NOC letters for employment, education, travel, vehicle transfer, and property. Download as PDF instantly -- no login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>NOC Letter</span> Generator</h1>
          <p>Create a professional No Objection Certificate instantly. Choose the purpose, fill in the details, preview, and download as PDF. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>NOC Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Issuer Name *</label>
                <input value={form.issuerName} onChange={set("issuerName")} placeholder="Name of the person issuing NOC" />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input value={form.issuerDesignation} onChange={set("issuerDesignation")} placeholder="e.g. HR Manager" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Organization *</label>
                <input value={form.organization} onChange={set("organization")} placeholder="Company or institution name" />
              </div>
              <div className="form-group">
                <label>Recipient Name *</label>
                <input value={form.recipientName} onChange={set("recipientName")} placeholder="Person the NOC is issued to" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Purpose *</label>
                <select value={form.purpose} onChange={set("purpose")}>
                  {PURPOSE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Issue Date *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
            </div>

            {form.purpose === "other" && (
              <div className="form-group">
                <label>Custom Purpose *</label>
                <input value={form.customPurpose} onChange={set("customPurpose")} placeholder="Describe the purpose of this NOC" />
              </div>
            )}

            <div className="form-group">
              <label>Reference No</label>
              <input value={form.referenceNo} onChange={set("referenceNo")} placeholder="e.g. NOC/2024/001 (optional)" />
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem" }}>
                {form.organization || "Organization Name"}
              </p>
              <h3 className="doc-title" style={{ textAlign: "center", marginBottom: "0.5rem", textDecoration: "underline" }}>
                NO OBJECTION CERTIFICATE
              </h3>

              {form.referenceNo && (
                <div className="field-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
                  <span><span className="field-label">Ref No:</span> {form.referenceNo}</span>
                  <span><span className="field-label">Date:</span> {form.issueDate || "________"}</span>
                </div>
              )}
              {!form.referenceNo && (
                <p style={{ textAlign: "right", fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
                  <span className="field-label">Date:</span> {form.issueDate || "________"}
                </p>
              )}

              <hr />

              <p style={{ marginTop: "1rem", fontWeight: "bold" }}>To Whom It May Concern,</p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                This is to certify that <strong>{form.organization || "________"}</strong>{" "}
                {getPurposeText(form.purpose, form.customPurpose, form.recipientName)}
              </p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                This No Objection Certificate is issued upon the request of{" "}
                <strong>{form.recipientName || "________"}</strong> for the purpose of{" "}
                <strong>{form.purpose === "other" ? (form.customPurpose || "stated purpose") : purposeLabel.toLowerCase()}</strong>.
              </p>

              <div style={{ marginTop: "2.5rem" }}>
                <p style={{ marginBottom: "0.25rem" }}>Yours faithfully,</p>
                <div className="signature-line" style={{ marginTop: "2rem", borderTop: "1px solid #999", width: "200px", paddingTop: "0.25rem" }}>
                  <p style={{ fontWeight: "bold" }}>{form.issuerName || "Authorized Signatory"}</p>
                  {form.issuerDesignation && <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.issuerDesignation}</p>}
                  <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.organization || "Organization"}</p>
                </div>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn btn-primary" onClick={handleDownload}>Download PDF</button>
              <button className="btn btn-secondary" onClick={printPreview}>Print</button>
              <button className="btn btn-whatsapp" onClick={handleWhatsApp}>WhatsApp</button>
            </div>
          </div>
        </div>

        <ShareButtons text="Free document generator online — no login needed! Try it:" toolName="this generator" />

        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, form) {
  const purposeLabel =
    PURPOSE_OPTIONS.find((p) => p.value === form.purpose)?.label || "General";

  ctx.addLine(form.organization || "Organization Name", { bold: true, size: 14, align: "center" });
  ctx.addGap();
  ctx.addLine("NO OBJECTION CERTIFICATE", { bold: true, size: 16, align: "center" });
  ctx.addGap();

  if (form.referenceNo) {
    ctx.addFieldRow("Ref No:", form.referenceNo);
  }
  ctx.addFieldRow("Date:", form.issueDate || "________");
  ctx.addHr();
  ctx.addGap();

  ctx.addLine("To Whom It May Concern,", { bold: true, size: 11 });
  ctx.addGap();

  ctx.addParagraph(
    `This is to certify that ${form.organization || "________"} ${getPurposeText(form.purpose, form.customPurpose, form.recipientName)}`
  );
  ctx.addGap();

  ctx.addParagraph(
    `This No Objection Certificate is issued upon the request of ${form.recipientName || "________"} for the purpose of ${form.purpose === "other" ? (form.customPurpose || "stated purpose") : purposeLabel.toLowerCase()}.`
  );
  ctx.addGap(3);

  ctx.addLine("Yours faithfully,", { size: 11 });
  ctx.addGap(3);
  ctx.addHr();
  ctx.addLine(form.issuerName || "Authorized Signatory", { bold: true, size: 11 });
  if (form.issuerDesignation) {
    ctx.addLine(form.issuerDesignation, { size: 10 });
  }
  ctx.addLine(form.organization || "Organization", { size: 10 });
}
