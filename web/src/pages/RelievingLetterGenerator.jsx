import { useState } from "react";
import SeoHead from "../components/SeoHead";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "relieving-letter-generator";

const FAQS = [
  { q: "What is a relieving letter?", a: "A relieving letter is a formal document issued by an employer confirming that an employee has been officially relieved from their duties after serving the notice period. It marks the formal end of employment." },
  { q: "When is a relieving letter needed?", a: "A relieving letter is typically needed when joining a new company (most employers require it), applying for visa or immigration, for background verification, and for EPF transfers." },
  { q: "What is the difference between a relieving letter and a resignation acceptance?", a: "A resignation acceptance letter acknowledges the employee's intent to resign, while a relieving letter confirms the actual last working day and that all dues are settled. The relieving letter is issued on or after the last working day." },
  { q: "Can I join a new company without a relieving letter?", a: "While some companies may allow joining with a declaration, most established organisations require a relieving letter from the previous employer before issuing the offer or completing onboarding." },
  { q: "What details should a relieving letter contain?", a: "A relieving letter should include the employee's name, employee ID, designation, department, date of joining, last working day, confirmation of dues settlement, and the authorised signatory's details." },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(iso) {
  if (!iso) return "___";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function RelievingLetterGenerator() {
  const [form, setForm] = useState({
    employeeName: "",
    employeeId: "",
    designation: "",
    department: "",
    companyName: "",
    companyAddress: "",
    dateOfJoining: "",
    lastWorkingDay: "",
    issueDate: todayStr(),
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Relieving Letter",
      filename: `relieving-letter-${form.employeeName.replace(/\s+/g, "-") || "document"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Relieving Letter\nEmployee: ${form.employeeName}\nEmployee ID: ${form.employeeId}\nDesignation: ${form.designation}\nCompany: ${form.companyName}\nLast Working Day: ${fmtDate(form.lastWorkingDay)}\n\nGenerated at docs.doaide.com`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Relieving Letter Generator Online | DoAide Docs"
        description="Generate relieving letters confirming end of employment. Includes employee details, last working day, and dues clearance. Download as PDF for free."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Relieving Letter</span> Generator</h1>
          <p>Create a formal relieving letter confirming the end of employment. Fill in employee and company details, preview, and download as PDF.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Company Details</h2>

            <div className="form-group">
              <label>Company Name *</label>
              <input value={form.companyName} onChange={set("companyName")} placeholder="Company / Organisation name" />
            </div>
            <div className="form-group">
              <label>Company Address</label>
              <input value={form.companyAddress} onChange={set("companyAddress")} placeholder="Registered office address" />
            </div>

            <h2 style={{ marginTop: "1rem" }}>Employee Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Employee Name *</label>
                <input value={form.employeeName} onChange={set("employeeName")} placeholder="Full name" />
              </div>
              <div className="form-group">
                <label>Employee ID</label>
                <input value={form.employeeId} onChange={set("employeeId")} placeholder="e.g. EMP001" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Designation *</label>
                <input value={form.designation} onChange={set("designation")} placeholder="e.g. Software Engineer" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input value={form.department} onChange={set("department")} placeholder="e.g. Engineering" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Joining *</label>
                <input type="date" value={form.dateOfJoining} onChange={set("dateOfJoining")} />
              </div>
              <div className="form-group">
                <label>Last Working Day *</label>
                <input type="date" value={form.lastWorkingDay} onChange={set("lastWorkingDay")} />
              </div>
            </div>

            <div className="form-group">
              <label>Issue Date</label>
              <input type="date" value={form.issueDate} onChange={set("issueDate")} />
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <div style={{ borderBottom: "2px solid #2563eb", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
                <h3 style={{ margin: 0, color: "#2563eb" }}>{form.companyName || "Company Name"}</h3>
                <p style={{ fontSize: "0.8rem", color: "#666", margin: "0.25rem 0 0" }}>{form.companyAddress || "Company Address"}</p>
              </div>

              <p style={{ textAlign: "right", fontSize: "0.85rem", color: "#666" }}>
                Date: {fmtDate(form.issueDate)}
              </p>

              <h4 style={{ textAlign: "center", margin: "1rem 0", textDecoration: "underline" }}>
                RELIEVING LETTER
              </h4>

              <p style={{ fontSize: "0.9rem" }}>
                {form.employeeId && <>Employee ID: {form.employeeId}<br /></>}
                To,<br />
                <strong>{form.employeeName || "________"}</strong>
              </p>

              <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Dear {form.employeeName || "________"},
              </p>

              <p style={{ lineHeight: "1.7", fontSize: "0.9rem" }}>
                With reference to your resignation letter, we hereby confirm that you have been relieved from
                your duties as <strong>{form.designation || "________"}</strong>
                {form.department && <> in the <strong>{form.department}</strong> department</>} at{" "}
                <strong>{form.companyName || "________"}</strong>, effective{" "}
                <strong>{fmtDate(form.lastWorkingDay)}</strong>.
              </p>

              <p style={{ lineHeight: "1.7", fontSize: "0.9rem" }}>
                Your tenure with the company was from <strong>{fmtDate(form.dateOfJoining)}</strong> to{" "}
                <strong>{fmtDate(form.lastWorkingDay)}</strong>. All dues have been settled, and you have
                handed over all company property and documents in your possession.
              </p>

              <p style={{ lineHeight: "1.7", fontSize: "0.9rem" }}>
                We acknowledge your contributions during your employment with us and wish you all the best
                in your future endeavours.
              </p>

              <p style={{ lineHeight: "1.7", fontSize: "0.9rem" }}>
                Please note that you are bound by the terms of confidentiality and non-disclosure agreements
                signed during your employment.
              </p>

              <div style={{ marginTop: "2.5rem" }}>
                <p style={{ marginBottom: "0.25rem" }}>For <strong>{form.companyName || "________"}</strong></p>
                <div style={{ marginTop: "1.5rem" }}>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", display: "inline-block" }}>
                    Authorised Signatory
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#666" }}>HR Department</p>
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
  // Letterhead
  ctx.addLine(form.companyName || "Company Name", { bold: true, size: 14, align: "center" });
  if (form.companyAddress) {
    ctx.addLine(form.companyAddress, { size: 9, align: "center", color: [100, 100, 100] });
  }
  ctx.addGap();
  ctx.addHr();
  ctx.addGap();

  ctx.addLine(`Date: ${fmtDate(form.issueDate)}`, { size: 10, align: "right" });
  ctx.addGap();

  if (form.employeeId) {
    ctx.addLine(`Employee ID: ${form.employeeId}`, { size: 10 });
  }
  ctx.addLine("To,", { size: 10 });
  ctx.addLine(form.employeeName || "________", { bold: true, size: 10 });
  ctx.addGap(2);

  ctx.addLine("RELIEVING LETTER", { bold: true, size: 14, align: "center" });
  ctx.addGap(2);

  ctx.addLine(`Dear ${form.employeeName || "________"},`, { size: 10 });
  ctx.addGap();

  ctx.addParagraph(
    `With reference to your resignation letter, we hereby confirm that you have been relieved from your duties as ${form.designation || "________"}${form.department ? ` in the ${form.department} department` : ""} at ${form.companyName || "________"}, effective ${fmtDate(form.lastWorkingDay)}.`
  );
  ctx.addGap();

  ctx.addParagraph(
    `Your tenure with the company was from ${fmtDate(form.dateOfJoining)} to ${fmtDate(form.lastWorkingDay)}. All dues have been settled, and you have handed over all company property and documents in your possession.`
  );
  ctx.addGap();

  ctx.addParagraph(
    `We acknowledge your contributions during your employment with us and wish you all the best in your future endeavours.`
  );
  ctx.addGap();

  ctx.addParagraph(
    `Please note that you are bound by the terms of confidentiality and non-disclosure agreements signed during your employment.`
  );
  ctx.addGap(3);

  ctx.addLine(`For ${form.companyName || "________"}`, { bold: true, size: 10 });
  ctx.addGap(3);
  ctx.addLine("________________________", { size: 10 });
  ctx.addLine("Authorised Signatory", { size: 10 });
  ctx.addLine("HR Department", { size: 9, color: [100, 100, 100] });
}
