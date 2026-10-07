import { Link } from "react-router-dom";

const TOOL_LINKS = [
  { to: "/rent-receipt-generator", label: "Rent Receipt" },
  { to: "/rental-agreement-generator", label: "Rental Agreement" },
  { to: "/salary-slip-generator", label: "Salary Slip" },
  { to: "/invoice-generator", label: "Invoice" },
  { to: "/experience-letter-generator", label: "Experience Letter" },
  { to: "/resignation-letter-generator", label: "Resignation Letter" },
];

const DOAIDE_LINKS = [
  { href: "https://doaide.com", label: "DoAide Home" },
  { href: "https://gst.doaide.com", label: "GST Tools" },
  { href: "https://insure.doaide.com", label: "InsureKit" },
  { href: "https://tax.doaide.com", label: "TaxFile" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">DoAide <span style={{ color: "var(--gold)" }}>Docs</span></div>
      <div className="footer-links">
        {TOOL_LINKS.map((l) => (
          <Link key={l.to} to={l.to}>{l.label}</Link>
        ))}
      </div>
      <div className="footer-links" style={{ marginBottom: "1.5rem" }}>
        {DOAIDE_LINKS.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
        ))}
      </div>
      <p>&copy; {new Date().getFullYear()} DoAide. Free document generators for India. No login required.</p>
    </footer>
  );
}
