import { useState } from "react";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), page: window.location.pathname }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setMessage("");
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
      }, 1500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Send feedback"
        style={{
          position: "fixed",
          bottom: "1.25rem",
          left: "1.25rem",
          zIndex: 9998,
          background: "var(--accent, #2563eb)",
          color: "#fff",
          border: "none",
          borderRadius: "1.5rem",
          padding: "0.5rem 1rem",
          fontSize: "0.825rem",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          display: open ? "none" : "block",
        }}
      >
        Feedback
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
              setStatus("idle");
            }
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "var(--bg-card, #fff)",
              color: "var(--text-primary, #111)",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              width: "min(90vw, 400px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.1rem" }}>Send Feedback</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What can we improve?"
              rows={4}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: "0.5rem",
                border: "1px solid var(--border, #ddd)",
                padding: "0.75rem",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                resize: "vertical",
                background: "var(--bg-input, #fafafa)",
                color: "inherit",
              }}
            />
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setStatus("idle");
                }}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border, #ddd)",
                  background: "transparent",
                  color: "inherit",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: status === "sent" ? "#16a34a" : "var(--accent, #2563eb)",
                  color: "#fff",
                  cursor: status === "sending" ? "wait" : "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : status === "error" ? "Retry" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
