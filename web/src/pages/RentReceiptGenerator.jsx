import { useState } from "react";
import SeoHead from "../components/SeoHead";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

function numberToWords(num) {
  if (!num || isNaN(num)) return "";
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const n = parseInt(num, 10);
  if (n === 0) return "Zero";
  if (n < 20) return a[n];
  if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
  if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + numberToWords(n % 100) : "");
  if (n < 100000) return numberToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + numberToWords(n % 1000) : "");
  if (n < 10000000) return numberToWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + numberToWords(n % 100000) : "");
  return numberToWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + numberToWords(n % 10000000) : "");
}

const SLUG = "rent-receipt-generator";

const FAQS = [
  { q: "Why do I need a rent receipt for HRA exemption?", a: "Under Section 10(13A) of the Income Tax Act, salaried individuals can claim HRA exemption by submitting rent receipts to their employer. Rent receipts above Rs 3,000/month must include a revenue stamp." },
  { q: "What details should a rent receipt contain?", a: "A valid rent receipt must include the landlord's name, tenant's name, rented property address, rent amount, payment date, payment mode, and the landlord's signature." },
  { q: "Who needs to provide rent receipts?", a: "Any salaried individual paying rent and claiming HRA exemption needs rent receipts. If your annual rent exceeds Rs 1,00,000, you also need to provide the landlord's PAN." },
  { q: "Can I generate rent receipts for past months?", a: "Yes, you can generate rent receipts for any month. However, they should be generated for the period you actually paid rent." },
  { q: "Is a revenue stamp mandatory on rent receipts?", a: "A revenue stamp is required when the monthly rent exceeds Rs 5,000 and payment is made in cash. For digital payments, a revenue stamp is not mandatory." },
];

export default function RentReceiptGenerator() {
  const [form, setForm] = useState({
    landlordName: "",
    tenantName: "",
    address: "",
    rentAmount: "",
    month: MONTHS[new Date().getMonth()],
    year: String(currentYear),
    paymentMode: "Bank Transfer",
    receiptNo: "001",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    createPdf({
      title: "Rent Receipt",
      filename: `rent-receipt-${form.month}-${form.year}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Rent Receipt\nReceipt No: ${form.receiptNo}\nTenant: ${form.tenantName}\nLandlord: ${form.landlordName}\nAmount: Rs ${form.rentAmount}\nMonth: ${form.month} ${form.year}\n\nGenerated at docs.doaide.com`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Rent Receipt Generator Online | DoAide Docs"
        description="Generate rent receipts online for free. Download as PDF for HRA tax exemption. No login required. Includes landlord details, amount in words, and payment mode."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Rent Receipt</span> Generator</h1>
          <p>Generate rent receipts instantly for HRA tax exemption. Fill the form, preview, and download as PDF. 100% free, no sign-up needed.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Receipt Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Receipt No</label>
                <input value={form.receiptNo} onChange={set("receiptNo")} placeholder="001" />
              </div>
              <div className="form-group">
                <label>Payment Mode</label>
                <select value={form.paymentMode} onChange={set("paymentMode")}>
                  <option>Cash</option>
                  <option>Cheque</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Landlord Name *</label>
              <input value={form.landlordName} onChange={set("landlordName")} placeholder="Enter landlord's full name" />
            </div>

            <div className="form-group">
              <label>Tenant Name *</label>
              <input value={form.tenantName} onChange={set("tenantName")} placeholder="Enter tenant's full name" />
            </div>

            <div className="form-group">
              <label>Rented Property Address *</label>
              <input value={form.address} onChange={set("address")} placeholder="Full address of the rented property" />
            </div>

            <div className="form-group">
              <label>Monthly Rent (Rs) *</label>
              <input type="number" value={form.rentAmount} onChange={set("rentAmount")} placeholder="e.g. 15000" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Month</label>
                <select value={form.month} onChange={set("month")}>
                  {MONTHS.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Year</label>
                <select value={form.year} onChange={set("year")}>
                  {YEARS.map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <h3 style={{ textAlign: "center", marginBottom: "0.25rem" }}>RENT RECEIPT</h3>
              <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#666", marginBottom: "1rem" }}>
                Receipt No: {form.receiptNo || "___"}
              </p>
              <hr />

              <p style={{ marginTop: "1rem" }}>
                <strong>Date:</strong> {form.month} {form.year}
              </p>
              <p>
                Received a sum of <strong>Rs {form.rentAmount || "____"}</strong>
                {form.rentAmount && <> ({numberToWords(form.rentAmount)} Rupees Only)</>} from{" "}
                <strong>{form.tenantName || "________"}</strong> towards rent for the property located at{" "}
                <strong>{form.address || "________"}</strong> for the month of{" "}
                <strong>{form.month} {form.year}</strong>.
              </p>
              <p><strong>Payment Mode:</strong> {form.paymentMode}</p>

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>
                    {form.tenantName || "Tenant Signature"}
                  </p>
                </div>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>
                    {form.landlordName || "Landlord Signature"}
                  </p>
                </div>
              </div>
              {form.rentAmount && Number(form.rentAmount) > 5000 && form.paymentMode === "Cash" && (
                <p style={{ fontSize: "0.75rem", color: "#c00", marginTop: "1rem" }}>
                  * Revenue stamp required for cash payments above Rs 5,000
                </p>
              )}
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
  ctx.addLine("RENT RECEIPT", { bold: true, size: 16, align: "center" });
  ctx.addGap();
  ctx.addLine(`Receipt No: ${form.receiptNo}`, { size: 10, align: "right" });
  ctx.addHr();
  ctx.addGap();
  ctx.addFieldRow("Date:", `${form.month} ${form.year}`);
  ctx.addGap();
  ctx.addParagraph(
    `Received a sum of Rs ${form.rentAmount || "____"} (${numberToWords(form.rentAmount)} Rupees Only) from ${form.tenantName || "________"} towards rent for the property located at ${form.address || "________"} for the month of ${form.month} ${form.year}.`
  );
  ctx.addGap();
  ctx.addFieldRow("Payment Mode:", form.paymentMode);
  ctx.addGap(3);
  ctx.addHr();
  ctx.addGap();

  const halfW = ctx.contentWidth / 2;
  ctx.addTableRow(
    [form.tenantName || "Tenant Signature", form.landlordName || "Landlord Signature"],
    [halfW, halfW]
  );
  ctx.addTableRow(["(Tenant)", "(Landlord)"], [halfW, halfW]);

  if (form.rentAmount && Number(form.rentAmount) > 5000 && form.paymentMode === "Cash") {
    ctx.addGap(2);
    ctx.addLine("* Revenue stamp required for cash payments above Rs 5,000", {
      size: 8,
      color: [180, 0, 0],
    });
  }
}
