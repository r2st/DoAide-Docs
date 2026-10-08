import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const pagesDir = path.resolve(import.meta.dirname, ".");
const appPath = path.resolve(import.meta.dirname, "../App.jsx");

describe("catch-all route redirects unknown URLs to home", () => {
  it("App.jsx imports Navigate from react-router-dom", () => {
    const src = fs.readFileSync(appPath, "utf8");
    expect(src).toContain("Navigate");
    expect(src).toMatch(/import\s+\{[^}]*Navigate[^}]*\}\s+from\s+["']react-router-dom["']/);
  });

  it("App.jsx has a catch-all route", () => {
    const src = fs.readFileSync(appPath, "utf8");
    expect(src).toMatch(/path="\*"/);
    expect(src).toContain('<Navigate to="/" replace />');
  });
});

describe("InvoiceGenerator PDF column widths fit A4 page", () => {
  it("total column widths do not exceed content width (170mm)", () => {
    const src = fs.readFileSync(path.join(pagesDir, "InvoiceGenerator.jsx"), "utf8");
    const match = src.match(/const colWidths\s*=\s*\[([^\]]+)\]/);
    expect(match).not.toBeNull();
    const widths = match[1].split(",").map(Number);
    expect(widths.length).toBe(6);
    const total = widths.reduce((a, b) => a + b, 0);
    expect(total).toBeLessThanOrEqual(170);
    expect(total).toBeGreaterThan(100);
  });
});

describe("SalaryCertificateGenerator uses addParagraph for long text", () => {
  it("uses addParagraph instead of addLine for body text in renderPdf", () => {
    const src = fs.readFileSync(path.join(pagesDir, "SalaryCertificateGenerator.jsx"), "utf8");
    const renderPdfSection = src.slice(src.indexOf("function renderPdf"));
    expect(renderPdfSection).toContain("ctx.addParagraph(body");
    expect(renderPdfSection).not.toMatch(/ctx\.addLine\(body\b/);
  });

  it("uses addParagraph for the purpose sentence", () => {
    const src = fs.readFileSync(path.join(pagesDir, "SalaryCertificateGenerator.jsx"), "utf8");
    const renderPdfSection = src.slice(src.indexOf("function renderPdf"));
    expect(renderPdfSection).toMatch(/ctx\.addParagraph\(`This certificate is being issued/);
  });
});

describe("all generator pages include btn base class on action buttons", () => {
  const generators = fs.readdirSync(pagesDir)
    .filter((f) => f.endsWith("Generator.jsx"));

  it("found at least 15 generator pages", () => {
    expect(generators.length).toBeGreaterThanOrEqual(15);
  });

  for (const file of generators) {
    it(`${file} uses "btn btn-primary" not bare "btn-primary"`, () => {
      const src = fs.readFileSync(path.join(pagesDir, file), "utf8");
      const btnRowMatch = src.match(/className="btn-row"[\s\S]*?<\/div>/);
      if (!btnRowMatch) return;
      const btnRow = btnRowMatch[0];
      const barePattern = /className="(btn-primary|btn-secondary|btn-whatsapp)"/g;
      const matches = [...btnRow.matchAll(barePattern)];
      for (const m of matches) {
        expect.soft(m[0]).toContain("btn btn-");
      }
    });
  }
});
