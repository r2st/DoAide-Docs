import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import ConversionCTA from "../components/ConversionCTA";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "bonafide-certificate-generator";

const FAQS = [
  { q: "What is a bonafide certificate?", a: "A bonafide certificate is an official document issued by an educational institution or employer certifying that a particular student or employee is currently enrolled or employed. It serves as proof of genuine association and is often required for various official purposes." },
  { q: "Who issues a bonafide certificate?", a: "For students, a bonafide certificate is issued by the principal, registrar, or head of the educational institution. For employees, it is issued by the HR department or an authorised signatory of the company. It is printed on official letterhead and carries an authorized signature and seal." },
  { q: "What is a bonafide certificate used for?", a: "A bonafide certificate is used for opening a bank account, applying for a passport, availing educational loans, applying for scholarships, obtaining a bus or train pass, visa applications, address proof, and various other official or administrative purposes." },
  { q: "How long is a bonafide certificate valid?", a: "A bonafide certificate is typically valid for 3 to 6 months from the date of issue. However, the validity may vary depending on the purpose and the organization requesting it. Some institutions may specify the validity period on the certificate itself." },
  { q: "Can employees get a bonafide certificate?", a: "Yes, employees can get a bonafide certificate from their employer. It certifies that the person is a current employee of the company and is often required for purposes like visa applications, bank loans, address verification, or government procedures." },
];

const PURPOSES = [
  "Bank Account Opening",
  "Passport Application",
  "Scholarship Application",
  "Education Loan",
  "Bus/Train Pass",
  "Visa Application",
  "Address Verification",
  "Other",
];

export default function BonafideCertificateGenerator() {
  const [mode, setMode] = useState("student");
  const [form, setForm] = useState({
    // Common
    name: "",
    fatherName: "",
    dateOfBirth: "",
    purpose: "Bank Account Opening",
    institution: "",
    institutionAddress: "",
    issueDate: new Date().toISOString().slice(0, 10),
    // Student
    courseName: "",
    year: "First",
    rollNo: "",
    // Employee
    employeeNo: "",
    designation: "",
    department: "",
    dateOfJoining: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Bonafide Certificate",
      filename: `bonafide-certificate-${form.name || (mode === "student" ? "student" : "employee")}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, mode, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just used DoAide Docs to generate a Bonafide Certificate online for free. No sign-up needed, instant PDF download. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  const fmtDob = form.dateOfBirth
    ? new Date(form.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "________";

  return (
    <>
      <SeoHead
        title="Free Bonafide Certificate Generator Online | DoAide Docs"
        description="Generate bonafide certificates online for students and employees. Download as PDF instantly. No login required. Ideal for bank accounts, passport, scholarships, education loans, visa, and more."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Bonafide Certificate</span> Generator</h1>
          <p>Generate bonafide certificates instantly for students and employees. Use for bank accounts, passport applications, scholarships, visa, and more. Fill the form, preview, and download as PDF.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Certificate For</h2>
            <div className="mode-toggle">
              <button className={mode === "student" ? "active" : ""} onClick={() => setMode("student")}>Student</button>
              <button className={mode === "employee" ? "active" : ""} onClick={() => setMode("employee")}>Employee</button>
            </div>

            <h2>Personal Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>{mode === "student" ? "Student" : "Employee"} Name *</label>
                <input value={form.name} onChange={set("name")} placeholder="Enter full name" />
              </div>
              <div className="form-group">
                <label>Father&apos;s Name *</label>
                <input value={form.fatherName} onChange={set("fatherName")} placeholder="Enter father's full name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" value={form.dateOfBirth} onChange={set("dateOfBirth")} />
              </div>
              <div className="form-group">
                <label>Date of Issue *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
            </div>

            {mode === "student" && (
              <>
                <h2 style={{ marginTop: "1rem" }}>Academic Details</h2>
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
                <div className="form-group">
                  <label>Enrollment / Roll Number *</label>
                  <input value={form.rollNo} onChange={set("rollNo")} placeholder="e.g. 2024CS001" />
                </div>
              </>
            )}

            {mode === "employee" && (
              <>
                <h2 style={{ marginTop: "1rem" }}>Employment Details</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Employee Number *</label>
                    <input value={form.employeeNo} onChange={set("employeeNo")} placeholder="e.g. EMP-2024-001" />
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
                    <label>Date of Joining</label>
                    <input type="date" value={form.dateOfJoining} onChange={set("dateOfJoining")} />
                  </div>
                </div>
              </>
            )}

            <h2 style={{ marginTop: "1rem" }}>Institution / Company</h2>
            <div className="form-row">
              <div className="form-group">
                <label>{mode === "student" ? "Institution" : "Company"} Name *</label>
                <input value={form.institution} onChange={set("institution")} placeholder={mode === "student" ? "Enter institution name" : "Enter company name"} />
              </div>
              <div className="form-group">
                <label>Purpose *</label>
                <select value={form.purpose} onChange={set("purpose")}>
                  {PURPOSES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>{mode === "student" ? "Institution" : "Company"} Address</label>
              <input value={form.institutionAddress} onChange={set("institutionAddress")} placeholder="Enter address" />
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.15rem" }}>
                {form.institution || (mode === "student" ? "Institution Name" : "Company Name")}
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
                <span><span className="field-label">Ref No:</span> {(mode === "student" ? form.rollNo : form.employeeNo) || "____"}</span>
                <span><span className="field-label">Date:</span> {form.issueDate || "____"}</span>
              </div>

              {mode === "student" ? (
                <>
                  <p style={{ marginTop: "1rem", lineHeight: "1.7" }}>
                    This is to certify that <strong>{form.name || "________"}</strong>,
                    son/daughter of <strong>{form.fatherName || "________"}</strong>
                    {form.dateOfBirth && <>, born on <strong>{fmtDob}</strong></>},
                    is a bonafide student of this institution. He/She is currently enrolled in
                    the <strong>{form.courseName || "________"}</strong> program
                    and is studying in the <strong>{form.year || "____"}</strong> year,
                    bearing Enrollment Number <strong>{form.rollNo || "________"}</strong>.
                  </p>
                </>
              ) : (
                <>
                  <p style={{ marginTop: "1rem", lineHeight: "1.7" }}>
                    This is to certify that <strong>{form.name || "________"}</strong>,
                    son/daughter of <strong>{form.fatherName || "________"}</strong>
                    {form.dateOfBirth && <>, born on <strong>{fmtDob}</strong></>},
                    is a bonafide employee of <strong>{form.institution || "________"}</strong>.
                    He/She is currently working as <strong>{form.designation || "________"}</strong>
                    {form.department && <> in the <strong>{form.department}</strong> department</>},
                    bearing Employee Number <strong>{form.employeeNo || "________"}</strong>
                    {form.dateOfJoining && <>, since <strong>{new Date(form.dateOfJoining).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong></>}.
                  </p>
                </>
              )}

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                This certificate is being issued upon request for the purpose
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
                    {mode === "student" ? "Principal / Registrar" : "HR Manager / Authorised Signatory"}
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

        <ShareButtons text="Free document generator online — no login needed! Try it:" toolName="this generator" />
        <ConversionCTA />
        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, mode, form) {
  const fmtDob = form.dateOfBirth
    ? new Date(form.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : null;

  ctx.addLine(form.institution || (mode === "student" ? "Institution Name" : "Company Name"), { bold: true, size: 14, align: "center" });
  if (form.institutionAddress) {
    ctx.addLine(form.institutionAddress, { size: 9, align: "center", color: [100, 100, 100] });
  }
  ctx.addGap();
  ctx.addLine("BONAFIDE CERTIFICATE", { bold: true, size: 16, align: "center" });
  ctx.addHr();
  ctx.addGap();

  const halfW = ctx.contentWidth / 2;
  ctx.addTableRow(
    [`Ref No: ${(mode === "student" ? form.rollNo : form.employeeNo) || "____"}`, `Date: ${form.issueDate || "____"}`],
    [halfW, halfW]
  );
  ctx.addGap();

  if (mode === "student") {
    let body = `This is to certify that ${form.name || "________"}, son/daughter of ${form.fatherName || "________"}`;
    if (fmtDob) body += `, born on ${fmtDob}`;
    body += `, is a bonafide student of this institution. He/She is currently enrolled in the ${form.courseName || "________"} program and is studying in the ${form.year || "____"} year, bearing Enrollment Number ${form.rollNo || "________"}.`;
    ctx.addParagraph(body);
  } else {
    let body = `This is to certify that ${form.name || "________"}, son/daughter of ${form.fatherName || "________"}`;
    if (fmtDob) body += `, born on ${fmtDob}`;
    body += `, is a bonafide employee of ${form.institution || "________"}. He/She is currently working as ${form.designation || "________"}`;
    if (form.department) body += ` in the ${form.department} department`;
    body += `, bearing Employee Number ${form.employeeNo || "________"}`;
    if (form.dateOfJoining) {
      body += `, since ${new Date(form.dateOfJoining).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`;
    }
    body += ".";
    ctx.addParagraph(body);
  }
  ctx.addGap();

  ctx.addParagraph(
    `This certificate is being issued upon request for the purpose of ${form.purpose || "________"}.`
  );
  ctx.addGap();

  ctx.addParagraph("We wish him/her all the best in future endeavors.");
  ctx.addGap(4);

  ctx.addTableRow(
    ["[VERIFIED]", "________________________"],
    [halfW, halfW]
  );
  ctx.addTableRow(
    ["", mode === "student" ? "Principal / Registrar" : "HR Manager / Authorised Signatory"],
    [halfW, halfW]
  );
}
