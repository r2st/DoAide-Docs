import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const pagesDir = path.resolve(import.meta.dirname, ".");

describe("ExperienceLetterGenerator", () => {
  const src = fs.readFileSync(path.join(pagesDir, "ExperienceLetterGenerator.jsx"), "utf8");

  it("includes HR name and designation fields", () => {
    expect(src).toContain("hrName");
    expect(src).toContain("hrDesignation");
  });

  it("has SeoHead with slug and FAQs", () => {
    expect(src).toContain("<SeoHead");
    expect(src).toContain("slug={SLUG}");
    expect(src).toContain("faqs={FAQS}");
  });

  it("includes ConversionCTA", () => {
    expect(src).toContain("<ConversionCTA");
    expect(src).toContain('import ConversionCTA from "../components/ConversionCTA"');
  });

  it("includes ShareButtons with WhatsApp", () => {
    expect(src).toContain("<ShareButtons");
    expect(src).toContain("btn-whatsapp");
  });

  it("has at least 5 FAQ items", () => {
    const faqMatches = src.match(/\{ q: "/g);
    expect(faqMatches.length).toBeGreaterThanOrEqual(5);
  });

  it("renders HR name in the PDF signatory", () => {
    expect(src).toContain('form.hrName || "Authorised Signatory"');
  });

  it("renders HR designation in the PDF", () => {
    expect(src).toContain("form.hrDesignation");
  });

  it("uses addParagraph for body text in renderPdf", () => {
    const renderSection = src.slice(src.indexOf("function renderPdf"));
    expect(renderSection).toContain("ctx.addParagraph(");
  });
});

describe("NocLetterGenerator", () => {
  const src = fs.readFileSync(path.join(pagesDir, "NocLetterGenerator.jsx"), "utf8");

  it("supports Vehicle NOC type", () => {
    expect(src).toContain('"vehicle"');
    expect(src).toContain("vehicleRegNo");
    expect(src).toContain("buyerName");
    expect(src).toContain("sellerName");
  });

  it("supports Society NOC type", () => {
    expect(src).toContain('"society"');
    expect(src).toContain("memberName");
    expect(src).toContain("flatNo");
  });

  it("supports Employer NOC type", () => {
    expect(src).toContain('"employer"');
    expect(src).toContain("employeeName");
    expect(src).toContain("empDesignation");
  });

  it("supports Bank NOC type", () => {
    expect(src).toContain('"bank"');
    expect(src).toContain("borrowerName");
    expect(src).toContain("loanAccountNo");
    expect(src).toContain("loanType");
  });

  it("has SeoHead with slug and FAQs", () => {
    expect(src).toContain("<SeoHead");
    expect(src).toContain("slug={SLUG}");
    expect(src).toContain("faqs={FAQS}");
  });

  it("includes ConversionCTA", () => {
    expect(src).toContain("<ConversionCTA");
  });

  it("includes ShareButtons with WhatsApp", () => {
    expect(src).toContain("<ShareButtons");
    expect(src).toContain("btn-whatsapp");
  });

  it("has at least 5 FAQ items", () => {
    const faqMatches = src.match(/\{ *\n? *q: "/g) || src.match(/\{\s*q:\s*"/g);
    expect(faqMatches.length).toBeGreaterThanOrEqual(5);
  });

  it("has exactly 4 NOC types", () => {
    const typeMatches = src.match(/\{ key: "/g);
    expect(typeMatches.length).toBe(4);
  });
});

describe("BonafideCertificateGenerator", () => {
  const src = fs.readFileSync(path.join(pagesDir, "BonafideCertificateGenerator.jsx"), "utf8");

  it("supports student and employee modes", () => {
    expect(src).toContain('"student"');
    expect(src).toContain('"employee"');
    expect(src).toContain("mode-toggle");
  });

  it("includes date of birth field", () => {
    expect(src).toContain("dateOfBirth");
  });

  it("includes employee number field", () => {
    expect(src).toContain("employeeNo");
  });

  it("has SeoHead with slug and FAQs", () => {
    expect(src).toContain("<SeoHead");
    expect(src).toContain("slug={SLUG}");
    expect(src).toContain("faqs={FAQS}");
  });

  it("includes ConversionCTA", () => {
    expect(src).toContain("<ConversionCTA");
  });

  it("includes ShareButtons with WhatsApp", () => {
    expect(src).toContain("<ShareButtons");
    expect(src).toContain("btn-whatsapp");
  });

  it("has at least 5 FAQ items", () => {
    const faqMatches = src.match(/\{ q: "/g);
    expect(faqMatches.length).toBeGreaterThanOrEqual(5);
  });

  it("has multiple purposes including Education Loan and Visa", () => {
    expect(src).toContain("Education Loan");
    expect(src).toContain("Visa Application");
    expect(src).toContain("Passport Application");
  });

  it("uses addParagraph for body text in renderPdf", () => {
    const renderSection = src.slice(src.indexOf("function renderPdf"));
    expect(renderSection).toContain("ctx.addParagraph(");
  });
});

describe("ConversionCTA component exists", () => {
  const componentPath = path.resolve(import.meta.dirname, "../components/ConversionCTA.jsx");

  it("ConversionCTA.jsx file exists", () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it("exports a default function", () => {
    const src = fs.readFileSync(componentPath, "utf8");
    expect(src).toContain("export default function ConversionCTA");
  });

  it("has the pro badge and CTA link", () => {
    const src = fs.readFileSync(componentPath, "utf8");
    expect(src).toContain("cta-badge");
    expect(src).toContain("btn-gold");
    expect(src).toContain("doaide.com/pricing");
  });
});
