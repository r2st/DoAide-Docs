import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import ConversionCTA from "../components/ConversionCTA";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "noc-letter-generator";

const NOC_TYPES = [
  { key: "vehicle", label: "Vehicle NOC" },
  { key: "society", label: "Society NOC" },
  { key: "employer", label: "Employer NOC" },
  { key: "bank", label: "Bank NOC" },
];

const FAQS = [
  {
    q: "What is a No Objection Certificate (NOC)?",
    a: "A No Objection Certificate (NOC) is a legal document issued by an organization, institution, or individual stating that they have no objection to the details mentioned in the certificate. It is commonly used for vehicle transfer, society clearances, employment changes, and bank loan closures.",
  },
  {
    q: "When is a Vehicle NOC required?",
    a: "A Vehicle NOC is required when transferring vehicle ownership to another person, moving a vehicle's registration to a different state (RTO transfer), or when selling a financed vehicle after loan closure. The NOC is issued by the current RTO or the financing bank.",
  },
  {
    q: "What is a Society NOC?",
    a: "A Society NOC is issued by a housing society or resident welfare association (RWA) to confirm that a member has no outstanding dues and the society has no objection to the sale, transfer, or renovation of the property. It is commonly required during property transactions.",
  },
  {
    q: "What is an Employer NOC?",
    a: "An Employer NOC is issued by the current employer stating they have no objection to the employee seeking employment elsewhere, pursuing higher education, applying for a passport or visa, or undertaking freelance or part-time work.",
  },
  {
    q: "What is a Bank NOC?",
    a: "A Bank NOC is issued after full repayment of a loan — home loan, vehicle loan, or personal loan. It confirms that the borrower has cleared all dues and the bank has no claim on the asset. It is essential for removing the lien on the asset's documents.",
  },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function fmtDate(iso) {
  if (!iso) return "___";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function getBodyText(type, form) {
  switch (type) {
    case "vehicle":
      return `This is to certify that ${form.issuerOrg || "________"} has no objection to the transfer of vehicle bearing Registration Number ${form.vehicleRegNo || "________"} (${form.vehicleMake || "________"}, ${form.vehicleModel || "________"}) from ${form.sellerName || "________"} to ${form.buyerName || "________"}. All dues related to the said vehicle have been cleared and there are no pending claims, liabilities, or encumbrances against it.`;
    case "society":
      return `This is to certify that ${form.memberName || "________"}, residing at ${form.flatNo || "________"}, ${form.issuerOrg || "________"}, has cleared all outstanding dues including maintenance charges, parking fees, and other society levies up to ${fmtDate(form.issueDate)}. The society has no objection to the ${form.societyPurpose || "sale/transfer"} of the said property.`;
    case "employer":
      return `This is to certify that ${form.employeeName || "________"}, holding the position of ${form.empDesignation || "________"} (Employee ID: ${form.empId || "________"}), has been an employee of ${form.issuerOrg || "________"}. We have no objection to ${form.employeeName || "the employee"} ${form.empPurpose || "seeking employment with another organisation"}.`;
    case "bank":
      return `This is to certify that the loan (Account No: ${form.loanAccountNo || "________"}, Loan Type: ${form.loanType || "________"}) availed by ${form.borrowerName || "________"} has been fully repaid as on ${fmtDate(form.loanClosureDate)}. ${form.issuerOrg || "________"} has no claim or lien on the asset against which the loan was sanctioned. All original documents pertaining to the loan have been returned / are ready for collection.`;
    default:
      return "";
  }
}

function getNocTitle(type) {
  switch (type) {
    case "vehicle": return "VEHICLE NO OBJECTION CERTIFICATE";
    case "society": return "SOCIETY NO OBJECTION CERTIFICATE";
    case "employer": return "EMPLOYER NO OBJECTION CERTIFICATE";
    case "bank": return "BANK NO OBJECTION CERTIFICATE";
    default: return "NO OBJECTION CERTIFICATE";
  }
}

export default function NocLetterGenerator() {
  const [nocType, setNocType] = useState("vehicle");
  const [form, setForm] = useState({
    issuerName: "",
    issuerDesignation: "",
    issuerOrg: "",
    issueDate: todayStr(),
    referenceNo: "",
    // Vehicle
    vehicleRegNo: "",
    vehicleMake: "",
    vehicleModel: "",
    sellerName: "",
    buyerName: "",
    // Society
    memberName: "",
    flatNo: "",
    societyPurpose: "sale/transfer of the property",
    // Employer
    employeeName: "",
    empDesignation: "",
    empId: "",
    empPurpose: "seeking employment with another organisation",
    // Bank
    borrowerName: "",
    loanAccountNo: "",
    loanType: "Home Loan",
    loanClosureDate: todayStr(),
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: getNocTitle(nocType),
      filename: `noc-${nocType}-${form.issueDate || "undated"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, nocType, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hey! I just created a professional NOC (No Objection Certificate) using DoAide Docs -- completely free and no login needed. Check it out: https://docs.doaide.com/${SLUG}`
    );
  };

  return (
    <>
      <SeoHead
        title="Free NOC Generator Online — Vehicle, Society, Employer, Bank | DoAide Docs"
        description="Generate No Objection Certificate (NOC) online for free. Create professional NOC letters for vehicle transfer, society clearance, employer, and bank loan closure. Download as PDF instantly."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>NOC Letter</span> Generator</h1>
          <p>Create a professional No Objection Certificate instantly. Choose the type, fill in the details, preview, and download as PDF. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>NOC Type</h2>
            <div className="noc-type-tabs">
              {NOC_TYPES.map((t) => (
                <button
                  key={t.key}
                  className={`noc-type-tab${nocType === t.key ? " active" : ""}`}
                  onClick={() => setNocType(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <h2>Issuer Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Issuer Name *</label>
                <input value={form.issuerName} onChange={set("issuerName")} placeholder="Name of the person issuing NOC" />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input value={form.issuerDesignation} onChange={set("issuerDesignation")} placeholder="e.g. Branch Manager" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Organisation / Bank *</label>
                <input value={form.issuerOrg} onChange={set("issuerOrg")} placeholder="Company, society, or bank name" />
              </div>
              <div className="form-group">
                <label>Issue Date *</label>
                <input type="date" value={form.issueDate} onChange={set("issueDate")} />
              </div>
            </div>
            <div className="form-group">
              <label>Reference No</label>
              <input value={form.referenceNo} onChange={set("referenceNo")} placeholder="e.g. NOC/2026/001 (optional)" />
            </div>

            {/* Vehicle-specific fields */}
            {nocType === "vehicle" && (
              <>
                <h2 style={{ marginTop: "1rem" }}>Vehicle Details</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Registration Number *</label>
                    <input value={form.vehicleRegNo} onChange={set("vehicleRegNo")} placeholder="e.g. MH02AB1234" />
                  </div>
                  <div className="form-group">
                    <label>Vehicle Make *</label>
                    <input value={form.vehicleMake} onChange={set("vehicleMake")} placeholder="e.g. Maruti Suzuki" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Vehicle Model *</label>
                    <input value={form.vehicleModel} onChange={set("vehicleModel")} placeholder="e.g. Swift Dzire" />
                  </div>
                  <div className="form-group">
                    <label>Seller Name *</label>
                    <input value={form.sellerName} onChange={set("sellerName")} placeholder="Current owner name" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Buyer Name *</label>
                  <input value={form.buyerName} onChange={set("buyerName")} placeholder="New owner name" />
                </div>
              </>
            )}

            {/* Society-specific fields */}
            {nocType === "society" && (
              <>
                <h2 style={{ marginTop: "1rem" }}>Member Details</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Member Name *</label>
                    <input value={form.memberName} onChange={set("memberName")} placeholder="Name of society member" />
                  </div>
                  <div className="form-group">
                    <label>Flat / Unit No *</label>
                    <input value={form.flatNo} onChange={set("flatNo")} placeholder="e.g. A-401, Tower B" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Purpose</label>
                  <select value={form.societyPurpose} onChange={set("societyPurpose")}>
                    <option value="sale/transfer of the property">Sale / Transfer</option>
                    <option value="renovation/modification of the flat">Renovation</option>
                    <option value="renting/leasing of the property">Renting / Leasing</option>
                    <option value="obtaining a home loan">Home Loan</option>
                  </select>
                </div>
              </>
            )}

            {/* Employer-specific fields */}
            {nocType === "employer" && (
              <>
                <h2 style={{ marginTop: "1rem" }}>Employee Details</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Employee Name *</label>
                    <input value={form.employeeName} onChange={set("employeeName")} placeholder="Full name of the employee" />
                  </div>
                  <div className="form-group">
                    <label>Designation *</label>
                    <input value={form.empDesignation} onChange={set("empDesignation")} placeholder="e.g. Senior Developer" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Employee ID</label>
                    <input value={form.empId} onChange={set("empId")} placeholder="e.g. EMP-001" />
                  </div>
                  <div className="form-group">
                    <label>Purpose</label>
                    <select value={form.empPurpose} onChange={set("empPurpose")}>
                      <option value="seeking employment with another organisation">New Employment</option>
                      <option value="pursuing higher education">Higher Education</option>
                      <option value="applying for a passport">Passport Application</option>
                      <option value="applying for a visa">Visa Application</option>
                      <option value="undertaking freelance or part-time work">Freelance / Part-time Work</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Bank-specific fields */}
            {nocType === "bank" && (
              <>
                <h2 style={{ marginTop: "1rem" }}>Loan Details</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Borrower Name *</label>
                    <input value={form.borrowerName} onChange={set("borrowerName")} placeholder="Full name of the borrower" />
                  </div>
                  <div className="form-group">
                    <label>Loan Account No *</label>
                    <input value={form.loanAccountNo} onChange={set("loanAccountNo")} placeholder="e.g. HL0012345678" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Loan Type *</label>
                    <select value={form.loanType} onChange={set("loanType")}>
                      <option>Home Loan</option>
                      <option>Vehicle Loan</option>
                      <option>Personal Loan</option>
                      <option>Education Loan</option>
                      <option>Gold Loan</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Loan Closure Date *</label>
                    <input type="date" value={form.loanClosureDate} onChange={set("loanClosureDate")} />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.1rem" }}>
                {form.issuerOrg || "Organisation Name"}
              </p>
              <h3 className="doc-title" style={{ textAlign: "center", marginBottom: "0.5rem", textDecoration: "underline" }}>
                {getNocTitle(nocType)}
              </h3>

              {form.referenceNo && (
                <div className="field-row" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
                  <span><span className="field-label">Ref No:</span> {form.referenceNo}</span>
                  <span><span className="field-label">Date:</span> {fmtDate(form.issueDate)}</span>
                </div>
              )}
              {!form.referenceNo && (
                <p style={{ textAlign: "right", fontSize: "0.85rem", color: "#666", marginBottom: "0.5rem" }}>
                  <span className="field-label">Date:</span> {fmtDate(form.issueDate)}
                </p>
              )}

              <hr />

              <p style={{ marginTop: "1rem", fontWeight: "bold" }}>To Whom It May Concern,</p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                {getBodyText(nocType, form)}
              </p>

              <p style={{ marginTop: "0.75rem", lineHeight: "1.7" }}>
                This No Objection Certificate is issued on {fmtDate(form.issueDate)} for official records and necessary action.
              </p>

              <div style={{ marginTop: "2.5rem" }}>
                <p style={{ marginBottom: "0.25rem" }}>Yours faithfully,</p>
                <div className="signature-line" style={{ marginTop: "2rem", borderTop: "1px solid #999", width: "200px", paddingTop: "0.25rem" }}>
                  <p style={{ fontWeight: "bold" }}>{form.issuerName || "Authorized Signatory"}</p>
                  {form.issuerDesignation && <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.issuerDesignation}</p>}
                  <p style={{ fontSize: "0.85rem", color: "#666" }}>{form.issuerOrg || "Organisation"}</p>
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

function renderPdf(ctx, nocType, form) {
  ctx.addLine(form.issuerOrg || "Organisation Name", { bold: true, size: 14, align: "center" });
  ctx.addGap();
  ctx.addLine(getNocTitle(nocType), { bold: true, size: 14, align: "center" });
  ctx.addGap();

  if (form.referenceNo) {
    ctx.addFieldRow("Ref No:", form.referenceNo);
  }
  ctx.addFieldRow("Date:", fmtDate(form.issueDate));
  ctx.addHr();
  ctx.addGap();

  ctx.addLine("To Whom It May Concern,", { bold: true, size: 11 });
  ctx.addGap();

  ctx.addParagraph(getBodyText(nocType, form));
  ctx.addGap();

  ctx.addParagraph(
    `This No Objection Certificate is issued on ${fmtDate(form.issueDate)} for official records and necessary action.`
  );
  ctx.addGap(3);

  ctx.addLine("Yours faithfully,", { size: 11 });
  ctx.addGap(3);
  ctx.addHr();
  ctx.addLine(form.issuerName || "Authorized Signatory", { bold: true, size: 11 });
  if (form.issuerDesignation) {
    ctx.addLine(form.issuerDesignation, { size: 10 });
  }
  ctx.addLine(form.issuerOrg || "Organisation", { size: 10 });
}
