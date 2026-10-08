import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "salary-certificate-generator";

const FAQS = [
  { q: "What is a salary certificate?", a: "A salary certificate is an official document issued by an employer that certifies an employee's salary details. It is different from a salary slip — a salary slip shows monthly breakdown, while a salary certificate is a summary letter confirming annual or monthly CTC, used for loans, visa applications, and official purposes." },
  { q: "When do you need a salary certificate?", a: "Salary certificates are commonly required for home loan applications, personal loan applications, credit card applications, visa processing (especially for US, UK, Schengen visas), rental agreements, and admission to professional courses or higher education." },
  { q: "What is the difference between a salary certificate and a salary slip?", a: "A salary slip is a monthly document showing earnings and deductions breakdown. A salary certificate is a formal letter from the employer confirming the employee's designation, date of joining, and gross salary or CTC — typically used for external verification purposes." },
  { q: "Who can issue a salary certificate?", a: "A salary certificate is typically issued by the HR department or the finance/accounts department of the employer. In smaller companies, it may be signed by the managing director or authorised signatory." },
  { q: "Is a salary certificate valid for home loans?", a: "Yes, banks and NBFCs in India accept salary certificates as proof of income for home loan applications. However, most lenders also require the last 3-6 months' salary slips and bank statements along with the salary certificate." },
];

export default function SalaryCertificateGenerator() {
  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    employeeName: "",
    employeeId: "",
    designation: "",
    department: "",
    dateOfJoining: "",
    monthlySalary: "",
    annualCtc: "",
    purpose: "loan application",
    issueDate: new Date().toISOString().slice(0, 10),
    signatoryName: "",
    signatoryDesignation: "HR Manager",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const purposes = ["loan application", "visa processing", "rental agreement", "higher education", "official records", "other"];

  const handleDownload = () => {
    createPdf({
      title: "Salary Certificate",
      filename: `salary-certificate-${form.employeeName || "employee"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `I just created a Salary Certificate using DoAide Docs -- the free online document generator. Try it at https://docs.doaide.com/salary-certificate-generator`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Salary Certificate Generator Online | DoAide Docs"
        description="Generate salary certificates for loan applications, visa processing, and official purposes. Enter employee and salary details, preview, and download as PDF. Free, no login."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Salary Certificate</span> Generator</h1>
          <p>Create professional salary certificates for loan applications, visa processing, and official verification. Fill in the details, preview the certificate, and download as PDF.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Company Details</h2>

            <div className="form-group">
              <label>Company Name *</label>
              <input value={form.companyName} onChange={set("companyName")} placeholder="e.g. Tata Consultancy Services" />
            </div>
            <div className="form-group">
              <label>Company Address</label>
              <input value={form.companyAddress} onChange={set("companyAddress")} placeholder="e.g. TCS House, Raveline Street, Mumbai" />
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
                <input value={form.designation} onChange={set("designation")} placeholder="e.g. Senior Software Engineer" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input value={form.department} onChange={set("department")} placeholder="e.g. Engineering" />
              </div>
            </div>

            <div className="form-group">
              <label>Date of Joining</label>
              <input type="date" value={form.dateOfJoining} onChange={set("dateOfJoining")} />
            </div>

            <h2 style={{ marginTop: "1rem" }}>Salary Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Monthly Gross Salary (Rs) *</label>
                <input type="number" value={form.monthlySalary} onChange={set("monthlySalary")} placeholder="e.g. 75000" />
              </div>
              <div className="form-group">
                <label>Annual CTC (Rs)</label>
                <input type="number" value={form.annualCtc} onChange={set("annualCtc")} placeholder="e.g. 1200000" />
              </div>
            </div>

            <h2 style={{ marginTop: "1rem" }}>Certificate Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Purpose</label>
                <select value={form.purpose} onChange={set("purpose")}>
                  {purposes.map((p) => (
                    <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Issue Date</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Signatory Name</label>
                <input value={form.signatoryName} onChange={set("signatoryName")} placeholder="e.g. Priya Sharma" />
              </div>
              <div className="form-group">
                <label>Signatory Designation</label>
                <input value={form.signatoryDesignation} onChange={set("signatoryDesignation")} placeholder="e.g. HR Manager" />
              </div>
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p style={{ textAlign: "right", fontSize: "0.85rem", color: "#666" }}>
                Date: {form.issueDate || "____"}
              </p>

              <h3 style={{ textAlign: "center", marginBottom: "1.5rem", textDecoration: "underline" }}>
                SALARY CERTIFICATE
              </h3>

              <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>To Whom It May Concern,</p>

              <p style={{ fontSize: "0.9rem", lineHeight: 1.8 }}>
                This is to certify that <strong>{form.employeeName || "________"}</strong>
                {form.employeeId && <> (Employee ID: {form.employeeId})</>}
                {" "}is employed with <strong>{form.companyName || "________"}</strong> as a{" "}
                <strong>{form.designation || "________"}</strong>
                {form.department && <> in the {form.department} department</>}
                {form.dateOfJoining && <> since {new Date(form.dateOfJoining).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</>}.
              </p>

              <p style={{ fontSize: "0.9rem", lineHeight: 1.8, marginTop: "0.75rem" }}>
                {form.employeeName ? `${form.employeeName.split(" ")[0]}'s` : "The employee's"} current salary details are as follows:
              </p>

              <div style={{ margin: "1rem 0", padding: "0.75rem", background: "#f9f9f9", borderRadius: "6px" }}>
                <div className="field-row">
                  <span className="field-label">Monthly Gross Salary:</span>
                  <span>Rs {form.monthlySalary ? Number(form.monthlySalary).toLocaleString("en-IN") : "________"}</span>
                </div>
                {form.annualCtc && (
                  <div className="field-row">
                    <span className="field-label">Annual CTC:</span>
                    <span>Rs {Number(form.annualCtc).toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>

              <p style={{ fontSize: "0.9rem", lineHeight: 1.8 }}>
                This certificate is being issued at the request of the employee for the purpose of <strong>{form.purpose}</strong>.
              </p>

              <p style={{ fontSize: "0.9rem", lineHeight: 1.8, marginTop: "0.75rem" }}>
                We confirm that the above details are true and correct as per our records.
              </p>

              <div style={{ marginTop: "3rem" }}>
                <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{form.signatoryName || "________"}</p>
                <p style={{ fontSize: "0.85rem", color: "#555" }}>{form.signatoryDesignation || "HR Manager"}</p>
                <p style={{ fontSize: "0.85rem", color: "#555" }}>{form.companyName || "Company Name"}</p>
                {form.companyAddress && <p style={{ fontSize: "0.8rem", color: "#777" }}>{form.companyAddress}</p>}
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
  ctx.addLine(form.companyName || "Company Name", { bold: true, size: 14, align: "center" });
  if (form.companyAddress) ctx.addLine(form.companyAddress, { size: 9, align: "center" });
  ctx.addGap();
  ctx.addHr();
  ctx.addGap();

  ctx.addFieldRow("Date:", form.issueDate);
  ctx.addGap();

  ctx.addLine("SALARY CERTIFICATE", { bold: true, size: 14, align: "center" });
  ctx.addGap();

  ctx.addLine("To Whom It May Concern,", { size: 11 });
  ctx.addGap(0.5);

  const joining = form.dateOfJoining
    ? new Date(form.dateOfJoining).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : null;

  let body = `This is to certify that ${form.employeeName || "________"}`;
  if (form.employeeId) body += ` (Employee ID: ${form.employeeId})`;
  body += ` is employed with ${form.companyName || "________"} as a ${form.designation || "________"}`;
  if (form.department) body += ` in the ${form.department} department`;
  if (joining) body += ` since ${joining}`;
  body += ".";

  ctx.addParagraph(body, { size: 10 });
  ctx.addGap(0.5);

  ctx.addLine("Current salary details:", { size: 10 });
  ctx.addGap(0.5);
  ctx.addFieldRow("Monthly Gross Salary:", `Rs ${form.monthlySalary ? Number(form.monthlySalary).toLocaleString("en-IN") : "________"}`);
  if (form.annualCtc) ctx.addFieldRow("Annual CTC:", `Rs ${Number(form.annualCtc).toLocaleString("en-IN")}`);
  ctx.addGap(0.5);

  ctx.addParagraph(`This certificate is being issued at the request of the employee for the purpose of ${form.purpose}.`, { size: 10 });
  ctx.addGap(0.5);
  ctx.addParagraph("We confirm that the above details are true and correct as per our records.", { size: 10 });

  ctx.addGap(3);

  ctx.addLine(form.signatoryName || "________", { bold: true, size: 10 });
  ctx.addLine(form.signatoryDesignation || "HR Manager", { size: 9 });
  ctx.addLine(form.companyName || "Company Name", { size: 9 });
}
