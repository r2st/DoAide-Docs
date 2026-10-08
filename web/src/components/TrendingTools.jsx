import { useMemo } from "react";
import { TRENDING_TOOLS } from "../lib/doaideViral";

const section = {
  margin: "2.5rem 0 1.5rem",
  padding: "1.5rem",
  background: "var(--surface, #fff)",
  border: "1px solid var(--border, #e5e7eb)",
  borderRadius: "12px",
};

const heading = {
  fontSize: "1.15rem",
  fontWeight: 700,
  marginBottom: "1rem",
  color: "var(--heading, #1f2937)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "0.75rem",
};

const card = {
  display: "block",
  padding: "0.875rem 1rem",
  background: "rgba(217, 119, 6, 0.04)",
  border: "1px solid rgba(217, 119, 6, 0.12)",
  borderRadius: "10px",
  textDecoration: "none",
  color: "var(--heading, #1f2937)",
  transition: "border-color 0.15s, transform 0.15s",
};

const cardName = {
  fontSize: "0.9rem",
  fontWeight: 600,
};

const cardProduct = {
  fontSize: "0.72rem",
  color: "var(--text-muted, #6b7280)",
  marginTop: "0.25rem",
};

export default function TrendingTools() {
  const shown = useMemo(() => {
    const day = new Date().getDate();
    const shuffled = [...TRENDING_TOOLS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (day + i * 7) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 6);
  }, []);

  return (
    <div style={section}>
      <div style={heading}>
        <span role="img" aria-label="fire">🔥</span> Trending on DoAide
      </div>
      <div style={grid}>
        {shown.map((tool) => (
          <a
            key={tool.url}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            style={card}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(217,119,6,0.4)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(217,119,6,0.12)"; e.currentTarget.style.transform = "none"; }}
          >
            <div style={cardName}>
              <span style={{ marginRight: "0.4rem" }}>{tool.icon}</span>
              {tool.name}
            </div>
            <div style={cardProduct}>on DoAide {tool.product}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
