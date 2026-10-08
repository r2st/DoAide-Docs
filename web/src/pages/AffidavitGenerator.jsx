import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const PURPOSE_OPTIONS = [
  "General",
  "Identity Proof",
  "Address Proof",
  "Name Change",
  "Date of Birth",
  "Lost Document",
  "Income",
  "Other",
];

const SLUG = "affidavit-generator";

const FAQS = [
  {
    q: "What is an affidavit?",
    a: "An affidavit is a written sworn statement of facts made voluntarily by an individual (called the deponent). It is used as evidence in legal proceedings and for various official purposes such as applying for a passport, changing your name, or proving your address. The deponent signs the affidavit in the presence of a notary or oath commissioner.",
  },
  {
    q: "Is a self-made affidavit legally valid in India?",
    a: "A self-drafted affidavit is valid if it is printed on appropriate stamp paper (value varies by state, usually ₹10-₹100) and notarized by a Notary Public or sworn before an Oath Commissioner / Magistrate. Without notarization, it may not be accepted by courts or government authorities.",
  },
  {
    q: "Does an affidavit need to be notarized?",
    a: "Yes, for most official and legal purposes in India, an affidavit must be notarized. Notarization involves the Notary Public verifying the identity of the deponent, witnessing their signature, and affixing a notary seal. The cost of notarization is typically ₹50-₹200 depending on the city and complexity.",
  },
  {
    q: "What is the cost of an affidavit in India?",
    a: "The total cost includes stamp paper (₹10-₹100 depending on the state) plus notarization fees (₹50-₹200). If drafted by a lawyer, additional drafting charges may apply (₹200-₹500). Using DoAide Docs, you can generate the affidavit for free — you only need to pay for stamp paper and notarization.",
  },
  {
    q: "Can I use an affidavit as address proof?",
    a: "Yes, a notarized affidavit stating your current address can be used as address proof for various purposes including bank account opening, Aadhaar update, voter ID application, and passport issuance. However, some institutions may also require supporting documents like utility bills or rent agreements.",
  },
  {
    q: "What is the difference between an affidavit and a declaration?",
    a: "An affidavit is a sworn statement made before a Notary Public or Oath Commissioner and has legal consequences if found to be false (perjury). A declaration is a simpler written statement that does not require notarization. Affidavits carry more legal weight and are used in courts and government offices, while declarations are used for less formal purposes.",
  },
];

export default function AffidavitGenerator() {
  const [form, setForm] = useState({
    deponentName: "",
    deponentAge: "",
    deponentAddress: "",
    deponentFatherName: "",
    purpose: "General",
    content: "",
    placeOfExecution: "",
    idProof: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleDownload = () => {
    createPdf({
      title: "Affidavit",
      filename: `affidavit-${form.purpose.toLowerCase().replace(/\s+/g, "-")}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form, formattedDate),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Affidavit\nDeponent: ${form.deponentName}\nPurpose: ${form.purpose}\nPlace: ${form.placeOfExecution || "N/A"}\n\nGenerated at docs.doaide.com`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Affidavit Generator Online | DoAide Docs"
        description="Generate affidavits online for free. Create affidavits for identity proof, address proof, name change, lost documents, income declaration, and more. Download as PDF instantly. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Affidavit</span> Generator</h1>
          <p>
            Create a legally formatted affidavit in seconds. Fill in the details, preview the document, and download as PDF.
            Print on stamp paper and get it notarized for official use.
          </p>
          <span className="free-badge">&#10003; 100% FREE — No Login Required</span>
        </div>

        <div className="gen-layout">
          <div className="form-card">
            <h2>Deponent Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  value={form.deponentName}
                  onChange={set("deponentName")}
                  placeholder="Deponent's full name"
                />
              </div>
              <div className="form-group">
                <label>Age *</label>
                <input
                  value={form.deponentAge}
                  onChange={set("deponentAge")}
                  placeholder="e.g. 35"
                  type="number"
                  min="18"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Father's / Spouse's Name</label>
                <input
                  value={form.deponentFatherName}
                  onChange={set("deponentFatherName")}
                  placeholder="Father's or spouse's name"
                />
              </div>
              <div className="form-group">
                <label>Purpose *</label>
                <select value={form.purpose} onChange={set("purpose")}>
                  {PURPOSE_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                value={form.deponentAddress}
                onChange={set("deponentAddress")}
                placeholder="Complete residential address"
              />
            </div>

            <div className="form-group">
              <label>Affidavit Content / Statements *</label>
              <textarea
                value={form.content}
                onChange={set("content")}
                placeholder="Enter the statements you want to declare in the affidavit. Each statement on a new line will be numbered automatically. Example:&#10;My name is as stated above and is correct.&#10;I reside at the above-mentioned address.&#10;I am making this affidavit for the purpose of..."
                rows={5}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Place of Execution</label>
                <input
                  value={form.placeOfExecution}
                  onChange={set("placeOfExecution")}
                  placeholder="e.g. Mumbai, Delhi"
                />
              </div>
              <div className="form-group">
                <label>ID Proof Reference</label>
                <input
                  value={form.idProof}
                  onChange={set("idProof")}
                  placeholder="e.g. Aadhaar / PAN number"
                />
              </div>
            </div>
          </div>

          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <h3 style={{ textAlign: "center", marginBottom: "0.25rem" }}>AFFIDAVIT</h3>
              <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#666", marginBottom: "0.5rem" }}>
                ({form.purpose} Affidavit)
              </p>
              <hr />

              <p style={{ marginTop: "1rem" }}>
                I, <strong>{form.deponentName || "________"}</strong>,
                {form.deponentAge ? ` aged ${form.deponentAge} years,` : ""}
                {form.deponentFatherName ? ` son/daughter of ${form.deponentFatherName},` : ""}
                {form.deponentAddress ? ` residing at ${form.deponentAddress},` : ""}
                {" "}do hereby solemnly affirm and declare as follows:
              </p>

              {form.content ? (
                <ol style={{ marginTop: "1rem", paddingLeft: "1.5rem" }}>
                  {form.content.split("\n").filter(Boolean).map((line, i) => (
                    <li key={i} style={{ marginBottom: "0.5rem" }}>{line.trim()}</li>
                  ))}
                </ol>
              ) : (
                <p style={{ marginTop: "1rem", color: "#999", fontStyle: "italic" }}>
                  (Affidavit statements will appear here...)
                </p>
              )}

              <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "4px" }}>
                <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>VERIFICATION</p>
                <p>
                  I, the above-named deponent, do hereby verify that the contents of the above affidavit are true and
                  correct to the best of my knowledge and belief, and nothing material has been concealed therefrom.
                </p>
                <p style={{ marginTop: "0.5rem" }}>
                  Verified at <strong>{form.placeOfExecution || "________"}</strong> on this{" "}
                  <strong>{formattedDate}</strong>.
                </p>
              </div>

              {form.idProof && (
                <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
                  ID Proof: <strong>{form.idProof}</strong>
                </p>
              )}

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>
                    {form.deponentName || "Deponent Signature"}
                  </p>
                </div>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>
                    Notary / Oath Commissioner
                  </p>
                </div>
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

function renderPdf(ctx, form, formattedDate) {
  ctx.addLine("AFFIDAVIT", { bold: true, size: 16, align: "center" });
  ctx.addLine(`(${form.purpose} Affidavit)`, { size: 10, align: "center" });
  ctx.addGap();
  ctx.addHr();
  ctx.addGap();

  let intro = `I, ${form.deponentName || "________"}`;
  if (form.deponentAge) intro += `, aged ${form.deponentAge} years`;
  if (form.deponentFatherName) intro += `, son/daughter of ${form.deponentFatherName}`;
  if (form.deponentAddress) intro += `, residing at ${form.deponentAddress}`;
  intro += ", do hereby solemnly affirm and declare as follows:";
  ctx.addParagraph(intro);
  ctx.addGap();

  if (form.content) {
    const lines = form.content.split("\n").filter(Boolean);
    lines.forEach((line, i) => {
      ctx.addParagraph(`${i + 1}. ${line.trim()}`);
      ctx.addGap(0.5);
    });
  }

  ctx.addGap();
  ctx.addLine("VERIFICATION", { bold: true, size: 11 });
  ctx.addGap();
  ctx.addParagraph(
    "I, the above-named deponent, do hereby verify that the contents of the above affidavit are true and correct to the best of my knowledge and belief, and nothing material has been concealed therefrom."
  );
  ctx.addGap();
  ctx.addParagraph(
    `Verified at ${form.placeOfExecution || "________"} on this ${formattedDate}.`
  );

  if (form.idProof) {
    ctx.addGap();
    ctx.addFieldRow("ID Proof:", form.idProof);
  }

  ctx.addGap(3);
  ctx.addHr();
  ctx.addGap();

  const halfW = ctx.contentWidth / 2;
  ctx.addTableRow(
    [form.deponentName || "Deponent Signature", "Notary / Oath Commissioner"],
    [halfW, halfW]
  );
  ctx.addTableRow(["(Deponent)", "(Seal & Signature)"], [halfW, halfW]);
}
