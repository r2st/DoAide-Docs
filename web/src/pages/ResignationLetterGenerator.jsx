import { useState } from "react";
import SeoHead from "../components/SeoHead";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const REASONS = [
  "Better Opportunity",
  "Personal Reasons",
  "Higher Studies",
  "Relocation",
  "Health",
  "Other",
];

const SLUG = "resignation-letter-generator";

const FAQS = [
  { q: "What is the standard notice period for resignation in India?", a: "The standard notice period varies by company and is specified in your employment contract. It is typically 30, 60, or 90 days. Some companies may allow you to negotiate a shorter notice period or buy out the remaining days." },
  { q: "What is the correct format for a resignation letter?", a: "A professional resignation letter should include the date, your manager's name and designation, a clear statement of resignation, your intended last working day, a brief reason (optional), and your signature. Keep it concise, polite, and professional." },
  { q: "Can I resign with immediate effect without serving notice?", a: "Immediate resignation is possible but depends on your employment contract. Most contracts require you to serve the notice period or pay the equivalent salary in lieu of notice. In cases of harassment or unsafe working conditions, you may have legal grounds for immediate resignation." },
  { q: "Can I retract my resignation after submitting it?", a: "Yes, you can request to retract your resignation if your employer has not yet accepted it. Once accepted, retraction is at the employer's discretion. It is advisable to submit a written retraction request as early as possible." },
  { q: "Should I mention the reason for resignation in my letter?", a: "Mentioning a reason is optional but recommended. Keep it brief and professional. Avoid negative remarks about the company, colleagues, or management. Common reasons include career growth, personal reasons, or higher studies." },
  { q: "Do I need to send a hard copy of my resignation letter?", a: "While email resignation is widely accepted, some companies require a hard copy for their records. Check your company's HR policy. It is good practice to send both an email and a signed hard copy for documentation." },
];

function formatDate(dateStr) {
  if (!dateStr) return "________";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function getReasonSentence(reason) {
  switch (reason) {
    case "Better Opportunity":
      return "I have received an opportunity that aligns with my long-term career goals, and after careful consideration, I have decided to pursue it.";
    case "Personal Reasons":
      return "Due to personal reasons that require my immediate attention, I have decided to step down from my current role.";
    case "Higher Studies":
      return "I have decided to pursue higher studies to further my academic and professional development.";
    case "Relocation":
      return "Due to my upcoming relocation, I will no longer be able to continue in my current position.";
    case "Health":
      return "Due to health-related concerns that require my focused attention, I have made the difficult decision to resign from my position.";
    case "Other":
      return "After thoughtful consideration, I have decided to move on from my current role.";
    default:
      return "After thoughtful consideration, I have decided to move on from my current role.";
  }
}

export default function ResignationLetterGenerator() {
  const [form, setForm] = useState({
    employeeName: "",
    designation: "",
    department: "",
    companyName: "",
    managerName: "",
    resignationDate: "",
    lastWorkingDay: "",
    noticePeriod: "30 days",
    reason: "Better Opportunity",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Resignation Letter",
      filename: `resignation-letter-${form.employeeName || "document"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Resignation Letter\nFrom: ${form.employeeName}\nDesignation: ${form.designation}\nCompany: ${form.companyName}\nResignation Date: ${formatDate(form.resignationDate)}\nLast Working Day: ${formatDate(form.lastWorkingDay)}\n\nGenerated at docs.doaide.com`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Resignation Letter Generator Online | DoAide Docs"
        description="Generate a professional resignation letter online for free. Download as PDF with proper business letter format. No login required. Includes notice period, reason, and last working day."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Resignation Letter</span> Generator</h1>
          <p>Create a professional resignation letter in minutes. Fill in your details, preview the letter, and download as PDF. 100% free, no sign-up needed.</p>
          <span className="free-badge">{"✓"} 100% FREE -- No Login Required</span>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Letter Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Employee Name *</label>
                <input value={form.employeeName} onChange={set("employeeName")} placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Designation *</label>
                <input value={form.designation} onChange={set("designation")} placeholder="e.g. Software Engineer" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <input value={form.department} onChange={set("department")} placeholder="e.g. Engineering" />
              </div>
              <div className="form-group">
                <label>Company Name *</label>
                <input value={form.companyName} onChange={set("companyName")} placeholder="Enter company name" />
              </div>
            </div>

            <div className="form-group">
              <label>Manager / Reporting To *</label>
              <input value={form.managerName} onChange={set("managerName")} placeholder="Enter your manager's name" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Resignation Date *</label>
                <input type="date" value={form.resignationDate} onChange={set("resignationDate")} />
              </div>
              <div className="form-group">
                <label>Last Working Day *</label>
                <input type="date" value={form.lastWorkingDay} onChange={set("lastWorkingDay")} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Notice Period</label>
                <input value={form.noticePeriod} onChange={set("noticePeriod")} placeholder="e.g. 30 days" />
              </div>
              <div className="form-group">
                <label>Reason for Resignation</label>
                <select value={form.reason} onChange={set("reason")}>
                  {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p style={{ textAlign: "right", marginBottom: "1.5rem" }}>
                <strong>Date:</strong> {formatDate(form.resignationDate)}
              </p>

              <p><strong>To,</strong></p>
              <p>{form.managerName || "________"}</p>
              <p>{form.companyName || "________"}</p>
              <br />

              <p><strong>Subject: Resignation from the position of {form.designation || "________"}</strong></p>
              <br />

              <p>Dear {form.managerName || "________"},</p>
              <br />

              <p>
                I am writing to formally notify you of my resignation from the position of{" "}
                <strong>{form.designation || "________"}</strong>
                {form.department ? <> in the <strong>{form.department}</strong> department</> : null} at{" "}
                <strong>{form.companyName || "________"}</strong>, effective{" "}
                <strong>{formatDate(form.lastWorkingDay)}</strong>.
              </p>
              <br />

              <p>{getReasonSentence(form.reason)}</p>
              <br />

              <p>
                As per my employment terms, I am providing a notice period of{" "}
                <strong>{form.noticePeriod || "________"}</strong>. My last working day with the organization will be{" "}
                <strong>{formatDate(form.lastWorkingDay)}</strong>.
              </p>
              <br />

              <p>
                I am committed to ensuring a smooth transition during my notice period. I am happy to assist in
                training my replacement and completing any pending tasks or handover documentation.
              </p>
              <br />

              <p>
                I sincerely appreciate the opportunities for professional growth and development that{" "}
                <strong>{form.companyName || "________"}</strong> has provided me. I am grateful for the support
                and guidance I have received from you and the team during my tenure.
              </p>
              <br />

              <p>Thank you for your understanding. I wish the company continued success.</p>
              <br />

              <p>Yours sincerely,</p>
              <br />
              <div style={{ marginTop: "1rem" }}>
                <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", display: "inline-block" }}>
                  {form.employeeName || "Employee Signature"}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  {form.designation || "Designation"}
                  {form.department ? `, ${form.department}` : ""}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#666" }}>
                  {form.companyName || "Company Name"}
                </p>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn btn-primary" onClick={handleDownload}>Download PDF</button>
              <button className="btn btn-secondary" onClick={printPreview}>Print</button>
              <button className="btn btn-whatsapp" onClick={handleWhatsApp}>Share on WhatsApp</button>
            </div>
          </div>
        </div>

        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, form) {
  ctx.addLine("RESIGNATION LETTER", { bold: true, size: 16, align: "center" });
  ctx.addGap(2);

  ctx.addLine(`Date: ${formatDate(form.resignationDate)}`, { size: 10, align: "right" });
  ctx.addGap();

  ctx.addLine("To,", { bold: true, size: 11 });
  ctx.addLine(form.managerName || "________", { size: 11 });
  ctx.addLine(form.companyName || "________", { size: 11 });
  ctx.addGap();

  ctx.addLine(`Subject: Resignation from the position of ${form.designation || "________"}`, { bold: true, size: 11 });
  ctx.addGap();

  ctx.addParagraph(`Dear ${form.managerName || "________"},`);
  ctx.addGap();

  const deptClause = form.department ? ` in the ${form.department} department` : "";
  ctx.addParagraph(
    `I am writing to formally notify you of my resignation from the position of ${form.designation || "________"}${deptClause} at ${form.companyName || "________"}, effective ${formatDate(form.lastWorkingDay)}.`
  );
  ctx.addGap();

  ctx.addParagraph(getReasonSentence(form.reason));
  ctx.addGap();

  ctx.addParagraph(
    `As per my employment terms, I am providing a notice period of ${form.noticePeriod || "________"}. My last working day with the organization will be ${formatDate(form.lastWorkingDay)}.`
  );
  ctx.addGap();

  ctx.addParagraph(
    "I am committed to ensuring a smooth transition during my notice period. I am happy to assist in training my replacement and completing any pending tasks or handover documentation."
  );
  ctx.addGap();

  ctx.addParagraph(
    `I sincerely appreciate the opportunities for professional growth and development that ${form.companyName || "________"} has provided me. I am grateful for the support and guidance I have received from you and the team during my tenure.`
  );
  ctx.addGap();

  ctx.addParagraph("Thank you for your understanding. I wish the company continued success.");
  ctx.addGap();

  ctx.addParagraph("Yours sincerely,");
  ctx.addGap(2);
  ctx.addHr();
  ctx.addLine(form.employeeName || "Employee Signature", { bold: true, size: 11 });
  ctx.addLine(`${form.designation || "Designation"}${form.department ? `, ${form.department}` : ""}`, { size: 10, color: [100, 100, 100] });
  ctx.addLine(form.companyName || "Company Name", { size: 10, color: [100, 100, 100] });
}
