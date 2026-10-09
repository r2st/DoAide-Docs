import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import ConversionCTA from "../components/ConversionCTA";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "employee-warning-letter-generator";

const FAQS = [
  { q: "What is an employee warning letter?", a: "An employee warning letter is a formal document issued by an employer to an employee to address misconduct, poor performance, or violation of company policies. It serves as an official record that the employee has been notified of the issue and expected corrective actions." },
  { q: "When should a warning letter be issued?", a: "A warning letter should be issued when an employee repeatedly violates company policies, shows consistent poor performance, engages in misconduct, has excessive absenteeism, or fails to meet agreed-upon expectations despite verbal warnings." },
  { q: "Is a warning letter legally valid in India?", a: "Yes, a warning letter is a legally valid document in India. It forms part of the employee's disciplinary record and can be used as evidence in labour disputes or termination proceedings. It is important to follow a progressive disciplinary approach — verbal warning first, then written warning, and finally termination if the issue persists." },
  { q: "What is the difference between a warning letter and a show cause notice?", a: "A warning letter is issued after a violation has been established and serves as a formal reprimand. A show cause notice is issued before taking disciplinary action, asking the employee to explain why action should not be taken against them. The show cause notice typically precedes the warning letter in the disciplinary process." },
  { q: "Can an employee refuse to accept a warning letter?", a: "An employee can refuse to sign or acknowledge the letter, but it remains valid. In such cases, the employer should send the letter via registered post or email with read receipt, and note the refusal in the employee's file. Having witnesses present during issuance is also recommended." },
  { q: "How many warning letters can lead to termination?", a: "There is no fixed number prescribed by Indian labour law. However, most companies follow a progressive discipline policy — typically one verbal warning, two written warnings, and then termination. The specific policy depends on the company's HR guidelines and the severity of the offence." },
];

const WARNING_TYPES = [
  { key: "performance", label: "Poor Performance" },
  { key: "attendance", label: "Attendance / Absenteeism" },
  { key: "misconduct", label: "Misconduct" },
  { key: "policy_violation", label: "Policy Violation" },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(iso) {
  if (!iso) return "___";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function EmployeeWarningLetterGenerator() {
  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    employeeName: "",
    designation: "",
    department: "",
    employeeId: "",
    warningType: "performance",
    warningLevel: "first",
    incidentDate: "",
    issueDate: todayStr(),
    description: "",
    expectedAction: "",
    deadline: "",
    hrName: "",
    hrDesignation: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Employee Warning Letter",
      filename: `warning-letter-${form.employeeName.replace(/\s+/g, "-") || "employee"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just used DoAide Docs to create an Employee Warning Letter in seconds — completely free, no login needed. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  const warningLabel = WARNING_TYPES.find((t) => t.key === form.warningType)?.label || form.warningType;
  const levelLabel = form.warningLevel === "first" ? "First" : form.warningLevel === "second" ? "Second" : "Final";

  return (
    <>
      <SeoHead
        title="Free Employee Warning Letter Generator Online | DoAide Docs"
        description="Generate professional employee warning letters online for free. Covers poor performance, attendance issues, misconduct, and policy violations. Download as PDF instantly. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Employee Warning Letter</span> Generator</h1>
          <p>Create formal employee warning letters for misconduct, poor performance, or policy violations. Download as PDF instantly. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE — No Login Required</div>
        </div>

        <div className="gen-layout">
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
                <label>Employee ID</label>
                <input value={form.employeeId} onChange={set("employeeId")} placeholder="e.g. EMP-001" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Designation *</label>
                <input value={form.designation} onChange={set("designation")} placeholder="e.g. Software Engineer" />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <input value={form.department} onChange={set("department")} placeholder="e.g. Engineering" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Warning Type *</label>
                <select value={form.warningType} onChange={set("warningType")}>
                  {WARNING_TYPES.map((t) => (
                    <option key={t.key} value={t.key}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Warning Level *</label>
                <select value={form.warningLevel} onChange={set("warningLevel")}>
                  <option value="first">First Warning</option>
                  <option value="second">Second Warning</option>
                  <option value="final">Final Warning</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Incident Date *</label>
                <input type="date" value={form.incidentDate} onChange={set("incidentDate")} />
              </div>
              <div className="form-group">
                <label>Issue Date *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
            </div>

            <div className="form-group">
              <label>Description of Issue *</label>
              <textarea
                value={form.description}
                onChange={set("description")}
                placeholder="Describe the incident, behaviour, or performance issue in detail..."
                rows={4}
                style={{ width: "100%", resize: "vertical" }}
              />
            </div>

            <div className="form-group">
              <label>Expected Corrective Action *</label>
              <textarea
                value={form.expectedAction}
                onChange={set("expectedAction")}
                placeholder="Describe what the employee is expected to do to rectify the situation..."
                rows={3}
                style={{ width: "100%", resize: "vertical" }}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Improvement Deadline</label>
                <input type="date" value={form.deadline} onChange={set("deadline")} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>HR / Issuing Authority Name</label>
                <input value={form.hrName} onChange={set("hrName")} placeholder="Signatory's name" />
              </div>
              <div className="form-group">
                <label>HR / Issuing Authority Designation</label>
                <input value={form.hrDesignation} onChange={set("hrDesignation")} placeholder="e.g. HR Manager" />
              </div>
            </div>
          </div>

          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem" }}>
                {form.companyName || "Company Name"}
              </p>
              <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#666", marginBottom: "0.5rem" }}>
                {form.companyAddress || "Company Address"}
              </p>
              <h3 className="doc-title" style={{ textAlign: "center", margin: "1rem 0 0.5rem" }}>
                {levelLabel.toUpperCase()} WARNING LETTER
              </h3>
              <hr />

              <p style={{ marginTop: "1rem" }}>
                <strong>Date:</strong> {fmtDate(form.issueDate)}
              </p>

              <p style={{ marginTop: "0.5rem" }}>
                <strong>To:</strong> {form.employeeName || "________"}<br />
                <strong>Designation:</strong> {form.designation || "________"}<br />
                <strong>Department:</strong> {form.department || "________"}<br />
                {form.employeeId && <><strong>Employee ID:</strong> {form.employeeId}<br /></>}
              </p>

              <p style={{ marginTop: "1rem" }}>
                <strong>Subject: {levelLabel} Warning — {warningLabel}</strong>
              </p>

              <p style={{ marginTop: "1rem" }}>
                Dear <strong>{form.employeeName || "________"}</strong>,
              </p>

              <p>
                This letter serves as a formal <strong>{levelLabel.toLowerCase()} warning</strong> regarding
                your <strong>{warningLabel.toLowerCase()}</strong>
                {form.incidentDate ? ` on ${fmtDate(form.incidentDate)}` : ""}.
              </p>

              {form.description && (
                <div style={{ margin: "1rem 0", padding: "0.75rem", background: "#f9f9f9", borderLeft: "3px solid #d97706", fontSize: "0.85rem" }}>
                  <strong>Details:</strong><br />
                  {form.description}
                </div>
              )}

              <p>
                This behaviour is in violation of the company's policies and is not acceptable. You are hereby advised to take
                immediate corrective action.
              </p>

              {form.expectedAction && (
                <p>
                  <strong>Expected Corrective Action:</strong> {form.expectedAction}
                </p>
              )}

              {form.deadline && (
                <p>
                  You are expected to show improvement by <strong>{fmtDate(form.deadline)}</strong>. Failure to
                  comply may result in further disciplinary action, up to and including termination of employment.
                </p>
              )}

              {form.warningLevel === "final" && (
                <p style={{ color: "#b91c1c", fontWeight: 600 }}>
                  Please note that this is your final warning. Any further incidents will result in immediate termination of your employment.
                </p>
              )}

              <p style={{ marginTop: "1rem" }}>
                Please acknowledge receipt of this letter by signing below. A copy of this letter will be placed in your personnel file.
              </p>

              <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", display: "inline-block", minWidth: "150px" }}>
                    {form.hrName || "Authorised Signatory"}
                  </p>
                  <br />
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>
                    {form.hrDesignation || "HR Manager"}
                  </span>
                </div>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", display: "inline-block", minWidth: "150px" }}>
                    Employee Acknowledgement
                  </p>
                  <br />
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>Date: ________________</span>
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

        <ConversionCTA />
        <ShareButtons text="Free document generator online — no login needed! Try it:" toolName="this generator" />
        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, form) {
  const levelLabel = form.warningLevel === "first" ? "First" : form.warningLevel === "second" ? "Second" : "Final";
  const warningLabel = WARNING_TYPES.find((t) => t.key === form.warningType)?.label || form.warningType;

  ctx.addLine(form.companyName || "Company Name", { bold: true, size: 16, align: "center" });
  ctx.addLine(form.companyAddress || "Company Address", { size: 9, align: "center", color: [100, 100, 100] });
  ctx.addGap();
  ctx.addLine(`${levelLabel.toUpperCase()} WARNING LETTER`, { bold: true, size: 14, align: "center" });
  ctx.addHr();
  ctx.addGap();

  ctx.addFieldRow("Date:", fmtDate(form.issueDate));
  ctx.addGap();

  ctx.addFieldRow("To:", form.employeeName || "________");
  ctx.addFieldRow("Designation:", form.designation || "________");
  ctx.addFieldRow("Department:", form.department || "________");
  if (form.employeeId) ctx.addFieldRow("Employee ID:", form.employeeId);
  ctx.addGap();

  ctx.addLine(`Subject: ${levelLabel} Warning — ${warningLabel}`, { bold: true, size: 11 });
  ctx.addGap();

  ctx.addParagraph(`Dear ${form.employeeName || "________"},`);
  ctx.addGap();

  ctx.addParagraph(
    `This letter serves as a formal ${levelLabel.toLowerCase()} warning regarding your ${warningLabel.toLowerCase()}${form.incidentDate ? ` on ${fmtDate(form.incidentDate)}` : ""}.`
  );
  ctx.addGap();

  if (form.description) {
    ctx.addLine("Details:", { bold: true, size: 10 });
    ctx.addParagraph(form.description);
    ctx.addGap();
  }

  ctx.addParagraph(
    "This behaviour is in violation of the company's policies and is not acceptable. You are hereby advised to take immediate corrective action."
  );
  ctx.addGap();

  if (form.expectedAction) {
    ctx.addLine("Expected Corrective Action:", { bold: true, size: 10 });
    ctx.addParagraph(form.expectedAction);
    ctx.addGap();
  }

  if (form.deadline) {
    ctx.addParagraph(
      `You are expected to show improvement by ${fmtDate(form.deadline)}. Failure to comply may result in further disciplinary action, up to and including termination of employment.`
    );
    ctx.addGap();
  }

  if (form.warningLevel === "final") {
    ctx.addParagraph(
      "Please note that this is your final warning. Any further incidents will result in immediate termination of your employment."
    );
    ctx.addGap();
  }

  ctx.addParagraph(
    "Please acknowledge receipt of this letter by signing below. A copy of this letter will be placed in your personnel file."
  );
  ctx.addGap(3);

  ctx.addHr();
  ctx.addGap();
  ctx.addLine(form.hrName || "Authorised Signatory", { size: 10 });
  ctx.addLine(form.hrDesignation || "HR Manager", { size: 9, color: [100, 100, 100] });

  ctx.addGap(3);
  ctx.addHr();
  ctx.addGap();
  ctx.addLine("Employee Acknowledgement", { size: 10 });
  ctx.addLine("Date: ________________", { size: 9, color: [100, 100, 100] });
}
