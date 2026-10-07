import { useState } from "react";

export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      {items.map((item, i) => (
        <div key={i} className="faq-item">
          <button
            className="faq-q"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {item.q}
            <span className={`arrow ${openIndex === i ? "open" : ""}`}>▼</span>
          </button>
          {openIndex === i && <div className="faq-a">{item.a}</div>}
        </div>
      ))}
    </div>
  );
}
