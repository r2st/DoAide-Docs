import { useState } from "react";
import SeoHead from "../components/SeoHead";
import ShareButtons from "../components/ShareButtons";
import FAQ from "../components/FAQ";
import RelatedDocs from "../components/RelatedDocs";
import { createPdf, shareWhatsApp, printPreview } from "../lib/pdfGenerator";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

const SLUG = "salary-slip-generator";

const FAQS = [
  { q: "What is a salary slip?", a: "A salary slip (or payslip) is a document issued by an employer to an employee, detailing the components of salary paid for a specific month. It includes earnings like basic, HRA, DA and deductions like PF, ESI, TDS." },
  { q: "Is an employer required to provide salary slips?", a: "Yes, under the Payment of Wages Act and various state-specific Shops and Establishments Acts, employers are required to provide salary slips to employees." },
  { q: "What are the main components of a salary slip?", a: "A salary slip typically includes: Basic Salary, HRA (House Rent Allowance), DA (Dearness Allowance), Special Allowance as earnings; and PF (Provident Fund), ESI (Employee State Insurance), Professional Tax, and TDS (Tax Deducted at Source) as deductions." },
  { q: "Why do I need a salary slip?", a: "Salary slips serve as proof of income for loan applications, visa applications, tax filing, and rental agreements. They also help employees verify their salary components and deductions." },
  { q: "How is net salary calculated?", a: "Net Salary = Total Earnings (Basic + HRA + DA + Special Allowance + Other) minus Total Deductions (PF + ESI + Professional Tax + TDS + Other)." },
];

function num(v) {
  return parseFloat(v) || 0;
}

function fmt(n) {
  return n.toLocaleString("en-IN");
}

export default function SalarySlipGenerator() {
  const [form, setForm] = useState({
    employeeName: "",
    employeeId: "",
    designation: "",
    department: "",
    companyName: "",
    month: MONTHS[new Date().getMonth()],
    year: String(currentYear),
    basic: "",
    hra: "",
    da: "",
    specialAllowance: "",
    pf: "",
    esi: "",
    professionalTax: "",
    tds: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const totalEarnings = num(form.basic) + num(form.hra) + num(form.da) + num(form.specialAllowance);
  const totalDeductions = num(form.pf) + num(form.esi) + num(form.professionalTax) + num(form.tds);
  const netPay = totalEarnings - totalDeductions;

  const handleDownload = () => {
    createPdf({
      title: "Salary Slip",
      filename: `salary-slip-${form.month}-${form.year}.pdf`,
      renderFn: (ctx) => renderPdf(ctx, form, totalEarnings, totalDeductions, netPay),
    });
  };

  const handleWhatsApp = () => {
    shareWhatsApp(
      `Salary Slip - ${form.month} ${form.year}\nEmployee: ${form.employeeName}\nCompany: ${form.companyName}\nGross: Rs ${fmt(totalEarnings)}\nDeductions: Rs ${fmt(totalDeductions)}\nNet Pay: Rs ${fmt(netPay)}\n\nGenerated at docs.doaide.com`
    );
  };

  return (
    <>
      <SeoHead
        title="Free Salary Slip Generator Online | DoAide Docs"
        description="Generate salary slips with earnings and deductions breakdown. Includes basic, HRA, DA, PF, ESI, TDS components. Download as PDF for free."
        slug={SLUG}
        faqs={FAQS}
      />

      <div className="page-container">
        <div className="gen-header">
          <h1>Free <span>Salary Slip</span> Generator</h1>
          <p>Create professional salary slips with detailed earnings and deductions. Fill in the components, preview the payslip, and download as PDF.</p>
          <div className="free-badge">100% FREE -- No Login Required</div>
        </div>

        <div className="gen-layout">
          {/* ---- FORM ---- */}
          <div className="form-card">
            <h2>Employee & Company</h2>

            <div className="form-group">
              <label>Company Name *</label>
              <input value={form.companyName} onChange={set("companyName")} placeholder="Company / Organisation name" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Employee Name *</label>
                <input value={form.employeeName} onChange={set("employeeName")} placeholder="Full name" />
              </div>
              <div className="form-group">
                <label>Employee ID</label>
                <input value={form.employeeId} onChange={set("employeeId")} placeholder="e.g. EMP001" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Designation</label>
                <input value={form.designation} onChange={set("designation")} placeholder="e.g. Software Engineer" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input value={form.department} onChange={set("department")} placeholder="e.g. Engineering" />
              </div>
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

            <h2 style={{ marginTop: "1rem" }}>Earnings (Monthly)</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Basic Salary *</label>
                <input type="number" value={form.basic} onChange={set("basic")} placeholder="e.g. 25000" />
              </div>
              <div className="form-group">
                <label>HRA</label>
                <input type="number" value={form.hra} onChange={set("hra")} placeholder="e.g. 10000" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Dearness Allowance</label>
                <input type="number" value={form.da} onChange={set("da")} placeholder="e.g. 5000" />
              </div>
              <div className="form-group">
                <label>Special Allowance</label>
                <input type="number" value={form.specialAllowance} onChange={set("specialAllowance")} placeholder="e.g. 5000" />
              </div>
            </div>

            <h2 style={{ marginTop: "1rem" }}>Deductions</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Provident Fund (PF)</label>
                <input type="number" value={form.pf} onChange={set("pf")} placeholder="e.g. 1800" />
              </div>
              <div className="form-group">
                <label>ESI</label>
                <input type="number" value={form.esi} onChange={set("esi")} placeholder="e.g. 750" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Professional Tax</label>
                <input type="number" value={form.professionalTax} onChange={set("professionalTax")} placeholder="e.g. 200" />
              </div>
              <div className="form-group">
                <label>TDS</label>
                <input type="number" value={form.tds} onChange={set("tds")} placeholder="e.g. 2000" />
              </div>
            </div>
          </div>

          {/* ---- PREVIEW ---- */}
          <div className="preview-card">
            <h2>Live Preview</h2>
            <div className="preview-doc">
              <h3 style={{ textAlign: "center", marginBottom: "0.25rem" }}>
                {form.companyName || "Company Name"}
              </h3>
              <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#666", marginBottom: "1rem" }}>
                Salary Slip for {form.month} {form.year}
              </p>
              <hr />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.25rem 1rem", margin: "1rem 0", fontSize: "0.9rem" }}>
                <p><strong>Name:</strong> {form.employeeName || "---"}</p>
                <p><strong>Employee ID:</strong> {form.employeeId || "---"}</p>
                <p><strong>Designation:</strong> {form.designation || "---"}</p>
                <p><strong>Department:</strong> {form.department || "---"}</p>
              </div>

              <hr />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 2rem", marginTop: "1rem" }}>
                {/* Earnings */}
                <div>
                  <h4 style={{ borderBottom: "1px solid #ccc", paddingBottom: "0.25rem" }}>Earnings</h4>
                  <table style={{ width: "100%", fontSize: "0.85rem" }}>
                    <tbody>
                      <tr><td>Basic Salary</td><td style={{ textAlign: "right" }}>{fmt(num(form.basic))}</td></tr>
                      <tr><td>HRA</td><td style={{ textAlign: "right" }}>{fmt(num(form.hra))}</td></tr>
                      <tr><td>Dearness Allowance</td><td style={{ textAlign: "right" }}>{fmt(num(form.da))}</td></tr>
                      <tr><td>Special Allowance</td><td style={{ textAlign: "right" }}>{fmt(num(form.specialAllowance))}</td></tr>
                      <tr style={{ fontWeight: "bold", borderTop: "1px solid #ccc" }}>
                        <td>Total Earnings</td><td style={{ textAlign: "right" }}>{fmt(totalEarnings)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Deductions */}
                <div>
                  <h4 style={{ borderBottom: "1px solid #ccc", paddingBottom: "0.25rem" }}>Deductions</h4>
                  <table style={{ width: "100%", fontSize: "0.85rem" }}>
                    <tbody>
                      <tr><td>Provident Fund</td><td style={{ textAlign: "right" }}>{fmt(num(form.pf))}</td></tr>
                      <tr><td>ESI</td><td style={{ textAlign: "right" }}>{fmt(num(form.esi))}</td></tr>
                      <tr><td>Professional Tax</td><td style={{ textAlign: "right" }}>{fmt(num(form.professionalTax))}</td></tr>
                      <tr><td>TDS</td><td style={{ textAlign: "right" }}>{fmt(num(form.tds))}</td></tr>
                      <tr style={{ fontWeight: "bold", borderTop: "1px solid #ccc" }}>
                        <td>Total Deductions</td><td style={{ textAlign: "right" }}>{fmt(totalDeductions)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#f0fdf4", borderRadius: "6px", textAlign: "center" }}>
                <strong>Net Pay: Rs {fmt(netPay)}</strong>
              </div>

              <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                <div>
                  <p style={{ borderTop: "1px solid #999", paddingTop: "0.25rem" }}>Authorised Signatory</p>
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

        <FAQ items={FAQS} />
        <RelatedDocs currentSlug={SLUG} />
      </div>
    </>
  );
}

function renderPdf(ctx, form, totalEarnings, totalDeductions, netPay) {
  ctx.addLine(form.companyName || "Company Name", { bold: true, size: 14, align: "center" });
  ctx.addLine(`Salary Slip for ${form.month} ${form.year}`, { size: 10, align: "center" });
  ctx.addGap();
  ctx.addHr();

  ctx.addFieldRow("Employee Name:", form.employeeName);
  ctx.addFieldRow("Employee ID:", form.employeeId);
  ctx.addFieldRow("Designation:", form.designation);
  ctx.addFieldRow("Department:", form.department);
  ctx.addGap();
  ctx.addHr();
  ctx.addGap();

  const w = [70, 50, 70, 50];
  ctx.addTableRow(["Earnings", "Amount (Rs)", "Deductions", "Amount (Rs)"], w, { header: true });
  ctx.addTableRow(["Basic Salary", fmt(num(form.basic)), "Provident Fund", fmt(num(form.pf))], w);
  ctx.addTableRow(["HRA", fmt(num(form.hra)), "ESI", fmt(num(form.esi))], w);
  ctx.addTableRow(["Dearness Allowance", fmt(num(form.da)), "Professional Tax", fmt(num(form.professionalTax))], w);
  ctx.addTableRow(["Special Allowance", fmt(num(form.specialAllowance)), "TDS", fmt(num(form.tds))], w);
  ctx.addGap(0.5);
  ctx.addHr();
  ctx.addTableRow(["Total Earnings", fmt(totalEarnings), "Total Deductions", fmt(totalDeductions)], w, { bold: true });
  ctx.addGap();
  ctx.addHr();

  ctx.addGap();
  ctx.addLine(`Net Pay: Rs ${fmt(netPay)}`, { bold: true, size: 12, align: "center" });
  ctx.addGap(3);

  ctx.addLine("Authorised Signatory", { size: 10, align: "right" });
  ctx.addLine("________________________", { size: 10, align: "right" });
}
