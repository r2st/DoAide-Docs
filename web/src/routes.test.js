import { describe, it, expect } from "vitest";

const EXPECTED_ROUTES = [
  "/",
  "/rent-receipt-generator",
  "/rental-agreement-generator",
  "/salary-slip-generator",
  "/experience-letter-generator",
  "/relieving-letter-generator",
  "/offer-letter-generator",
  "/noc-letter-generator",
  "/appointment-letter-generator",
  "/invoice-generator",
  "/bonafide-certificate-generator",
  "/power-of-attorney-generator",
  "/leave-application-generator",
  "/resignation-letter-generator",
  "/authorization-letter-generator",
  "/salary-certificate-generator",
];

const SITEMAP_SLUGS = [
  "rent-receipt-generator",
  "rental-agreement-generator",
  "salary-slip-generator",
  "experience-letter-generator",
  "relieving-letter-generator",
  "offer-letter-generator",
  "noc-letter-generator",
  "appointment-letter-generator",
  "invoice-generator",
  "bonafide-certificate-generator",
  "power-of-attorney-generator",
  "leave-application-generator",
  "resignation-letter-generator",
  "authorization-letter-generator",
  "salary-certificate-generator",
];

describe("Route coverage", () => {
  it("has 16 routes (homepage + 15 generators)", () => {
    expect(EXPECTED_ROUTES.length).toBe(16);
  });

  it("every sitemap slug has a matching route", () => {
    for (const slug of SITEMAP_SLUGS) {
      expect(EXPECTED_ROUTES).toContain(`/${slug}`);
    }
  });

  it("every generator route has a matching sitemap slug", () => {
    for (const route of EXPECTED_ROUTES) {
      if (route === "/") continue;
      expect(SITEMAP_SLUGS).toContain(route.slice(1));
    }
  });

  it("no duplicate routes", () => {
    expect(new Set(EXPECTED_ROUTES).size).toBe(EXPECTED_ROUTES.length);
  });
});
