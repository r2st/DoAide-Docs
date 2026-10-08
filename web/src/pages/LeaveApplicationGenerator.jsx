import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const LEAVE_TYPES = [
  { value: "casual", label: "Casual Leave" },
  { value: "sick", label: "Sick Leave" },
  { value: "earned", label: "Earned Leave" },
  { value: "maternity", label: "Maternity Leave" },
  { value: "paternity", label: "Paternity Leave" },
  { value: "compensatory", label: "Compensatory Off" },
];

function formatDate(dateStr) {
  if (!dateStr) return "________";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

function todayStr() {
  const d = new Date();
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

function getLeaveDays(from, to) {
  if (!from || !to) return "";
  const start = new Date(from);
  const end = new Date(to);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : "";
}

function getLeaveLabel(value) {
  const found = LEAVE_TYPES.find((t) => t.value === value);
  return found ? found.label : value;
}

const SLUG = "leave-application-generator";

const FAQS = [
  { q: "What is a leave application?", a: "A leave application is a formal written request submitted to an employer or manager seeking permission to be absent from work for a specified period. It typically includes the type of leave, dates, reason, and contact details during the absence." },
  { q: "What are the different types of leave?", a: "Common leave types include Casual Leave (for personal work or short absences), Sick Leave (for illness or medical reasons), Earned Leave (accumulated paid leave), Maternity Leave (for expecting mothers), Paternity Leave (for new fathers), and Compensatory Off (for working on holidays or weekends)." },
  { q: "What is the correct format for a leave application?", a: "A proper leave application should include the date, recipient's name and designation, subject line, body with leave type, dates, and reason, your contact details during leave, and a formal closing with your name and designation." },
  { q: "What is the difference between casual leave and earned leave?", a: "Casual Leave is granted for short, unplanned absences like personal errands and typically cannot be carried forward. Earned Leave (also called Privilege Leave) is accumulated over time based on days worked, can usually be carried forward, and is often encashable." },
  { q: "How many days in advance should I apply for leave?", a: "For planned leave, it is best to apply at least 3-7 days in advance. Casual leave may require 1-2 days notice. Sick leave can be applied on the same day or after returning, depending on company policy. Always check your organization's HR policy." },
  { q: "Is this leave application generator free to use?", a: "Yes, this tool is 100% free with no login required. You can generate, preview, download as PDF, print, or share your leave application on WhatsApp without any charges." },
];

export default function LeaveApplicationGenerator() {
  const [form, setForm] = useState({
    employeeName: "",
    designation: "",
    department: "",
    companyName: "",
    managerName: "",
    leaveType: "casual",
    fromDate: "",
    toDate: "",
    reason: "",
    contactDuring: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const leaveDays = getLeaveDays(form.fromDate, form.toDate);

  const handleDownload = () => {
    createPdf({
      title: "Leave Application",
      filename: `leave-application-${form.employeeName || "document"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Leave Application\nFrom: ${form.employeeName || "Employee"}\nLeave Type: ${getLeaveLabel(form.leaveType)}\nDates: ${formatDate(form.fromDate)} to ${formatDate(form.toDate)}${leaveDays ? ` (${leaveDays} day${leaveDays > 1 ? "s" : ""})` : ""}\nReason: ${form.reason || "N/A"}\n\nGenerated at docs.doaide.com`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Leave Application Generator Online | DoAide Docs"
        description="Generate professional leave applications online for free. Download as PDF, print, or share on WhatsApp. Supports casual, sick, earned, maternity, paternity, and compensatory leave types. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Leave Application</span> Generator</h1>
          <p>Create a professional leave application instantly. Fill in your details, preview the letter, and download as PDF. Supports all leave types including casual, sick, earned, and maternity leave.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Application Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Employee Name *</label>
                <input value={form.employeeName} onChange={set("employeeName")} placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input value={form.designation} onChange={set("designation")} placeholder="e.g. Software Engineer" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <input value={form.department} onChange={set("department")} placeholder="e.g. Engineering" />
              </div>
              <div className="form-group">
                <label>Company / Organisation</label>
                <input value={form.companyName} onChange={set("companyName")} placeholder="Enter company name" />
              </div>
            </div>

            <div className="form-group">
              <label>Manager / Reporting Authority *</label>
              <input value={form.managerName} onChange={set("managerName")} placeholder="Enter manager's name" />
            </div>

            <div className="form-group">
              <label>Leave Type *</label>
              <select value={form.leaveType} onChange={set("leaveType")}>
                {LEAVE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>From Date *</label>
                <input type="date" value={form.fromDate} onChange={set("fromDate")} />
              </div>
              <div className="form-group">
                <label>To Date *</label>
                <input type="date" value={form.toDate} onChange={set("toDate")} />
              </div>
            </div>

            {leaveDays && (
              <p style={{ fontSize: "0.85rem", color: "#1a73e8", marginTop: "-0.5rem", marginBottom: "0.75rem" }}>
                Total: {leaveDays} day{leaveDays > 1 ? "s" : ""}
              </p>
            )}

            <div className="form-group">
              <label>Reason for Leave *</label>
              <textarea
                value={form.reason}
                onChange={set("reason")}
                placeholder="Describe your reason for leave..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Contact During Leave</label>
              <input value={form.contactDuring} onChange={set("contactDuring")} placeholder="Phone number or email" />
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p style={{ textAlign: "right", marginBottom: "1rem" }}>
                <strong>Date:</strong> {todayStr()}
              </p>

              <p><strong>To,</strong></p>
              <p>{form.managerName || "________"}</p>
              {form.companyName && <p>{form.companyName}</p>}
              <br />

              <p><strong>From,</strong></p>
              <p>{form.employeeName || "________"}</p>
              {form.designation && <p>{form.designation}</p>}
              {form.department && <p>Department: {form.department}</p>}
              <br />

              <p><strong>Subject: Application for {getLeaveLabel(form.leaveType)}</strong></p>
              <hr />

              <p style={{ marginTop: "1rem" }}>
                Respected {form.managerName ? `${form.managerName}` : "Sir/Madam"},
              </p>

              <p style={{ marginTop: "0.75rem", textAlign: "justify" }}>
                I am writing to formally request {getLeaveLabel(form.leaveType).toLowerCase()} from{" "}
                <strong>{formatDate(form.fromDate)}</strong> to{" "}
                <strong>{formatDate(form.toDate)}</strong>
                {leaveDays ? ` (${leaveDays} day${leaveDays > 1 ? "s" : ""})` : ""}.
              </p>

              {form.reason && (
                <p style={{ marginTop: "0.75rem", textAlign: "justify" }}>
                  Reason: {form.reason}
                </p>
              )}

              {form.contactDuring && (
                <p style={{ marginTop: "0.75rem" }}>
                  I can be reached at <strong>{form.contactDuring}</strong> during the leave period in case of any urgency.
                </p>
              )}

              <p style={{ marginTop: "0.75rem" }}>
                I shall ensure that all pending work is completed or properly handed over before my leave begins. Kindly approve my leave request.
              </p>

              <p style={{ marginTop: "0.75rem" }}>
                Thanking you.
              </p>

              <div style={{ marginTop: "2rem" }}>
                <p>Yours sincerely,</p>
                <p style={{ marginTop: "1.5rem", borderTop: "1px solid #999", paddingTop: "0.25rem", display: "inline-block" }}>
                  {form.employeeName || "Your Name"}
                </p>
                {form.designation && <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.designation}</p>}
                {form.department && <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.department}</p>}
              </div>
            </div>

            <div className="btn-row">
              <button className="btn btn-primary" onClick={handleDownload}>Download PDF</button>
              <button className="btn btn-secondary" onClick={printPreview}>Print</button>
              <button className="btn btn-whatsapp" onClick={handleWhatsApp}>Share on WhatsApp</button>
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
  const leaveDays = getLeaveDays(form.fromDate, form.toDate);

  ctx.addLine("LEAVE APPLICATION", { bold: true, size: 16, align: "center" });
  ctx.addGap(2);

  ctx.addLine(`Date: ${todayStr()}`, { size: 10, align: "right" });
  ctx.addGap();

  ctx.addLine("To,", { bold: true, size: 11 });
  ctx.addLine(form.managerName || "________", { size: 11 });
  if (form.companyName) ctx.addLine(form.companyName, { size: 11 });
  ctx.addGap();

  ctx.addLine("From,", { bold: true, size: 11 });
  ctx.addLine(form.employeeName || "________", { size: 11 });
  if (form.designation) ctx.addLine(form.designation, { size: 10 });
  if (form.department) ctx.addLine(`Department: ${form.department}`, { size: 10 });
  ctx.addGap();

  ctx.addLine(`Subject: Application for ${getLeaveLabel(form.leaveType)}`, { bold: true, size: 11 });
  ctx.addHr();
  ctx.addGap();

  ctx.addParagraph(`Respected ${form.managerName || "Sir/Madam"},`);
  ctx.addGap();

  ctx.addParagraph(
    `I am writing to formally request ${getLeaveLabel(form.leaveType).toLowerCase()} from ${formatDate(form.fromDate)} to ${formatDate(form.toDate)}${leaveDays ? ` (${leaveDays} day${leaveDays > 1 ? "s" : ""})` : ""}.`
  );
  ctx.addGap();

  if (form.reason) {
    ctx.addParagraph(`Reason: ${form.reason}`);
    ctx.addGap();
  }

  if (form.contactDuring) {
    ctx.addParagraph(`I can be reached at ${form.contactDuring} during the leave period in case of any urgency.`);
    ctx.addGap();
  }

  ctx.addParagraph("I shall ensure that all pending work is completed or properly handed over before my leave begins. Kindly approve my leave request.");
  ctx.addGap();

  ctx.addParagraph("Thanking you.");
  ctx.addGap(2);

  ctx.addLine("Yours sincerely,", { size: 11 });
  ctx.addGap(2);
  ctx.addHr();
  ctx.addLine(form.employeeName || "Your Name", { bold: true, size: 11 });
  if (form.designation) ctx.addLine(form.designation, { size: 10 });
  if (form.department) ctx.addLine(form.department, { size: 10 });
}
