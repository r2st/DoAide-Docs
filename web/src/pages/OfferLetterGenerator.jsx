import { useState } from "react";
import SeoHead from "../components/SeoHead";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "offer-letter-generator";

const FAQS = [
  { q: "What is the difference between an offer letter and an appointment letter?", a: "An offer letter is issued before joining and outlines the proposed role, salary, and joining date. An appointment letter is issued after the candidate joins and serves as a formal confirmation of employment with detailed terms and conditions." },
  { q: "How long does a candidate have to accept an offer letter?", a: "Typically, companies give candidates 7 to 15 days to accept or decline an offer letter. The exact acceptance period should be mentioned in the offer letter itself. If no deadline is specified, it is best to respond within a week." },
  { q: "Can a company withdraw an offer letter after issuing it?", a: "Yes, a company can withdraw an offer letter before the candidate accepts it, though this is considered unprofessional. Once accepted, withdrawing the offer may have legal implications depending on the jurisdiction and whether the candidate has acted on the offer (e.g., resigned from a previous job)." },
  { q: "Is an offer letter legally binding?", a: "An offer letter is generally not a legally binding contract in most jurisdictions. However, if the candidate accepts the offer and acts upon it (such as resigning from their current job), the company may face legal consequences for revoking the offer. The binding nature depends on local employment laws." },
  { q: "What should a candidate check in an offer letter before accepting?", a: "Candidates should verify the job title, department, CTC/salary breakdown, joining date, reporting manager, work location, probation period, notice period, benefits, and any conditions of employment. It is also important to check if the offer is contingent on background verification or medical fitness." },
];

export default function OfferLetterGenerator() {
  const [form, setForm] = useState({
    candidateName: "",
    designation: "",
    department: "",
    companyName: "",
    companyAddress: "",
    ctc: "",
    joiningDate: "",
    reportingManager: "",
    issueDate: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Offer Letter",
      filename: `offer-letter-${form.candidateName || "document"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! Check out this free Offer Letter Generator on DoAide Docs. You can create a professional offer letter in minutes and download it as a PDF -- no sign-up needed!\n\nhttps://docs.doaide.com/offer-letter-generator`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Offer Letter Generator Online | DoAide Docs"
        description="Generate professional offer letters online for free. Customize candidate details, designation, CTC, and joining date. Download as PDF instantly. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Offer Letter</span> Generator</h1>
          <p>Create professional offer letters instantly. Fill in the details, preview the letter, and download as PDF. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Offer Letter Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Candidate Name *</label>
                <input value={form.candidateName} onChange={set("candidateName")} placeholder="Enter candidate's full name" />
              </div>
              <div className="form-group">
                <label>Designation *</label>
                <input value={form.designation} onChange={set("designation")} placeholder="e.g. Software Engineer" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department *</label>
                <input value={form.department} onChange={set("department")} placeholder="e.g. Engineering" />
              </div>
              <div className="form-group">
                <label>CTC (Annual) *</label>
                <input value={form.ctc} onChange={set("ctc")} placeholder="e.g. 12,00,000" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Joining Date *</label>
                <input type="date" value={form.joiningDate} onChange={set("joiningDate")} />
              </div>
              <div className="form-group">
                <label>Reporting Manager</label>
                <input value={form.reportingManager} onChange={set("reportingManager")} placeholder="Manager's full name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Company Name *</label>
                <input value={form.companyName} onChange={set("companyName")} placeholder="Enter company name" />
              </div>
              <div className="form-group">
                <label>Issue Date *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
            </div>

            <div className="form-group">
              <label>Company Address</label>
              <input value={form.companyAddress} onChange={set("companyAddress")} placeholder="Enter company address" />
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                {form.companyName || "Company Name"}
              </p>
              {form.companyAddress && (
                <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#666", marginBottom: "0.5rem" }}>
                  {form.companyAddress}
                </p>
              )}
              <h3 className="doc-title" style={{ textAlign: "center", marginBottom: "1rem" }}>OFFER LETTER</h3>
              <hr />

              <p style={{ marginTop: "1rem" }}>
                <strong>Date:</strong> {form.issueDate || "________"}
              </p>

              <p style={{ marginTop: "1rem" }}>
                Dear <strong>{form.candidateName || "________"}</strong>,
              </p>

              <p style={{ marginTop: "0.75rem" }}>
                We are pleased to offer you the position of <strong>{form.designation || "________"}</strong> in
                the <strong>{form.department || "________"}</strong> department
                at <strong>{form.companyName || "________"}</strong>.
              </p>

              <p style={{ marginTop: "0.75rem" }}>
                Your annual Cost to Company (CTC) will be <strong>{form.ctc ? `Rs ${form.ctc}` : "________"}</strong>.
                Your expected date of joining is <strong>{form.joiningDate || "________"}</strong>.
                {form.reportingManager && (
                  <> You will be reporting to <strong>{form.reportingManager}</strong>.</>
                )}
              </p>

              <p style={{ marginTop: "0.75rem" }}>
                Please confirm your acceptance of this offer by signing and returning a copy of this letter.
                We look forward to welcoming you to the team.
              </p>

              <p style={{ marginTop: "1.5rem" }}>Congratulations and welcome aboard!</p>

              <div style={{ marginTop: "2rem" }}>
                <p>Yours sincerely,</p>
                <div className="signature-line" style={{ borderTop: "1px solid #999", width: "200px", marginTop: "2rem", paddingTop: "0.25rem" }}>
                  Authorized Signatory
                </div>
                <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.companyName || "Company Name"}</p>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn btn-primary" onClick={handleDownload}>Download PDF</button>
              <button className="btn btn-secondary" onClick={printPreview}>Print</button>
              <button className="btn btn-whatsapp" onClick={handleWhatsApp}>WhatsApp</button>
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
  ctx.addLine(form.companyName || "Company Name", { bold: true, size: 16, align: "center" });
  if (form.companyAddress) {
    ctx.addLine(form.companyAddress, { size: 9, align: "center", color: [100, 100, 100] });
  }
  ctx.addGap();
  ctx.addLine("OFFER LETTER", { bold: true, size: 14, align: "center" });
  ctx.addHr();
  ctx.addGap();

  ctx.addFieldRow("Date:", form.issueDate || "________");
  ctx.addGap();

  ctx.addParagraph(`Dear ${form.candidateName || "________"},`);
  ctx.addGap();

  ctx.addParagraph(
    `We are pleased to offer you the position of ${form.designation || "________"} in the ${form.department || "________"} department at ${form.companyName || "________"}.`
  );
  ctx.addGap();

  ctx.addParagraph(
    `Your annual Cost to Company (CTC) will be ${form.ctc ? "Rs " + form.ctc : "________"}. Your expected date of joining is ${form.joiningDate || "________"}.${form.reportingManager ? " You will be reporting to " + form.reportingManager + "." : ""}`
  );
  ctx.addGap();

  ctx.addParagraph(
    "Please confirm your acceptance of this offer by signing and returning a copy of this letter. We look forward to welcoming you to the team."
  );
  ctx.addGap();

  ctx.addParagraph("Congratulations and welcome aboard!");
  ctx.addGap(3);

  ctx.addLine("Yours sincerely,", { size: 10 });
  ctx.addGap(3);
  ctx.addHr();
  ctx.addLine("Authorized Signatory", { size: 10 });
  ctx.addLine(form.companyName || "Company Name", { size: 9, color: [100, 100, 100] });
}
