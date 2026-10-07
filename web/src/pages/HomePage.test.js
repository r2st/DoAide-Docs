import { describe, it, expect } from "vitest";

const DOCS = [
  { slug: "rent-receipt-generator", name: "Rent Receipt", category: "Rental" },
  { slug: "rental-agreement-generator", name: "Rental Agreement", category: "Rental" },
  { slug: "salary-slip-generator", name: "Salary Slip", category: "HR" },
  { slug: "experience-letter-generator", name: "Experience Letter", category: "HR" },
  { slug: "relieving-letter-generator", name: "Relieving Letter", category: "HR" },
  { slug: "offer-letter-generator", name: "Offer Letter", category: "HR" },
  { slug: "noc-letter-generator", name: "NOC Letter", category: "Legal" },
  { slug: "appointment-letter-generator", name: "Appointment Letter", category: "HR" },
  { slug: "invoice-generator", name: "Invoice", category: "Business" },
  { slug: "bonafide-certificate-generator", name: "Bonafide Certificate", category: "Legal" },
  { slug: "power-of-attorney-generator", name: "Power of Attorney", category: "Legal" },
  { slug: "leave-application-generator", name: "Leave Application", category: "HR" },
  { slug: "resignation-letter-generator", name: "Resignation Letter", category: "HR" },
  { slug: "authorization-letter-generator", name: "Authorization Letter", category: "Legal" },
];

describe("HomePage DOCS data", () => {
  it("has 14 document types", () => {
    expect(DOCS.length).toBe(14);
  });

  it("all slugs are unique", () => {
    const slugs = DOCS.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all slugs end with -generator", () => {
    for (const doc of DOCS) {
      expect(doc.slug).toMatch(/-generator$/);
    }
  });

  it("covers all four categories", () => {
    const cats = new Set(DOCS.map((d) => d.category));
    expect(cats).toEqual(new Set(["HR", "Rental", "Business", "Legal"]));
  });

  it("HR is the largest category", () => {
    const hrCount = DOCS.filter((d) => d.category === "HR").length;
    const otherMax = Math.max(
      ...["Rental", "Business", "Legal"].map(
        (c) => DOCS.filter((d) => d.category === c).length
      )
    );
    expect(hrCount).toBeGreaterThan(otherMax);
  });

  it("all names are non-empty strings", () => {
    for (const doc of DOCS) {
      expect(doc.name).toBeTruthy();
      expect(typeof doc.name).toBe("string");
    }
  });
});
