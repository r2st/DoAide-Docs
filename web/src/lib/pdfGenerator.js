import jsPDF from "jspdf";

/**
 * Generate a PDF from structured document data.
 * Each doc type provides its own layout function.
 */

export function createPdf({ title, filename, renderFn }) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Helper context
  const ctx = {
    doc,
    y: margin,
    margin,
    pageWidth,
    contentWidth,
    lineHeight: 6,
    addLine(text, opts = {}) {
      const { bold, size = 10, align = "left", color = [26, 26, 29] } = opts;
      if (this.y > 270) {
        doc.addPage();
        this.y = margin;
      }
      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setTextColor(...color);
      const x = align === "center" ? pageWidth / 2 : align === "right" ? pageWidth - margin : margin;
      doc.text(text, x, this.y, { align });
      this.y += this.lineHeight;
    },
    addGap(n = 1) {
      this.y += this.lineHeight * n;
    },
    addFieldRow(label, value) {
      if (this.y > 270) {
        doc.addPage();
        this.y = margin;
      }
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(26, 26, 29);
      doc.text(label, margin, this.y);
      doc.setFont("helvetica", "normal");
      doc.text(String(value || ""), margin + 55, this.y);
      this.y += this.lineHeight;
    },
    addParagraph(text, opts = {}) {
      const { size = 10 } = opts;
      if (!text) return;
      doc.setFontSize(size);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(26, 26, 29);
      const lines = doc.splitTextToSize(text, contentWidth);
      for (const line of lines) {
        if (this.y > 270) {
          doc.addPage();
          this.y = margin;
        }
        doc.text(line, margin, this.y);
        this.y += this.lineHeight;
      }
    },
    addHr() {
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, this.y, pageWidth - margin, this.y);
      this.y += 4;
    },
    addTableRow(cols, widths, opts = {}) {
      const { bold, header } = opts;
      if (this.y > 270) {
        doc.addPage();
        this.y = margin;
      }
      doc.setFontSize(9);
      doc.setFont("helvetica", bold || header ? "bold" : "normal");
      if (header) {
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, this.y - 4, contentWidth, 7, "F");
      }
      let xOff = margin;
      cols.forEach((col, i) => {
        doc.text(String(col), xOff, this.y);
        xOff += widths[i];
      });
      this.y += 6;
    }
  };

  renderFn(ctx);

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text("Generated at docs.doaide.com — Free Document Generator", pageWidth / 2, 290, { align: "center" });

  doc.save(filename || `${title}.pdf`);
}

export function shareWhatsApp(text) {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

export function printPreview() {
  window.print();
}
