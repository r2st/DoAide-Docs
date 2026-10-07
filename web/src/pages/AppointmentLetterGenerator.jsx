import { useState } from "react";
import SeoHead from "../components/SeoHead";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "appointment-letter-generator";

const FAQS = [
  { q: "What is the difference between an appointment letter and an offer letter?", a: "An offer letter is a preliminary document that communicates the intent to hire a candidate and outlines basic terms like role and salary. An appointment letter is a formal, legally binding document issued after the candidate accepts the offer, containing detailed terms and conditions of employment including probation, reporting structure, and company policies." },
  { q: "What is a probation period in an appointment letter?", a: "A probation period is a trial duration (typically 3 to 6 months) during which the employer evaluates the new employee's performance and suitability for the role. During probation, either party can terminate the employment with a shorter notice period. Upon successful completion, the employee is confirmed as a permanent member of the organisation." },
  { q: "Can an appointment letter be revoked after it is issued?", a: "Yes, an appointment letter can be revoked under certain circumstances such as the candidate failing a background verification, providing false information, or not meeting pre-joining conditions. However, revoking an appointment letter without valid reason after the candidate has resigned from their previous job may have legal implications." },
  { q: "What details must be included in an appointment letter?", a: "A valid appointment letter should include the employee's name, designation, department, date of joining, compensation details (CTC), probation period, reporting manager, workplace address, terms and conditions of employment, confidentiality clauses, and the authorised signatory's details." },
  { q: "Who signs the appointment letter?", a: "The appointment letter is typically signed by an authorised representative of the company such as the HR Manager, Head of Human Resources, or a Director. The employee also signs a copy to acknowledge acceptance of the terms and conditions mentioned in the letter." },
];

export default function AppointmentLetterGenerator() {
  const [form, setForm] = useState({
    employeeName: "",
    designation: "",
    department: "",
    companyName: "",
    companyAddress: "",
    joiningDate: "",
    probationPeriod: "",
    ctc: "",
    reportingTo: "",
    issueDate: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Appointment Letter",
      filename: `appointment-letter-${form.employeeName || "employee"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just used DoAide Docs to create a professional Appointment Letter in seconds -- completely free, no login needed. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Appointment Letter Generator Online | DoAide Docs"
        description="Generate professional appointment letters online for free. Download as PDF instantly. Includes designation, CTC, probation period, and terms of employment. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Appointment Letter</span> Generator</h1>
          <p>Create professional appointment letters instantly. Fill in the details, preview the letter, and download as PDF. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Letter Details</h2>

            <div className="form-group">
              <label>Company Name *</label>
              <input value={form.companyName} onChange={set("companyName")} placeholder="Enter company name" />
            </div>

            <div className="form-group">
              <label>Company Address *</label>
              <input value={form.companyAddress} onChange={set("companyAddress")} placeholder="Enter company address" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Employee Name *</label>
                <input value={form.employeeName} onChange={set("employeeName")} placeholder="Enter employee's full name" />
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
                <input type="number" value={form.ctc} onChange={set("ctc")} placeholder="e.g. 800000" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Joining Date *</label>
                <input type="date" value={form.joiningDate} onChange={set("joiningDate")} />
              </div>
              <div className="form-group">
                <label>Probation Period (Months)</label>
                <input type="number" value={form.probationPeriod} onChange={set("probationPeriod")} placeholder="e.g. 6" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Reporting To</label>
                <input value={form.reportingTo} onChange={set("reportingTo")} placeholder="Manager's name" />
              </div>
              <div className="form-group">
                <label>Issue Date *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem" }}>
                {form.companyName || "Company Name"}
              </p>
              <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#666", marginBottom: "0.5rem" }}>
                {form.companyAddress || "Company Address"}
              </p>
              <h3 className="doc-title" style={{ textAlign: "center", margin: "1rem 0 0.5rem" }}>APPOINTMENT LETTER</h3>
              <hr />

              <p style={{ marginTop: "1rem" }}>
                <strong>Date:</strong> {form.issueDate || "________"}
              </p>

              <p style={{ marginTop: "1rem" }}>
                Dear <strong>{form.employeeName || "________"}</strong>,
              </p>

              <p>
                With reference to your application and subsequent discussions, we are pleased to appoint you as{" "}
                <strong>{form.designation || "________"}</strong> in the <strong>{form.department || "________"}</strong> department
                at <strong>{form.companyName || "________"}</strong>.
              </p>

              <div className="field-row">
                <span className="field-label">Date of Joining:</span> {form.joiningDate || "________"}
              </div>
              <div className="field-row">
                <span className="field-label">Annual CTC:</span> Rs {form.ctc || "________"}
              </div>
              {form.probationPeriod && (
                <div className="field-row">
                  <span className="field-label">Probation Period:</span> {form.probationPeriod} month{Number(form.probationPeriod) !== 1 ? "s" : ""}
                </div>
              )}
              {form.reportingTo && (
                <div className="field-row">
                  <span className="field-label">Reporting To:</span> {form.reportingTo}
                </div>
              )}

              <p style={{ marginTop: "1rem" }}>
                Your appointment is subject to a probation period of{" "}
                <strong>{form.probationPeriod || "___"}</strong> month{form.probationPeriod && Number(form.probationPeriod) !== 1 ? "s" : ""}.
                During this period, your performance will be evaluated, and upon successful completion, you will be confirmed as a permanent employee.
              </p>

              <p style={{ marginTop: "1rem", fontWeight: "bold" }}>Terms and Conditions:</p>
              <ol style={{ fontSize: "0.85rem", paddingLeft: "1.25rem", lineHeight: "1.6" }}>
                <li>You will be governed by the rules, regulations, and policies of the company as amended from time to time.</li>
                <li>Your compensation and benefits are strictly confidential and must not be disclosed to any colleague or third party.</li>
                <li>During probation, either party may terminate the employment by giving 15 days written notice or salary in lieu thereof.</li>
                <li>You are expected to maintain the highest standards of professional conduct and integrity.</li>
                <li>This appointment is contingent upon satisfactory verification of your credentials and background.</li>
              </ol>

              <p style={{ marginTop: "1rem" }}>
                We look forward to your association with <strong>{form.companyName || "the company"}</strong> and wish you a successful career with us.
              </p>

              <div className="signature-line" style={{ marginTop: "2.5rem" }}>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", display: "inline-block", minWidth: "150px" }}>
                    Authorised Signatory
                  </p>
                  <br />
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>{form.companyName || "Company Name"}</span>
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

        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, form) {
  ctx.addLine(form.companyName || "Company Name", { bold: true, size: 16, align: "center" });
  ctx.addLine(form.companyAddress || "Company Address", { size: 9, align: "center", color: [100, 100, 100] });
  ctx.addGap();
  ctx.addLine("APPOINTMENT LETTER", { bold: true, size: 14, align: "center" });
  ctx.addHr();
  ctx.addGap();

  ctx.addFieldRow("Date:", form.issueDate || "________");
  ctx.addGap();

  ctx.addParagraph(`Dear ${form.employeeName || "________"},`);
  ctx.addGap();

  ctx.addParagraph(
    `With reference to your application and subsequent discussions, we are pleased to appoint you as ${form.designation || "________"} in the ${form.department || "________"} department at ${form.companyName || "________"}.`
  );
  ctx.addGap();

  ctx.addFieldRow("Date of Joining:", form.joiningDate || "________");
  ctx.addFieldRow("Annual CTC:", `Rs ${form.ctc || "________"}`);
  if (form.probationPeriod) {
    ctx.addFieldRow("Probation Period:", `${form.probationPeriod} month${Number(form.probationPeriod) !== 1 ? "s" : ""}`);
  }
  if (form.reportingTo) {
    ctx.addFieldRow("Reporting To:", form.reportingTo);
  }
  ctx.addGap();

  ctx.addParagraph(
    `Your appointment is subject to a probation period of ${form.probationPeriod || "___"} month${form.probationPeriod && Number(form.probationPeriod) !== 1 ? "s" : ""}. During this period, your performance will be evaluated, and upon successful completion, you will be confirmed as a permanent employee.`
  );
  ctx.addGap();

  ctx.addLine("Terms and Conditions:", { bold: true, size: 11 });
  ctx.addGap(0.5);
  ctx.addParagraph("1. You will be governed by the rules, regulations, and policies of the company as amended from time to time.");
  ctx.addParagraph("2. Your compensation and benefits are strictly confidential and must not be disclosed to any colleague or third party.");
  ctx.addParagraph("3. During probation, either party may terminate the employment by giving 15 days written notice or salary in lieu thereof.");
  ctx.addParagraph("4. You are expected to maintain the highest standards of professional conduct and integrity.");
  ctx.addParagraph("5. This appointment is contingent upon satisfactory verification of your credentials and background.");
  ctx.addGap();

  ctx.addParagraph(
    `We look forward to your association with ${form.companyName || "the company"} and wish you a successful career with us.`
  );
  ctx.addGap(3);

  ctx.addHr();
  ctx.addGap();
  ctx.addLine("Authorised Signatory", { size: 10 });
  ctx.addLine(form.companyName || "Company Name", { size: 9, color: [100, 100, 100] });
}
