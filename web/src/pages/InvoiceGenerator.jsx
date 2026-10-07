import { useState } from "react";
import SeoHead from "../components/SeoHead";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const SLUG = "invoice-generator";

const GST_OPTIONS = [0, 5, 12, 18, 28];

const FAQS = [
  { q: "What are the mandatory fields in a GST invoice?", a: "A GST invoice must include the supplier's name, address, and GSTIN, the invoice number and date, the buyer's name, address, and GSTIN (if registered), description of goods/services, HSN/SAC code, quantity, unit price, taxable value, GST rate and amount (CGST, SGST or IGST), and the total amount." },
  { q: "What is an HSN code?", a: "HSN (Harmonised System of Nomenclature) is a 6-digit international standard code used to classify traded goods. In India, businesses with turnover above Rs 5 crore must use 6-digit HSN codes, while those between Rs 1.5 crore and Rs 5 crore must use 4-digit codes on their GST invoices." },
  { q: "What is the difference between CGST, SGST, and IGST?", a: "CGST (Central GST) and SGST (State GST) are levied on intra-state supplies, each being half of the total GST rate. IGST (Integrated GST) is levied on inter-state supplies and equals the full GST rate. For example, an 18% GST on an intra-state sale is split as 9% CGST + 9% SGST." },
  { q: "Is e-invoicing mandatory under GST?", a: "E-invoicing is mandatory for businesses with an aggregate turnover exceeding Rs 5 crore (as of August 2023). These businesses must generate invoices through the Invoice Registration Portal (IRP) and obtain a unique Invoice Reference Number (IRN) for each invoice." },
  { q: "What is the time limit for issuing a GST invoice?", a: "For goods, the invoice must be issued at or before the time of removal/delivery. For services, the invoice must be issued within 30 days from the date of supply. For banking and financial services, the time limit is 45 days from the date of supply." },
];

const emptyItem = () => ({ description: "", hsn: "", qty: 1, rate: 0, gstRate: 18 });

export default function InvoiceGenerator() {
  const [sellerName, setSellerName] = useState("");
  const [sellerGstin, setSellerGstin] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerGstin, setBuyerGstin] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState([emptyItem()]);

  const updateItem = (index, field, value) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updated);
  };

  const addItem = () => setItems([...items, emptyItem()]);

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Computed values
  const computedItems = items.map((item) => {
    const amount = Number(item.qty) * Number(item.rate);
    const gst = amount * Number(item.gstRate) / 100;
    return { ...item, amount, gst };
  });

  const subtotal = computedItems.reduce((sum, it) => sum + it.amount, 0);
  const totalGst = computedItems.reduce((sum, it) => sum + it.gst, 0);
  const cgst = totalGst / 2;
  const sgst = totalGst / 2;
  const grandTotal = subtotal + totalGst;

  const formData = {
    sellerName, sellerGstin, sellerAddress,
    buyerName, buyerGstin, buyerAddress,
    invoiceNo, invoiceDate, items: computedItems,
    subtotal, cgst, sgst, grandTotal,
  };

  const handleDownload = () => {
    createPdf({
      title: "GST Invoice",
      filename: `invoice-${invoiceNo || "draft"}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, formData),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Hi! I just created a GST Invoice using DoAide Docs -- the free online invoice generator. Try it out at https://docs.doaide.com/invoice-generator`
    );
  };

  return (
    <>
      <SeoHead
        title="Free GST Invoice Generator Online | DoAide Docs"
        description="Generate GST-compliant invoices online for free. Add multiple items with HSN codes, auto-calculate CGST and SGST, and download as PDF. No login required."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>GST Invoice</span> Generator</h1>
          <p>Create professional GST-compliant invoices in seconds. Add items, HSN codes, and GST rates -- CGST and SGST are calculated automatically. Download as PDF, print, or share via WhatsApp.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Invoice Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Invoice No *</label>
                <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} placeholder="e.g. INV-001" />
              </div>
              <div className="form-group">
                <label>Invoice Date *</label>
                <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
              </div>
            </div>

            <h3>Seller Details</h3>
            <div className="form-group">
              <label>Seller / Business Name *</label>
              <input value={sellerName} onChange={(e) => setSellerName(e.target.value)} placeholder="Your business name" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>GSTIN</label>
                <input value={sellerGstin} onChange={(e) => setSellerGstin(e.target.value)} placeholder="e.g. 29ABCDE1234F1Z5" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input value={sellerAddress} onChange={(e) => setSellerAddress(e.target.value)} placeholder="Business address" />
              </div>
            </div>

            <h3>Buyer Details</h3>
            <div className="form-group">
              <label>Buyer Name *</label>
              <input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Buyer / customer name" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>GSTIN</label>
                <input value={buyerGstin} onChange={(e) => setBuyerGstin(e.target.value)} placeholder="Buyer's GSTIN" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} placeholder="Buyer's address" />
              </div>
            </div>

            <h3>Items</h3>
            {items.map((item, idx) => (
              <div key={idx} style={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "0.75rem", marginBottom: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <strong style={{ fontSize: "0.85rem" }}>Item {idx + 1}</strong>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      style={{ background: "none", border: "none", color: "#c00", cursor: "pointer", fontSize: "0.85rem" }}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="form-group" style={{ marginBottom: "0.5rem" }}>
                  <input
                    value={item.description}
                    onChange={(e) => updateItem(idx, "description", e.target.value)}
                    placeholder="Description of goods / services"
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: "0.75rem" }}>HSN</label>
                    <input
                      value={item.hsn}
                      onChange={(e) => updateItem(idx, "hsn", e.target.value)}
                      placeholder="HSN"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: "0.75rem" }}>Qty</label>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(idx, "qty", e.target.value)}
                      min="1"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: "0.75rem" }}>Rate (Rs)</label>
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(idx, "rate", e.target.value)}
                      min="0"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: "0.75rem" }}>GST %</label>
                    <select
                      value={item.gstRate}
                      onChange={(e) => updateItem(idx, "gstRate", e.target.value)}
                      style={{ width: "100%" }}
                    >
                      {GST_OPTIONS.map((g) => (
                        <option key={g} value={g}>{g}%</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" style={{ fontSize: "0.85rem", padding: "0.4rem 1rem" }} onClick={addItem}>
              + Add Item
            </button>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <h3 style={{ textAlign: "center", marginBottom: "0.25rem" }}>GST INVOICE</h3>
              <hr />

              <div style={{ marginTop: "0.75rem" }}>
                <p className="company-name">{sellerName || "Your Business Name"}</p>
                {sellerGstin && <p style={{ fontSize: "0.8rem", color: "#555" }}>GSTIN: {sellerGstin}</p>}
                {sellerAddress && <p style={{ fontSize: "0.8rem", color: "#555" }}>{sellerAddress}</p>}
              </div>

              <hr style={{ margin: "0.75rem 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>Bill To:</p>
                  <p style={{ fontSize: "0.85rem" }}>{buyerName || "________"}</p>
                  {buyerGstin && <p style={{ fontSize: "0.75rem", color: "#555" }}>GSTIN: {buyerGstin}</p>}
                  {buyerAddress && <p style={{ fontSize: "0.75rem", color: "#555" }}>{buyerAddress}</p>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.8rem" }}><strong>Invoice #:</strong> {invoiceNo || "___"}</p>
                  <p style={{ fontSize: "0.8rem" }}><strong>Date:</strong> {invoiceDate}</p>
                </div>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", marginBottom: "1rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f5f5f5" }}>
                    <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "center" }}>#</th>
                    <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "left" }}>Description</th>
                    <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "center" }}>HSN</th>
                    <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "right" }}>Qty</th>
                    <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "right" }}>Rate</th>
                    <th style={{ border: "1px solid #ddd", padding: "6px", textAlign: "right" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {computedItems.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ border: "1px solid #ddd", padding: "6px", textAlign: "center" }}>{idx + 1}</td>
                      <td style={{ border: "1px solid #ddd", padding: "6px" }}>{item.description || "--"}</td>
                      <td style={{ border: "1px solid #ddd", padding: "6px", textAlign: "center" }}>{item.hsn || "--"}</td>
                      <td style={{ border: "1px solid #ddd", padding: "6px", textAlign: "right" }}>{item.qty}</td>
                      <td style={{ border: "1px solid #ddd", padding: "6px", textAlign: "right" }}>{Number(item.rate).toFixed(2)}</td>
                      <td style={{ border: "1px solid #ddd", padding: "6px", textAlign: "right" }}>{item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ minWidth: "200px" }}>
                  <div className="field-row">
                    <span className="field-label">Subtotal:</span>
                    <span>Rs {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="field-row">
                    <span className="field-label">CGST:</span>
                    <span>Rs {cgst.toFixed(2)}</span>
                  </div>
                  <div className="field-row">
                    <span className="field-label">SGST:</span>
                    <span>Rs {sgst.toFixed(2)}</span>
                  </div>
                  <div className="field-row total-row">
                    <span className="field-label">Total:</span>
                    <span>Rs {grandTotal.toFixed(2)}</span>
                  </div>
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

function renderPdf(ctx, data) {
  ctx.addLine("GST INVOICE", { bold: true, size: 18, align: "center" });
  ctx.addGap();
  ctx.addHr();
  ctx.addGap();

  // Seller details
  ctx.addLine(data.sellerName || "Business Name", { bold: true, size: 14 });
  if (data.sellerGstin) ctx.addLine(`GSTIN: ${data.sellerGstin}`, { size: 10 });
  if (data.sellerAddress) ctx.addLine(data.sellerAddress, { size: 10 });
  ctx.addGap();
  ctx.addHr();
  ctx.addGap();

  // Invoice info
  ctx.addFieldRow("Invoice No:", data.invoiceNo || "___");
  ctx.addFieldRow("Date:", data.invoiceDate);
  ctx.addGap();

  // Buyer details
  ctx.addLine("Bill To:", { bold: true, size: 11 });
  ctx.addLine(data.buyerName || "________", { size: 10 });
  if (data.buyerGstin) ctx.addLine(`GSTIN: ${data.buyerGstin}`, { size: 10 });
  if (data.buyerAddress) ctx.addLine(data.buyerAddress, { size: 10 });
  ctx.addGap();

  // Items table header
  const colWidths = [25, 160, 60, 40, 60, 70];
  ctx.addTableRow(["#", "Description", "HSN", "Qty", "Rate", "Amount"], colWidths, { bold: true, header: true });

  // Items table rows
  data.items.forEach((item, idx) => {
    ctx.addTableRow(
      [
        String(idx + 1),
        item.description || "--",
        item.hsn || "--",
        String(item.qty),
        Number(item.rate).toFixed(2),
        item.amount.toFixed(2),
      ],
      colWidths
    );
  });

  ctx.addGap();
  ctx.addHr();
  ctx.addGap();

  // Totals
  ctx.addFieldRow("Subtotal:", `Rs ${data.subtotal.toFixed(2)}`);
  ctx.addFieldRow("CGST:", `Rs ${data.cgst.toFixed(2)}`);
  ctx.addFieldRow("SGST:", `Rs ${data.sgst.toFixed(2)}`);
  ctx.addGap();
  ctx.addLine(`Total: Rs ${data.grandTotal.toFixed(2)}`, { bold: true, size: 13 });
}
