import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "power-of-attorney-generator";

const FAQS = [
  { q: "What is a Power of Attorney (PoA)?", a: "A Power of Attorney is a legal document that authorizes one person (the agent or attorney-in-fact) to act on behalf of another person (the principal) in legal, financial, or other matters. It can be general or specific in scope." },
  { q: "What is the difference between General and Special Power of Attorney?", a: "A General Power of Attorney grants broad authority to the agent to handle all affairs of the principal, including financial transactions, property management, and legal matters. A Special Power of Attorney limits the agent's authority to specific tasks or transactions mentioned in the document." },
  { q: "Does a Power of Attorney need to be registered?", a: "In India, a Power of Attorney dealing with immovable property must be registered under the Registration Act, 1908. Other types of PoA may be executed on stamp paper and notarized without registration, though registration adds legal validity." },
  { q: "Can a Power of Attorney be revoked?", a: "Yes, a Power of Attorney can be revoked at any time by the principal, provided they are mentally competent. The revocation should be in writing and communicated to the agent and any third parties who were relying on the PoA." },
  { q: "Does a Power of Attorney expire?", a: "A Power of Attorney can be made for a specific duration or it remains valid until the principal revokes it, becomes incapacitated, or passes away. A Durable Power of Attorney remains effective even if the principal becomes incapacitated." },
  { q: "Who can be appointed as an agent in a Power of Attorney?", a: "Any competent adult can be appointed as an agent. It is common to appoint a trusted family member, friend, or legal professional. The agent must be willing to accept the responsibility and act in the principal's best interest." },
];

export default function PowerOfAttorneyGenerator() {
  const [form, setForm] = useState({
    principalName: "",
    principalAddress: "",
    agentName: "",
    agentAddress: "",
    purpose: "general",
    specificPowers: "",
    effectiveDate: "",
    witness1: "",
    witness2: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Power of Attorney",
      filename: `power-of-attorney-${form.principalName || "document"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Power of Attorney\nPrincipal: ${form.principalName}\nAgent: ${form.agentName}\nType: ${form.purpose === "general" ? "General" : "Special"} Power of Attorney\nEffective Date: ${form.effectiveDate}\n\nGenerated at docs.doaide.com`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Power of Attorney Generator Online | DoAide Docs"
        description="Generate Power of Attorney documents online for free. Create General or Special PoA, download as PDF. No login required. Includes principal, agent details, and witness sections."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Power of Attorney</span> Generator</h1>
          <p>Generate Power of Attorney documents instantly. Fill in the details, preview the document, and download as PDF. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>PoA Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="principalName">Principal Name *</label>
                <input id="principalName" value={form.principalName} onChange={set("principalName")} placeholder="Full name of the principal" />
              </div>
              <div className="form-group">
                <label htmlFor="agentName">Agent Name *</label>
                <input id="agentName" value={form.agentName} onChange={set("agentName")} placeholder="Full name of the agent" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="principalAddress">Principal Address *</label>
                <input id="principalAddress" value={form.principalAddress} onChange={set("principalAddress")} placeholder="Address of the principal" />
              </div>
              <div className="form-group">
                <label htmlFor="agentAddress">Agent Address *</label>
                <input id="agentAddress" value={form.agentAddress} onChange={set("agentAddress")} placeholder="Address of the agent" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="purpose">Type of PoA *</label>
                <select id="purpose" value={form.purpose} onChange={set("purpose")}>
                  <option value="general">General Power of Attorney</option>
                  <option value="special">Special Power of Attorney</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="effectiveDate">Effective Date *</label>
                <input id="effectiveDate" type="date" value={form.effectiveDate} onChange={set("effectiveDate")} />
              </div>
            </div>

            {form.purpose === "special" && (
              <div className="form-group">
                <label htmlFor="specificPowers">Specific Powers Granted *</label>
                <textarea
                  id="specificPowers"
                  value={form.specificPowers}
                  onChange={set("specificPowers")}
                  placeholder="Describe the specific powers being granted to the agent, e.g., to sell property at [address], to operate bank account [number], etc."
                  rows={4}
                />
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="witness1">Witness 1 Name</label>
                <input id="witness1" value={form.witness1} onChange={set("witness1")} placeholder="Full name of witness 1" />
              </div>
              <div className="form-group">
                <label htmlFor="witness2">Witness 2 Name</label>
                <input id="witness2" value={form.witness2} onChange={set("witness2")} placeholder="Full name of witness 2" />
              </div>
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <p className="company-name" style={{ textAlign: "center", fontSize: "0.85rem", color: "#666", marginBottom: "0.25rem" }}>
                DoAide Docs
              </p>
              <h3 className="doc-title" style={{ textAlign: "center", marginBottom: "0.25rem" }}>
                {form.purpose === "general" ? "GENERAL" : "SPECIAL"} POWER OF ATTORNEY
              </h3>
              <hr />

              <div className="field-row" style={{ marginTop: "1rem" }}>
                <span className="field-label">Effective Date:</span> {form.effectiveDate || "________"}
              </div>

              <p style={{ marginTop: "1rem", lineHeight: 1.7 }}>
                I, <strong>{form.principalName || "________"}</strong>, residing at{" "}
                <strong>{form.principalAddress || "________"}</strong>, hereinafter referred to as
                the <strong>"Principal"</strong>, do hereby appoint and constitute{" "}
                <strong>{form.agentName || "________"}</strong>, residing at{" "}
                <strong>{form.agentAddress || "________"}</strong>, hereinafter referred to as
                the <strong>"Agent"</strong> or <strong>"Attorney-in-Fact"</strong>, to act on my
                behalf as described herein.
              </p>

              <h4 style={{ marginTop: "1.25rem", marginBottom: "0.5rem" }}>Powers Granted</h4>
              {form.purpose === "general" ? (
                <p style={{ lineHeight: 1.7 }}>
                  The Principal hereby grants the Agent full and general authority to act on the
                  Principal's behalf in all matters, including but not limited to: managing financial
                  accounts, executing contracts, handling real estate transactions, conducting
                  business operations, and performing any other lawful act that the Principal could
                  do personally.
                </p>
              ) : (
                <p style={{ lineHeight: 1.7 }}>
                  The Principal hereby grants the Agent the following specific powers:{" "}
                  <strong>{form.specificPowers || "________"}</strong>
                </p>
              )}

              <h4 style={{ marginTop: "1.25rem", marginBottom: "0.5rem" }}>Terms and Conditions</h4>
              <p style={{ lineHeight: 1.7 }}>
                This Power of Attorney shall be effective from{" "}
                <strong>{form.effectiveDate || "________"}</strong> and shall remain in effect until
                revoked in writing by the Principal. The Agent shall act in good faith and in the
                best interest of the Principal at all times.
              </p>

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
                <div className="signature-line">
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", minWidth: "150px" }}>
                    {form.principalName || "Principal Signature"}
                  </p>
                </div>
                <div className="signature-line">
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", minWidth: "150px" }}>
                    {form.agentName || "Agent Signature"}
                  </p>
                </div>
              </div>

              {(form.witness1 || form.witness2) && (
                <div style={{ marginTop: "1.5rem" }}>
                  <h4 style={{ marginBottom: "0.5rem" }}>Witnesses</h4>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="signature-line">
                      <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", minWidth: "150px" }}>
                        {form.witness1 || "Witness 1"}
                      </p>
                    </div>
                    <div className="signature-line">
                      <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", minWidth: "150px" }}>
                        {form.witness2 || "Witness 2"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
  ctx.addLine("DoAide Docs", { size: 10, align: "center", color: [100, 100, 100] });
  ctx.addGap();
  ctx.addLine(
    `${form.purpose === "general" ? "GENERAL" : "SPECIAL"} POWER OF ATTORNEY`,
    { bold: true, size: 16, align: "center" }
  );
  ctx.addGap();
  ctx.addHr();
  ctx.addGap();

  ctx.addFieldRow("Effective Date:", form.effectiveDate || "________");
  ctx.addGap();

  ctx.addParagraph(
    `I, ${form.principalName || "________"}, residing at ${form.principalAddress || "________"}, hereinafter referred to as the "Principal", do hereby appoint and constitute ${form.agentName || "________"}, residing at ${form.agentAddress || "________"}, hereinafter referred to as the "Agent" or "Attorney-in-Fact", to act on my behalf as described herein.`
  );
  ctx.addGap();

  ctx.addLine("Powers Granted", { bold: true, size: 12 });
  ctx.addGap();

  if (form.purpose === "general") {
    ctx.addParagraph(
      "The Principal hereby grants the Agent full and general authority to act on the Principal's behalf in all matters, including but not limited to: managing financial accounts, executing contracts, handling real estate transactions, conducting business operations, and performing any other lawful act that the Principal could do personally."
    );
  } else {
    ctx.addParagraph(
      `The Principal hereby grants the Agent the following specific powers: ${form.specificPowers || "________"}`
    );
  }
  ctx.addGap();

  ctx.addLine("Terms and Conditions", { bold: true, size: 12 });
  ctx.addGap();

  ctx.addParagraph(
    `This Power of Attorney shall be effective from ${form.effectiveDate || "________"} and shall remain in effect until revoked in writing by the Principal. The Agent shall act in good faith and in the best interest of the Principal at all times.`
  );
  ctx.addGap(3);

  ctx.addHr();
  ctx.addGap();

  const halfW = ctx.contentWidth / 2;
  ctx.addTableRow(
    [form.principalName || "Principal Signature", form.agentName || "Agent Signature"],
    [halfW, halfW]
  );
  ctx.addTableRow(["(Principal)", "(Agent)"], [halfW, halfW]);

  if (form.witness1 || form.witness2) {
    ctx.addGap(2);
    ctx.addLine("Witnesses", { bold: true, size: 11 });
    ctx.addGap();
    ctx.addTableRow(
      [form.witness1 || "Witness 1", form.witness2 || "Witness 2"],
      [halfW, halfW]
    );
  }
}
