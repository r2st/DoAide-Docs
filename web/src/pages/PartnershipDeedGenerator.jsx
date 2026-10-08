import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const DURATION_OPTIONS = ["At Will", "Fixed Term"];

const SLUG = "partnership-deed-generator";

const FAQS = [
  {
    q: "Is a partnership deed mandatory in India?",
    a: "While the Indian Partnership Act, 1932 does not make a written deed mandatory, it is highly recommended. Without a written deed, the provisions of the Partnership Act apply by default — including equal profit sharing regardless of capital contribution. A written deed protects all partners by clearly defining terms, responsibilities, and dispute resolution mechanisms.",
  },
  {
    q: "What is the stamp duty on a partnership deed?",
    a: "Stamp duty varies by state. In Maharashtra, it is ₹500 for a deed up to ₹500 capital and ₹1,000 for higher amounts. In Delhi, it is ₹200-₹1,000. In Karnataka, it is 1% of capital or ₹500, whichever is higher. Check with your local Sub-Registrar office for the exact amount. The deed should be printed on non-judicial stamp paper of the appropriate value.",
  },
  {
    q: "Can partners have unequal profit sharing?",
    a: "Yes, partners can agree to any profit-sharing ratio in the partnership deed. It does not have to be equal or proportional to capital contribution. For example, a partner contributing less capital but more expertise can have a higher profit share. Without a written deed, the Partnership Act defaults to equal sharing regardless of contribution.",
  },
  {
    q: "How many partners can a firm have?",
    a: "Under the Companies Act, 2013 (read with the Partnership Act), a partnership firm can have a maximum of 50 partners for any business. For banking business, the limit is 10 partners. There must be at least 2 partners to form a partnership. For more than 2 partners, the deed can be extended to include additional partner sections.",
  },
  {
    q: "Can a minor be a partner in a firm?",
    a: "A minor cannot be a full partner in a firm, but can be admitted to the benefits of the partnership with the consent of all partners (Section 30, Partnership Act). The minor shares profits but is not personally liable for losses. Upon attaining majority, the minor has 6 months to decide whether to become a full partner or retire.",
  },
  {
    q: "What happens if there is no written partnership deed?",
    a: "Without a written deed, the default provisions of the Indian Partnership Act, 1932 apply: profits and losses are shared equally, no partner receives salary or interest on capital, interest at 6% is payable on loans by partners, and all partners have equal rights in management. This can lead to disputes, especially when partners have unequal contributions.",
  },
];

export default function PartnershipDeedGenerator() {
  const [form, setForm] = useState({
    firmName: "",
    businessNature: "",
    firmAddress: "",
    commencementDate: "",
    partner1Name: "",
    partner1Address: "",
    partner1Capital: "",
    partner1ProfitShare: "",
    partner2Name: "",
    partner2Address: "",
    partner2Capital: "",
    partner2ProfitShare: "",
    duration: "At Will",
    bankName: "",
    accountDetails: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const commencementFormatted = form.commencementDate
    ? new Date(form.commencementDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "________";

  const handleDownload = () => {
    createPdf({
      title: "Partnership Deed",
      filename: `partnership-deed-${(form.firmName || "firm").toLowerCase().replace(/\s+/g, "-")}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form, formattedDate, commencementFormatted),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Partnership Deed\nFirm: ${form.firmName}\nPartners: ${form.partner1Name}, ${form.partner2Name}\nBusiness: ${form.businessNature}\n\nGenerated at docs.doaide.com`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Partnership Deed Generator Online | DoAide Docs"
        description="Generate partnership deeds online for free. Create legally formatted partnership agreements with capital contribution, profit sharing, and all essential terms. Download as PDF instantly. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Partnership Deed</span> Generator</h1>
          <p>
            Create a comprehensive partnership deed in minutes. Fill in partner details, capital, profit sharing ratio,
            and terms — preview the deed and download as PDF. Print on stamp paper for legal validity.
          </p>
          <span className="free-badge">&#10003; 100% FREE — No Login Required</span>
        </div>

        <div className="gen-layout">
          <div className="form-card">
            <h2>Firm Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Firm Name *</label>
                <input value={form.firmName} onChange={set("firmName")} placeholder="Partnership firm name" />
              </div>
              <div className="form-group">
                <label>Nature of Business *</label>
                <input value={form.businessNature} onChange={set("businessNature")} placeholder="e.g. Trading, Manufacturing, Services" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Firm Address *</label>
                <input value={form.firmAddress} onChange={set("firmAddress")} placeholder="Registered office address" />
              </div>
              <div className="form-group">
                <label>Commencement Date</label>
                <input type="date" value={form.commencementDate} onChange={set("commencementDate")} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration</label>
                <select value={form.duration} onChange={set("duration")}>
                  {DURATION_OPTIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Bank Name</label>
                <input value={form.bankName} onChange={set("bankName")} placeholder="Bank for firm account" />
              </div>
            </div>

            <h2 style={{ marginTop: "1.5rem" }}>Partner 1</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input value={form.partner1Name} onChange={set("partner1Name")} placeholder="Partner 1 full name" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input value={form.partner1Address} onChange={set("partner1Address")} placeholder="Residential address" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Capital Contribution (₹)</label>
                <input value={form.partner1Capital} onChange={set("partner1Capital")} placeholder="e.g. 500000" type="number" />
              </div>
              <div className="form-group">
                <label>Profit Share (%)</label>
                <input value={form.partner1ProfitShare} onChange={set("partner1ProfitShare")} placeholder="e.g. 60" type="number" min="0" max="100" />
              </div>
            </div>

            <h2 style={{ marginTop: "1.5rem" }}>Partner 2</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input value={form.partner2Name} onChange={set("partner2Name")} placeholder="Partner 2 full name" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input value={form.partner2Address} onChange={set("partner2Address")} placeholder="Residential address" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Capital Contribution (₹)</label>
                <input value={form.partner2Capital} onChange={set("partner2Capital")} placeholder="e.g. 500000" type="number" />
              </div>
              <div className="form-group">
                <label>Profit Share (%)</label>
                <input value={form.partner2ProfitShare} onChange={set("partner2ProfitShare")} placeholder="e.g. 40" type="number" min="0" max="100" />
              </div>
            </div>
          </div>

          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <h3 style={{ textAlign: "center", marginBottom: "0.25rem" }}>PARTNERSHIP DEED</h3>
              <hr />

              <p style={{ marginTop: "1rem" }}>
                This Deed of Partnership is made and executed on <strong>{formattedDate}</strong> between:
              </p>

              <p style={{ marginTop: "0.75rem" }}>
                <strong>1. {form.partner1Name || "________"}</strong>
                {form.partner1Address ? `, residing at ${form.partner1Address}` : ""}
                {" "}(hereinafter referred to as the "First Partner")
              </p>
              <p>
                <strong>2. {form.partner2Name || "________"}</strong>
                {form.partner2Address ? `, residing at ${form.partner2Address}` : ""}
                {" "}(hereinafter referred to as the "Second Partner")
              </p>

              <p style={{ marginTop: "1rem", fontWeight: "bold" }}>WHEREAS</p>
              <p>
                The parties have mutually agreed to carry on the business of{" "}
                <strong>{form.businessNature || "________"}</strong> in partnership under the name and style of{" "}
                <strong>"{form.firmName || "________"}"</strong>.
              </p>

              <p style={{ marginTop: "1rem", fontWeight: "bold" }}>NOW THIS DEED WITNESSETH AS FOLLOWS:</p>

              <ol style={{ marginTop: "0.75rem", paddingLeft: "1.5rem" }}>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Name of Firm:</strong> The partnership firm shall be known as{" "}
                  <strong>"{form.firmName || "________"}"</strong>.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Nature of Business:</strong> {form.businessNature || "________"}
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Place of Business:</strong> {form.firmAddress || "________"}
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Commencement:</strong> The partnership shall commence from {commencementFormatted}.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Duration:</strong> The partnership shall be {form.duration === "At Will" ? "at will and may be dissolved by any partner giving one month's written notice" : "for a fixed term as agreed"}.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Capital Contribution:</strong>
                  <br />First Partner: ₹{form.partner1Capital || "________"}
                  <br />Second Partner: ₹{form.partner2Capital || "________"}
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Profit and Loss Sharing:</strong>
                  <br />First Partner: {form.partner1ProfitShare || "________"}%
                  <br />Second Partner: {form.partner2ProfitShare || "________"}%
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Banking:</strong> The firm shall maintain a bank account at{" "}
                  {form.bankName || "________"} operated jointly by the partners.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Management:</strong> All partners shall participate in the management and conduct of the business. Major decisions shall require unanimous consent.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Books of Account:</strong> Proper books of account shall be maintained and shall be accessible to all partners at all times. Annual accounts shall be prepared and settled.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Disputes:</strong> Any dispute arising between the partners shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Dissolution:</strong> Upon dissolution, the assets shall be used to settle liabilities, and the surplus shall be distributed according to the profit-sharing ratio.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <strong>Governing Law:</strong> This deed shall be governed by the Indian Partnership Act, 1932, and the laws of India.
                </li>
              </ol>

              <p style={{ marginTop: "1rem" }}>
                IN WITNESS WHEREOF, the partners have signed this deed on the date mentioned above.
              </p>

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>
                    {form.partner1Name || "First Partner"}
                  </p>
                </div>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>
                    {form.partner2Name || "Second Partner"}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem", width: "fit-content" }}>
                  Witness
                </p>
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

function renderPdf(ctx, form, formattedDate, commencementFormatted) {
  ctx.addLine("PARTNERSHIP DEED", { bold: true, size: 16, align: "center" });
  ctx.addGap();
  ctx.addHr();
  ctx.addGap();

  ctx.addParagraph(
    `This Deed of Partnership is made and executed on ${formattedDate} between:`
  );
  ctx.addGap();

  ctx.addParagraph(
    `1. ${form.partner1Name || "________"}${form.partner1Address ? `, residing at ${form.partner1Address}` : ""} (hereinafter referred to as the "First Partner")`
  );
  ctx.addParagraph(
    `2. ${form.partner2Name || "________"}${form.partner2Address ? `, residing at ${form.partner2Address}` : ""} (hereinafter referred to as the "Second Partner")`
  );
  ctx.addGap();

  ctx.addLine("WHEREAS", { bold: true, size: 11 });
  ctx.addParagraph(
    `The parties have mutually agreed to carry on the business of ${form.businessNature || "________"} in partnership under the name and style of "${form.firmName || "________"}".`
  );
  ctx.addGap();

  ctx.addLine("NOW THIS DEED WITNESSETH AS FOLLOWS:", { bold: true, size: 11 });
  ctx.addGap();

  const terms = [
    `Name of Firm: The partnership firm shall be known as "${form.firmName || "________"}".`,
    `Nature of Business: ${form.businessNature || "________"}.`,
    `Place of Business: ${form.firmAddress || "________"}.`,
    `Commencement: The partnership shall commence from ${commencementFormatted}.`,
    `Duration: The partnership shall be ${form.duration === "At Will" ? "at will and may be dissolved by any partner giving one month's written notice" : "for a fixed term as agreed"}.`,
    `Capital Contribution: First Partner: Rs. ${form.partner1Capital || "________"}, Second Partner: Rs. ${form.partner2Capital || "________"}.`,
    `Profit and Loss Sharing: First Partner: ${form.partner1ProfitShare || "________"}%, Second Partner: ${form.partner2ProfitShare || "________"}%.`,
    `Banking: The firm shall maintain a bank account at ${form.bankName || "________"} operated jointly by the partners.`,
    "Management: All partners shall participate in the management and conduct of the business. Major decisions shall require unanimous consent.",
    "Books of Account: Proper books of account shall be maintained and shall be accessible to all partners at all times.",
    "Disputes: Any dispute arising between the partners shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996.",
    "Dissolution: Upon dissolution, the assets shall be used to settle liabilities, and the surplus shall be distributed according to the profit-sharing ratio.",
    "Governing Law: This deed shall be governed by the Indian Partnership Act, 1932, and the laws of India.",
  ];

  terms.forEach((term, i) => {
    ctx.addParagraph(`${i + 1}. ${term}`);
    ctx.addGap(0.5);
  });

  ctx.addGap();
  ctx.addParagraph(
    "IN WITNESS WHEREOF, the partners have signed this deed on the date mentioned above."
  );
  ctx.addGap(3);
  ctx.addHr();
  ctx.addGap();

  const thirdW = ctx.contentWidth / 3;
  ctx.addTableRow(
    [form.partner1Name || "First Partner", form.partner2Name || "Second Partner", "Witness"],
    [thirdW, thirdW, thirdW]
  );
}
