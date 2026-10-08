import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getDailyCount, getDailyRating, getRatingCount, TOOL_MAP } from "../lib/doaideViral";

const bar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5rem",
  padding: "0.5rem 1rem",
  fontSize: "0.8rem",
  color: "var(--text-muted, #6b7280)",
  flexWrap: "wrap",
};

const starStyle = {
  color: "var(--gold, #d97706)",
  letterSpacing: "1px",
};

export default function SocialProofBar() {
  const { pathname } = useLocation();
  const toolName = TOOL_MAP[pathname];

  const data = useMemo(() => {
    if (!toolName) return null;
    return {
      count: getDailyCount(toolName),
      rating: getDailyRating(toolName),
      ratingCount: getRatingCount(toolName),
    };
  }, [toolName]);

  if (!data) return null;

  const fullStars = Math.floor(Number(data.rating));
  const starStr = "★".repeat(fullStars) + (Number(data.rating) % 1 >= 0.5 ? "½" : "");

  return (
    <div style={bar}>
      <span>{data.count.toLocaleString()} people used this today</span>
      <span style={starStyle}>{starStr} {data.rating}/5 from {data.ratingCount.toLocaleString()} users</span>
    </div>
  );
}
