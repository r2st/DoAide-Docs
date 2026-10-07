import { useState } from "react";
import SeoHead from "../components/SeoHead";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "experience-letter-generator";

const FAQS = [
  { q: "What is an experience letter?", a: "An experience letter (or experience certificate) is a formal document issued by an employer to an employee upon leaving the organisation. It certifies the employee's tenure, role, and conduct during their employment." },
  { q: "When is an experience letter required?", a: "Experience letters are typically required when joining a new company, applying for higher education, visa applications, or for professional registration with regulatory bodies." },
  { q: "What is the difference between an experience letter and a relieving letter?", a: "An experience letter certifies the employee's work experience, designation, and conduct. A relieving letter confirms the employee has been formally relieved from duties. Both are separate documents and may be needed together." },
  { q: "Who issues an experience letter?", a: "An experience letter is issued by the HR department or an authorised signatory of the organisation on the company letterhead." },
  { q: "What details should an experience letter contain?", a: "It should include the employee's full name, designation, department, date of joining, date of relieving, a brief description of conduct and performance, and the company's authorised signature." },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(iso) {
  if (!iso) return "___";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function ExperienceLetterGenerator() {
  const [form, setForm] = useState({
    employeeName: "",
    designation: "",
    department: "",
    companyName: "",
    companyAddress: "",
    dateOfJoining: "",
    dateOfRelieving: "",
    issueDate: todayStr(),
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Experience Letter",
      filename: `experience-letter-${form.employeeName.replace(/\s+/g, "-") || "document"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Experience Letter\nEmployee: ${form.employeeName}\nDesignation: ${form.designation}\nCompany: ${form.companyName}\nTenure: ${fmtDate(form.dateOfJoining)} to ${fmtDate(form.dateOfRelieving)}\n\nGenerated at docs.doaide.com`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Experience Letter Generator Online | DoAide Docs"
        description="Generate professional experience certificates for employees. Includes designation, tenure, and conduct details. Download as PDF for free."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Experience Letter</span> Generator</h1>
          <p>Create a professional experience certificate with company details, designation, and tenure. Preview and download as PDF instantly.</p>
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

            <div className="form-group">
              <label>Employee Name *</label>
              <input value={form.employeeName} onChange={set("employeeName")} placeholder="Full name of the employee" />
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
                <label>Date of Relieving *</label>
                <input type="date" value={form.dateOfRelieving} onChange={set("dateOfRelieving")} />
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
                EXPERIENCE CERTIFICATE
              </h4>
              <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>To Whom It May Concern,</p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7", fontSize: "0.9rem" }}>
                This is to certify that <strong>{form.employeeName || "________"}</strong> was employed with{" "}
                <strong>{form.companyName || "________"}</strong> as a{" "}
                <strong>{form.designation || "________"}</strong>
                {form.department && <> in the <strong>{form.department}</strong> department</>} from{" "}
                <strong>{fmtDate(form.dateOfJoining)}</strong> to <strong>{fmtDate(form.dateOfRelieving)}</strong>.
              </p>

              <p style={{ lineHeight: "1.7", fontSize: "0.9rem" }}>
                During the tenure with our organisation, we found {form.employeeName || "the employee"} to be
                sincere, dedicated, and hardworking. Their conduct and behaviour were exemplary, and they
                discharged all duties and responsibilities to our complete satisfaction.
              </p>

              <p style={{ lineHeight: "1.7", fontSize: "0.9rem" }}>
                We wish {form.employeeName || "the employee"} all the best in future endeavours.
              </p>

              <div style={{ marginTop: "2.5rem" }}>
                <p style={{ marginBottom: "0.25rem" }}>For <strong>{form.companyName || "________"}</strong></p>
                <div style={{ marginTop: "1.5rem" }}>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", display: "inline-block" }}>
                    Authorised Signatory
                  </p>
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
  ctx.addGap(2);

  ctx.addLine("EXPERIENCE CERTIFICATE", { bold: true, size: 14, align: "center" });
  ctx.addGap(2);

  ctx.addLine("To Whom It May Concern,", { size: 10 });
  ctx.addGap();

  ctx.addParagraph(
    `This is to certify that ${form.employeeName || "________"} was employed with ${form.companyName || "________"} as a ${form.designation || "________"}${form.department ? ` in the ${form.department} department` : ""} from ${fmtDate(form.dateOfJoining)} to ${fmtDate(form.dateOfRelieving)}.`
  );
  ctx.addGap();

  ctx.addParagraph(
    `During the tenure with our organisation, we found ${form.employeeName || "the employee"} to be sincere, dedicated, and hardworking. Their conduct and behaviour were exemplary, and they discharged all duties and responsibilities to our complete satisfaction.`
  );
  ctx.addGap();

  ctx.addParagraph(
    `We wish ${form.employeeName || "the employee"} all the best in future endeavours.`
  );
  ctx.addGap(3);

  ctx.addLine(`For ${form.companyName || "________"}`, { bold: true, size: 10 });
  ctx.addGap(3);
  ctx.addLine("________________________", { size: 10 });
  ctx.addLine("Authorised Signatory", { size: 10 });
}
