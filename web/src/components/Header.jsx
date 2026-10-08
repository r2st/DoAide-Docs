import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <svg viewBox="0 0 32 32" className="brand-icon" aria-hidden="true">
          <line x1="16" y1="6" x2="16" y2="2" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="16" cy="1.5" r="1.5" fill="#F0B429"/>
          <rect x="5" y="6" width="22" height="17" rx="5" fill="#F0B429"/>
          <ellipse cx="11" cy="13" rx="2.5" ry="3" fill="#0A0A0B"/>
          <ellipse cx="21" cy="13" rx="2.5" ry="3" fill="#0A0A0B"/>
          <circle cx="11.5" cy="12.5" r="1" fill="#F7CC5F"/>
          <circle cx="21.5" cy="12.5" r="1" fill="#F7CC5F"/>
          <path d="M12 19Q16 22 20 19" stroke="#0A0A0B" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <rect x="1" y="10" width="4" height="5" rx="2" fill="#D4A017"/>
          <rect x="27" y="10" width="4" height="5" rx="2" fill="#D4A017"/>
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
