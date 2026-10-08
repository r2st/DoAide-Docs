import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecentTools } from "../lib/doaideViral";

const section = {
  margin: "1.5rem 0",
  padding: "1rem 1.25rem",
  background: "rgba(217, 119, 6, 0.05)",
  border: "1px solid rgba(217, 119, 6, 0.15)",
  borderRadius: "12px",
};

const title = {
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "var(--gold, #d97706)",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "0.75rem",
};

const row = {
  display: "flex",
  gap: "0.5rem",
  overflowX: "auto",
  paddingBottom: "0.25rem",
};

const chip = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.5rem 1rem",
  background: "var(--surface, #fff)",
  border: "1px solid var(--border, #e5e7eb)",
  borderRadius: "20px",
  textDecoration: "none",
  color: "var(--heading, #1f2937)",
  fontSize: "0.82rem",
  fontWeight: 500,
  whiteSpace: "nowrap",
  transition: "border-color 0.15s",
};

const cta = {
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "var(--gold, #d97706)",
};

export default function RecentTools() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setRecent(getRecentTools());
  }, []);

  if (recent.length === 0) return null;

  return (
    <div style={section}>
      <div style={title}>Pick up where you left off</div>
      <div style={row}>
        {recent.map((tool) => (
          <Link key={tool.path} to={tool.path} style={chip}>
            <span>{tool.name}</span>
            <span style={cta}>Continue &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
