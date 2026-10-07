import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <svg viewBox="0 0 64 64" className="brand-icon">
          <rect width="64" height="64" rx="12" fill="#0A0A0B"/>
          <rect x="16" y="12" width="32" height="40" rx="4" fill="#F0B429"/>
          <rect x="22" y="20" width="20" height="2" rx="1" fill="#0A0A0B"/>
          <rect x="22" y="26" width="16" height="2" rx="1" fill="#0A0A0B"/>
          <rect x="22" y="32" width="20" height="2" rx="1" fill="#0A0A0B"/>
          <rect x="22" y="38" width="12" height="2" rx="1" fill="#0A0A0B"/>
        </svg>
        <span className="brand-name">DoAide <span className="brand-accent">Docs</span></span>
      </Link>
      <nav className="header-nav">
        <Link to="/">All Documents</Link>
        <a href="https://doaide.com" target="_blank" rel="noopener noreferrer">DoAide Home</a>
        <a href="https://gst.doaide.com" target="_blank" rel="noopener noreferrer">GST Tools</a>
      </nav>
    </header>
  );
}
