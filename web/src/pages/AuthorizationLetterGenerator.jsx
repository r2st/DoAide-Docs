import { useState } from "react";
import SeoHead from "../components/SeoHead";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const PURPOSE_OPTIONS = [
  "Bank Transaction",
  "Document Collection",
  "Vehicle Registration",
  "Property",
  "Passport",
  "Other",
];

const SLUG = "authorization-letter-generator";

const FAQS = [
  {
    q: "What is the difference between an Authorization Letter and a Power of Attorney?",
    a: "An Authorization Letter is a simple document that grants limited, specific permission to another person for a particular task. A Power of Attorney (PoA) is a legal instrument that grants broader authority and is typically notarized. Authorization letters are suitable for one-time tasks like collecting documents or performing a bank transaction, while a PoA is used for ongoing or complex legal matters.",
  },
  {
    q: "How long is an authorization letter valid?",
    a: "An authorization letter is valid for the period specified in the letter. If no validity dates are mentioned, it is generally considered valid for a single use or a reasonable period. It is best practice to include explicit 'Valid From' and 'Valid Until' dates to avoid ambiguity.",
  },
  {
    q: "Does an authorization letter need to be notarized?",
    a: "In most cases, a simple authorization letter does not need to be notarized. However, some institutions such as banks, government offices, or property registrars may require notarization for added legal validity. Check with the concerned authority before submitting.",
  },
  {
    q: "What is the correct format for an authorization letter?",
    a: "A proper authorization letter should include the date, recipient (or 'To Whom It May Concern'), the authorizer's full name and address, the authorized person's name and details, the specific task being authorized, validity period, ID proof reference, and the authorizer's signature.",
  },
  {
    q: "Can I authorize someone for bank transactions using this letter?",
    a: "Yes, you can authorize someone to perform specific bank transactions on your behalf using this letter. However, banks may have their own authorization forms. It is advisable to check with your bank whether they accept a general authorization letter or require their specific format.",
  },
  {
    q: "Can an authorization letter be revoked?",
    a: "Yes, an authorization letter can be revoked at any time by the person who issued it. To revoke, you should notify the authorized person and the institution in writing that the authorization is no longer valid.",
  },
];

export default function AuthorizationLetterGenerator() {
  const [form, setForm] = useState({
    authorizerName: "",
    authorizerAddress: "",
    authorizedPerson: "",
    authorizedPersonAddress: "",
    purpose: "Bank Transaction",
    specificTask: "",
    validFrom: "",
    validUntil: "",
    idProof: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleDownload = () => {
    createPdf({
      title: "Authorization Letter",
      filename: `authorization-letter-${form.purpose.toLowerCase().replace(/\s+/g, "-")}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form, formattedDate),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Authorization Letter\nFrom: ${form.authorizerName}\nTo: ${form.authorizedPerson}\nPurpose: ${form.purpose}\nTask: ${form.specificTask}\nValid: ${form.validFrom || "N/A"} to ${form.validUntil || "N/A"}\n\nGenerated at docs.doaide.com`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Authorization Letter Generator Online | DoAide Docs"
        description="Generate authorization letters online for free. Authorize someone for bank transactions, document collection, vehicle registration, property matters, and more. Download as PDF instantly. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Authorization Letter</span> Generator</h1>
          <p>
            Create a professional authorization letter in seconds. Fill in the details, preview the letter, and download as PDF. Perfect for bank work, document collection, vehicle registration, and more.
          </p>
          <span className="free-badge">&#10003; 100% FREE -- No Login Required</span>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Letter Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Authorizer Name *</label>
                <input
                  value={form.authorizerName}
                  onChange={set("authorizerName")}
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label>Authorized Person Name *</label>
                <input
                  value={form.authorizedPerson}
                  onChange={set("authorizedPerson")}
                  placeholder="Person being authorized"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Authorizer Address</label>
                <input
                  value={form.authorizerAddress}
                  onChange={set("authorizerAddress")}
                  placeholder="Your address"
                />
              </div>
              <div className="form-group">
                <label>Authorized Person Address</label>
                <input
                  value={form.authorizedPersonAddress}
                  onChange={set("authorizedPersonAddress")}
                  placeholder="Authorized person's address"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Purpose *</label>
                <select value={form.purpose} onChange={set("purpose")}>
                  {PURPOSE_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>ID Proof Reference</label>
                <input
                  value={form.idProof}
                  onChange={set("idProof")}
                  placeholder="e.g. Aadhaar / PAN / Passport No."
                />
              </div>
            </div>

            <div className="form-group">
              <label>Specific Task / Details *</label>
              <textarea
                value={form.specificTask}
                onChange={set("specificTask")}
                placeholder="Describe the specific task being authorized (e.g., collect my passport from the passport office, withdraw Rs 50,000 from my savings account)"
                rows={3}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Valid From</label>
                <input
                  type="date"
                  value={form.validFrom}
                  onChange={set("validFrom")}
                />
              </div>
              <div className="form-group">
                <label>Valid Until</label>
                <input
                  type="date"
                  value={form.validUntil}
                  onChange={set("validUntil")}
                />
              </div>
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <h3 style={{ textAlign: "center", marginBottom: "0.25rem" }}>AUTHORIZATION LETTER</h3>
              <hr />

              <p style={{ marginTop: "1rem", textAlign: "right" }}>
                <strong>Date:</strong> {formattedDate}
              </p>

              {form.authorizerAddress && (
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>From:</strong><br />
                  {form.authorizerName || "________"}<br />
                  {form.authorizerAddress}
                </p>
              )}

              <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                <strong>To Whom It May Concern,</strong>
              </p>

              <p>
                I, <strong>{form.authorizerName || "________"}</strong>
                {form.authorizerAddress ? `, residing at ${form.authorizerAddress}` : ""}
                , hereby authorize <strong>{form.authorizedPerson || "________"}</strong>
                {form.authorizedPersonAddress ? `, residing at ${form.authorizedPersonAddress}` : ""}
                {" "}to act on my behalf for the purpose of <strong>{form.purpose}</strong>.
              </p>

              {form.specificTask && (
                <p style={{ marginTop: "0.75rem" }}>
                  <strong>Specific Task:</strong> {form.specificTask}
                </p>
              )}

              {(form.validFrom || form.validUntil) && (
                <p style={{ marginTop: "0.75rem" }}>
                  <strong>Validity:</strong>{" "}
                  {form.validFrom ? `From ${new Date(form.validFrom).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}` : ""}
                  {form.validFrom && form.validUntil ? " " : ""}
                  {form.validUntil ? `Until ${new Date(form.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}` : ""}
                </p>
              )}

              {form.idProof && (
                <p style={{ marginTop: "0.75rem" }}>
                  The authorized person may be identified by their ID proof: <strong>{form.idProof}</strong>.
                </p>
              )}

              <p style={{ marginTop: "0.75rem" }}>
                Please allow <strong>{form.authorizedPerson || "________"}</strong> to carry out the above-mentioned task on my behalf. I take full responsibility for their actions performed under this authorization.
              </p>

              <p style={{ marginTop: "1rem" }}>Thanking you,</p>

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>
                    {form.authorizerName || "Authorizer Signature"}
                  </p>
                </div>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>
                    {form.authorizedPerson || "Authorized Person Signature"}
                  </p>
                </div>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-primary" onClick={handleDownload}>Download PDF</button>
              <button className="btn-secondary" onClick={printPreview}>Print</button>
              <button className="btn-whatsapp" onClick={handleWhatsApp}>Share on WhatsApp</button>
            </div>
          </div>
        </div>

        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, form, formattedDate) {
  ctx.addLine("AUTHORIZATION LETTER", { bold: true, size: 16, align: "center" });
  ctx.addGap();
  ctx.addHr();
  ctx.addGap();

  ctx.addLine(`Date: ${formattedDate}`, { size: 10, align: "right" });
  ctx.addGap();

  if (form.authorizerAddress) {
    ctx.addLine("From:", { bold: true, size: 10 });
    ctx.addLine(form.authorizerName || "________", { size: 10 });
    ctx.addLine(form.authorizerAddress, { size: 10 });
    ctx.addGap();
  }

  ctx.addLine("To Whom It May Concern,", { bold: true, size: 11 });
  ctx.addGap();

  let body = `I, ${form.authorizerName || "________"}`;
  if (form.authorizerAddress) body += `, residing at ${form.authorizerAddress}`;
  body += `, hereby authorize ${form.authorizedPerson || "________"}`;
  if (form.authorizedPersonAddress) body += `, residing at ${form.authorizedPersonAddress}`;
  body += ` to act on my behalf for the purpose of ${form.purpose}.`;
  ctx.addParagraph(body);
  ctx.addGap();

  if (form.specificTask) {
    ctx.addFieldRow("Specific Task:", form.specificTask);
    ctx.addGap();
  }

  if (form.validFrom || form.validUntil) {
    let validity = "";
    if (form.validFrom) validity += `From ${new Date(form.validFrom).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`;
    if (form.validFrom && form.validUntil) validity += " ";
    if (form.validUntil) validity += `Until ${new Date(form.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`;
    ctx.addFieldRow("Validity:", validity);
    ctx.addGap();
  }

  if (form.idProof) {
    ctx.addFieldRow("ID Proof Reference:", form.idProof);
    ctx.addGap();
  }

  ctx.addParagraph(
    `Please allow ${form.authorizedPerson || "________"} to carry out the above-mentioned task on my behalf. I take full responsibility for their actions performed under this authorization.`
  );
  ctx.addGap();

  ctx.addLine("Thanking you,", { size: 10 });
  ctx.addGap(3);
  ctx.addHr();
  ctx.addGap();

  const halfW = ctx.contentWidth / 2;
  ctx.addTableRow(
    [form.authorizerName || "Authorizer Signature", form.authorizedPerson || "Authorized Person Signature"],
    [halfW, halfW]
  );
  ctx.addTableRow(["(Authorizer)", "(Authorized Person)"], [halfW, halfW]);
}
