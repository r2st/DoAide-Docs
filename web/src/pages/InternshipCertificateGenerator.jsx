import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import ConversionCTA from "../components/ConversionCTA";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "internship-certificate-generator";

const FAQS = [
  { q: "What is an internship certificate?", a: "An internship certificate is a formal document issued by a company or organisation to an intern upon completion of their internship. It certifies the intern's participation, duration, department, and a brief assessment of their performance during the internship period." },
  { q: "Is an internship certificate different from an internship letter?", a: "Yes. An internship letter (or offer letter) is issued at the start of the internship confirming the terms. An internship certificate (or completion certificate) is issued at the end, certifying that the intern successfully completed the internship. Both are separate documents." },
  { q: "Why is an internship certificate important?", a: "An internship certificate serves as proof of practical work experience. It is essential for college credit requirements, placement interviews, higher education applications, and building a professional portfolio. Many universities in India require students to submit internship certificates to complete their degree." },
  { q: "What details should an internship certificate include?", a: "A proper internship certificate should include the intern's full name, the organisation's name and address, the department or project, the internship duration (start and end dates), a brief description of responsibilities, a performance assessment, and the signature of an authorised person." },
  { q: "Can a student request an internship certificate?", a: "Yes, every intern has the right to request a certificate upon completing their internship. Most companies issue it automatically. If not, the intern should write a formal request to the HR department or their reporting manager. Companies are generally obligated to provide this document." },
  { q: "Does an internship certificate need to be on letterhead?", a: "While not legally mandatory, an internship certificate printed on company letterhead carries more credibility and is widely accepted by universities and employers. DoAide Docs generates a professional format — for official use, you may print it on your company letterhead." },
];

const RATINGS = ["Outstanding", "Excellent", "Very Good", "Good", "Satisfactory"];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(iso) {
  if (!iso) return "___";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function InternshipCertificateGenerator() {
  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    internName: "",
    collegeName: "",
    department: "",
    project: "",
    startDate: "",
    endDate: "",
    issueDate: todayStr(),
    rating: "Good",
    responsibilities: "",
    hrName: "",
    hrDesignation: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Internship Certificate",
      filename: `internship-certificate-${form.internName.replace(/\s+/g, "-") || "intern"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just used DoAide Docs to create an Internship Certificate in seconds — completely free, no login needed. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Internship Certificate Generator Online | DoAide Docs"
        description="Generate professional internship completion certificates online for free. Includes intern details, duration, project, and performance rating. Download as PDF instantly. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Internship Certificate</span> Generator</h1>
          <p>Create professional internship completion certificates instantly. Fill in the details, preview, and download as PDF. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE — No Login Required</div>
        </div>

        <div className="gen-layout">
          <div className="form-card">
            <h2>Certificate Details</h2>

            <div className="form-group">
              <label>Company / Organisation Name *</label>
              <input value={form.companyName} onChange={set("companyName")} placeholder="Enter company name" />
            </div>

            <div className="form-group">
              <label>Company Address *</label>
              <input value={form.companyAddress} onChange={set("companyAddress")} placeholder="Enter company address" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Intern Name *</label>
                <input value={form.internName} onChange={set("internName")} placeholder="Enter intern's full name" />
              </div>
              <div className="form-group">
                <label>College / University Name</label>
                <input value={form.collegeName} onChange={set("collegeName")} placeholder="e.g. IIT Delhi" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department / Team *</label>
                <input value={form.department} onChange={set("department")} placeholder="e.g. Software Engineering" />
              </div>
              <div className="form-group">
                <label>Project / Domain</label>
                <input value={form.project} onChange={set("project")} placeholder="e.g. Web Development" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date *</label>
                <input type="date" value={form.startDate} onChange={set("startDate")} />
              </div>
              <div className="form-group">
                <label>End Date *</label>
                <input type="date" value={form.endDate} onChange={set("endDate")} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Issue Date *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
              <div className="form-group">
                <label>Performance Rating</label>
                <select value={form.rating} onChange={set("rating")}>
                  {RATINGS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Key Responsibilities / Tasks</label>
              <textarea
                value={form.responsibilities}
                onChange={set("responsibilities")}
                placeholder="Brief description of what the intern worked on..."
                rows={3}
                style={{ width: "100%", resize: "vertical" }}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Issuing Authority Name</label>
                <input value={form.hrName} onChange={set("hrName")} placeholder="Signatory's name" />
              </div>
              <div className="form-group">
                <label>Issuing Authority Designation</label>
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
              <h3 className="doc-title" style={{ textAlign: "center", margin: "1rem 0 0.5rem" }}>INTERNSHIP CERTIFICATE</h3>
              <hr />

              <p style={{ marginTop: "1rem" }}>
                <strong>Date:</strong> {fmtDate(form.issueDate)}
              </p>

              <p style={{ marginTop: "1rem", fontWeight: 600 }}>TO WHOM IT MAY CONCERN</p>

              <p>
                This is to certify that <strong>{form.internName || "________"}</strong>
                {form.collegeName ? `, a student of ${form.collegeName},` : ""}
                {" "}has successfully completed an internship at{" "}
                <strong>{form.companyName || "________"}</strong> in the{" "}
                <strong>{form.department || "________"}</strong> department.
              </p>

              <div className="field-row">
                <span className="field-label">Duration:</span>{" "}
                {fmtDate(form.startDate)} to {fmtDate(form.endDate)}
              </div>

              {form.project && (
                <div className="field-row">
                  <span className="field-label">Project / Domain:</span> {form.project}
                </div>
              )}

              <div className="field-row">
                <span className="field-label">Performance Rating:</span> {form.rating}
              </div>

              {form.responsibilities && (
                <>
                  <p style={{ marginTop: "1rem", fontWeight: 600, fontSize: "0.9rem" }}>Key Responsibilities:</p>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>{form.responsibilities}</p>
                </>
              )}

              <p style={{ marginTop: "1rem" }}>
                During the internship, {form.internName || "the intern"} demonstrated a{" "}
                <strong>{form.rating.toLowerCase()}</strong> level of dedication, learning ability, and professional conduct.
                We wish {form.internName || "them"} all the best in their future endeavours.
              </p>

              <div className="signature-line" style={{ marginTop: "2.5rem" }}>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", display: "inline-block", minWidth: "150px" }}>
                    {form.hrName || "Authorised Signatory"}
                  </p>
                  <br />
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>
                    {form.hrDesignation || "HR Manager"}
                  </span>
                  <br />
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>
                    {form.companyName || "Company Name"}
                  </span>
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
  ctx.addLine(form.companyName || "Company Name", { bold: true, size: 16, align: "center" });
  ctx.addLine(form.companyAddress || "Company Address", { size: 9, align: "center", color: [100, 100, 100] });
  ctx.addGap();
  ctx.addLine("INTERNSHIP CERTIFICATE", { bold: true, size: 14, align: "center" });
  ctx.addHr();
  ctx.addGap();

  ctx.addFieldRow("Date:", fmtDate(form.issueDate));
  ctx.addGap();

  ctx.addLine("TO WHOM IT MAY CONCERN", { bold: true, size: 11 });
  ctx.addGap();

  ctx.addParagraph(
    `This is to certify that ${form.internName || "________"}${form.collegeName ? `, a student of ${form.collegeName},` : ""} has successfully completed an internship at ${form.companyName || "________"} in the ${form.department || "________"} department.`
  );
  ctx.addGap();

  ctx.addFieldRow("Duration:", `${fmtDate(form.startDate)} to ${fmtDate(form.endDate)}`);
  if (form.project) ctx.addFieldRow("Project / Domain:", form.project);
  ctx.addFieldRow("Performance Rating:", form.rating);
  ctx.addGap();

  if (form.responsibilities) {
    ctx.addLine("Key Responsibilities:", { bold: true, size: 10 });
    ctx.addParagraph(form.responsibilities);
    ctx.addGap();
  }

  ctx.addParagraph(
    `During the internship, ${form.internName || "the intern"} demonstrated a ${form.rating.toLowerCase()} level of dedication, learning ability, and professional conduct. We wish ${form.internName || "them"} all the best in their future endeavours.`
  );
  ctx.addGap(3);

  ctx.addHr();
  ctx.addGap();
  ctx.addLine(form.hrName || "Authorised Signatory", { size: 10 });
  ctx.addLine(form.hrDesignation || "HR Manager", { size: 9, color: [100, 100, 100] });
  ctx.addLine(form.companyName || "Company Name", { size: 9, color: [100, 100, 100] });
}
