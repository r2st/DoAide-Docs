import { describe, it, expect } from "vitest";

describe("FeedbackWidget", () => {
  it("exports a default React component", async () => {
    const mod = await import("./FeedbackWidget");
    expect(typeof mod.default).toBe("function");
    expect(mod.default.name).toBe("FeedbackWidget");
  });

  it("is imported in App.jsx", async () => {
    const fs = await import("fs");
    const appSource = fs.readFileSync(
      new URL("../App.jsx", import.meta.url),
      "utf-8"
    );
    expect(appSource).toContain('import FeedbackWidget from "./components/FeedbackWidget"');
    expect(appSource).toContain("<FeedbackWidget");
  });
});
