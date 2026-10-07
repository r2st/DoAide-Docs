import { useState } from "react";
import SeoHead from "../components/SeoHead";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "bonafide-certificate-generator";

const FAQS = [
  { q: "What is a bonafide certificate?", a: "A bonafide certificate is an official document issued by an educational institution certifying that a particular student is currently enrolled and studying at that institution. It serves as proof of genuine enrollment and is often required for various official purposes." },
  { q: "Who issues a bonafide certificate?", a: "A bonafide certificate is issued by the principal, registrar, or head of the educational institution where the student is currently enrolled. It is printed on the institution's official letterhead and carries an authorized signature and seal." },
  { q: "What is a bonafide certificate used for?", a: "A bonafide certificate is used for opening a bank account, applying for a passport, availing educational loans, applying for scholarships, obtaining a bus or train pass, visa applications, and various other official or administrative purposes." },
  { q: "How long is a bonafide certificate valid?", a: "A bonafide certificate is typically valid for 3 to 6 months from the date of issue. However, the validity may vary depending on the purpose and the organization requesting it. Some institutions may specify the validity period on the certificate itself." },
  { q: "How to apply for a bonafide certificate?", a: "To apply for a bonafide certificate, submit a written application to the principal or registrar of your institution stating the purpose for which the certificate is required. Most institutions process the request within 2 to 5 working days. Some institutions also accept online applications through their student portal." },
];

const PURPOSES = [
  "Bank Account Opening",
  "Passport Application",
  "Scholarship Application",
  "Education Loan",
  "Bus/Train Pass",
  "Visa Application",
  "Other",
];

export default function BonafideCertificateGenerator() {
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    courseName: "",
    year: "First",
    rollNo: "",
    institution: "",
    institutionAddress: "",
    purpose: "Bank Account Opening",
    issueDate: new Date().toISOString().slice(0, 10),
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Bonafide Certificate",
      filename: `bonafide-certificate-${form.studentName || "student"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just used DoAide Docs to generate a Bonafide Certificate online for free. No sign-up needed, instant PDF download. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Bonafide Certificate Generator Online | DoAide Docs"
        description="Generate bonafide certificates online for free. Download as PDF instantly. No login required. Ideal for bank accounts, passport, scholarships, education loans, and more."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Bonafide Certificate</span> Generator</h1>
          <p>Generate bonafide certificates instantly for bank accounts, passport applications, scholarships, and more. Fill the form, preview, and download as PDF. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Certificate Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Student Name *</label>
                <input value={form.studentName} onChange={set("studentName")} placeholder="Enter student's full name" />
              </div>
              <div className="form-group">
                <label>Father's Name *</label>
                <input value={form.fatherName} onChange={set("fatherName")} placeholder="Enter father's full name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Course / Program *</label>
                <input value={form.courseName} onChange={set("courseName")} placeholder="e.g. B.Tech Computer Science" />
              </div>
              <div className="form-group">
                <label>Year of Study *</label>
                <select value={form.year} onChange={set("year")}>
                  <option>First</option>
                  <option>Second</option>
                  <option>Third</option>
                  <option>Fourth</option>
                  <option>Fifth</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Roll Number *</label>
                <input value={form.rollNo} onChange={set("rollNo")} placeholder="e.g. 2024CS001" />
              </div>
              <div className="form-group">
                <label>Date of Issue *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Institution Name *</label>
                <input value={form.institution} onChange={set("institution")} placeholder="Enter institution name" />
              </div>
              <div className="form-group">
                <label>Purpose *</label>
                <select value={form.purpose} onChange={set("purpose")}>
                  {PURPOSES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Institution Address</label>
              <input value={form.institutionAddress} onChange={set("institutionAddress")} placeholder="Enter institution address" />
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.15rem" }}>
                {form.institution || "Institution Name"}
              </p>
              {form.institutionAddress && (
                <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#666", marginBottom: "0.75rem" }}>
                  {form.institutionAddress}
                </p>
              )}
              <h3 className="doc-title" style={{ textAlign: "center", marginBottom: "0.5rem", textDecoration: "underline" }}>
                BONAFIDE CERTIFICATE
              </h3>
              <hr />

              <div className="field-row" style={{ marginTop: "0.75rem", display: "flex", justifyContent: "space-between" }}>
                <span><span className="field-label">Ref No:</span> {form.rollNo || "____"}</span>
                <span><span className="field-label">Date:</span> {form.issueDate || "____"}</span>
              </div>

              <p style={{ marginTop: "1rem", lineHeight: "1.7" }}>
                This is to certify that <strong>{form.studentName || "________"}</strong>,
                son/daughter of <strong>{form.fatherName || "________"}</strong>,
                is a bonafide student of this institution. He/She is currently enrolled in
                the <strong>{form.courseName || "________"}</strong> program
                and is studying in the <strong>{form.year || "____"}</strong> year,
                bearing Roll Number <strong>{form.rollNo || "________"}</strong>.
              </p>
              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                This certificate is being issued upon the request of the student for the purpose
                of <strong>{form.purpose || "________"}</strong>.
              </p>
              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                We wish him/her all the best in future endeavors.
              </p>

              <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div className="stamp" style={{ border: "2px solid #2a7d2a", borderRadius: "50%", padding: "0.5rem 1rem", color: "#2a7d2a", fontWeight: "bold", fontSize: "0.75rem", transform: "rotate(-15deg)", opacity: 0.7 }}>
                  VERIFIED
                </div>
                <div className="signature-line" style={{ textAlign: "center" }}>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", minWidth: "10rem" }}>
                    Principal / Registrar
                  </p>
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
  ctx.addLine(form.institution || "Institution Name", { bold: true, size: 14, align: "center" });
  if (form.institutionAddress) {
    ctx.addLine(form.institutionAddress, { size: 9, align: "center", color: [100, 100, 100] });
  }
  ctx.addGap();
  ctx.addLine("BONAFIDE CERTIFICATE", { bold: true, size: 16, align: "center" });
  ctx.addHr();
  ctx.addGap();

  const halfW = ctx.contentWidth / 2;
  ctx.addTableRow(
    [`Ref No: ${form.rollNo || "____"}`, `Date: ${form.issueDate || "____"}`],
    [halfW, halfW]
  );
  ctx.addGap();

  ctx.addParagraph(
    `This is to certify that ${form.studentName || "________"}, son/daughter of ${form.fatherName || "________"}, is a bonafide student of this institution. He/She is currently enrolled in the ${form.courseName || "________"} program and is studying in the ${form.year || "____"} year, bearing Roll Number ${form.rollNo || "________"}.`
  );
  ctx.addGap();

  ctx.addParagraph(
    `This certificate is being issued upon the request of the student for the purpose of ${form.purpose || "________"}.`
  );
  ctx.addGap();

  ctx.addParagraph("We wish him/her all the best in future endeavors.");
  ctx.addGap(4);

  ctx.addTableRow(
    ["[VERIFIED]", "________________________"],
    [halfW, halfW]
  );
  ctx.addTableRow(
    ["", "Principal / Registrar"],
    [halfW, halfW]
  );
}
