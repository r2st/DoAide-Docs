import { useState } from "react";
import { createPdf } from "../lib/pdfGenerator";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 3 }, (_, i) => currentYear - 1 + i);

const s = {
  page: {
    display: "flex", flexDirection: "column", minHeight: "100vh",
    background: "#0A0A0B", color: "#E5E7EB",
    fontFamily: "'Schibsted Grotesk', system-ui, sans-serif", fontSize: 14, boxSizing: "border-box",
  },
  header: {
    padding: "10px 16px", borderBottom: "1px solid #2A2A2D",
    fontWeight: 600, fontSize: 15, color: "#fff",
  },
  body: { flex: 1, padding: 16 },
  label: {
    display: "block", fontSize: 12, color: "#9CA3AF",
    marginBottom: 4, fontWeight: 500,
  },
  input: {
    width: "100%", padding: "8px 10px", background: "#1A1A1D", border: "1px solid #2A2A2D",
    borderRadius: 6, color: "#E5E7EB", fontSize: 14, outline: "none", marginBottom: 12,
  },
  select: {
    width: "100%", padding: "8px 10px", background: "#1A1A1D", border: "1px solid #2A2A2D",
    borderRadius: 6, color: "#E5E7EB", fontSize: 14, outline: "none", marginBottom: 12,
  },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  btn: {
    width: "100%", padding: "10px", background: "#F0B429", color: "#0A0A0B",
    border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
    marginTop: 4,
  },
  powered: {
    display: "block", textAlign: "center", padding: "8px 16px",
    borderTop: "1px solid #2A2A2D", fontSize: 12,
    color: "#6B7280", textDecoration: "none",
  },
};

export default function EmbedRentReceiptGenerator() {
  const [form, setForm] = useState({
    landlordName: "", tenantName: "", address: "", rentAmount: "",
    month: MONTHS[new Date().getMonth()], year: String(currentYear),
    paymentMode: "Bank Transfer",
  });
  const [showEmbed, setShowEmbed] = useState(false);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleDownload = () => {
    if (!form.landlordName || !form.tenantName || !form.rentAmount) return;
    createPdf({
      title: "Rent Receipt",
      filename: `rent-receipt-${form.month}-${form.year}.pdf`,
      renderFn: (ctx) => {
        const { doc, y: startY } = ctx;
        let y = startY;
        doc.setFontSize(16);
        doc.text("RENT RECEIPT", 105, y, { align: "center" });
        y += 12;
        doc.setFontSize(11);
        doc.text(`Receipt for: ${form.month} ${form.year}`, 20, y); y += 8;
        doc.text(`Received from: ${form.tenantName}`, 20, y); y += 8;
        doc.text(`Amount: Rs. ${Number(form.rentAmount).toLocaleString("en-IN")}`, 20, y); y += 8;
        doc.text(`For: ${form.address}`, 20, y); y += 8;
        doc.text(`Payment Mode: ${form.paymentMode}`, 20, y); y += 16;
        doc.text(`Landlord: ${form.landlordName}`, 20, y); y += 8;
        doc.text("Signature: _______________", 20, y);
      },
    });
  };

  const embedCode = `<iframe src="https://docs.doaide.com/embed/rent-receipt-generator" width="400" height="560" frameborder="0" style="border:1px solid #2A2A2D;border-radius:8px;" title="Rent Receipt Generator"></iframe>`;

  return (
    <div style={s.page}>
      <div style={s.header}>Rent Receipt Generator</div>
      <div style={s.body}>
        <label style={s.label}>Landlord Name</label>
        <input style={s.input} value={form.landlordName} onChange={set("landlordName")} placeholder="Property owner name" />

        <label style={s.label}>Tenant Name</label>
        <input style={s.input} value={form.tenantName} onChange={set("tenantName")} placeholder="Your name" />

        <label style={s.label}>Property Address</label>
        <input style={s.input} value={form.address} onChange={set("address")} placeholder="Rented property address" />

        <div style={s.grid}>
          <div>
            <label style={s.label}>Rent Amount (₹)</label>
            <input style={s.input} type="number" value={form.rentAmount} onChange={set("rentAmount")} placeholder="e.g. 15000" />
          </div>
          <div>
            <label style={s.label}>Payment Mode</label>
            <select style={s.select} value={form.paymentMode} onChange={set("paymentMode")}>
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Cheque</option>
            </select>
          </div>
          <div>
            <label style={s.label}>Month</label>
            <select style={s.select} value={form.month} onChange={set("month")}>
              {MONTHS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label style={s.label}>Year</label>
            <select style={s.select} value={form.year} onChange={set("year")}>
              {YEARS.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <button style={s.btn} onClick={handleDownload}>Download PDF</button>

        <button onClick={() => setShowEmbed(!showEmbed)} style={{
          marginTop: 12, background: "none", border: "1px solid #2A2A2D",
          color: "#6B7280", padding: "6px 12px", borderRadius: 6,
          cursor: "pointer", fontSize: 12, width: "100%",
        }}>
          {showEmbed ? "Hide" : "Get this widget for your site"}
        </button>
        {showEmbed && (
          <pre style={{
            marginTop: 8, padding: 10, background: "#111", borderRadius: 6,
            fontSize: 11, color: "#6B7280", overflow: "auto", whiteSpace: "pre-wrap",
          }}>{embedCode}</pre>
        )}
      </div>
      <a style={s.powered} href="https://docs.doaide.com?ref=widget" target="_blank" rel="noopener noreferrer">
        Powered by <strong style={{ color: "#F0B429" }}>DoAide Docs</strong>
      </a>
    </div>
  );
}
