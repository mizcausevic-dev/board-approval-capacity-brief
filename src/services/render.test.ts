import { describe, expect, it } from "vitest";
import {
  renderCapacityLane,
  renderDocs,
  renderInterventionPosture,
  renderOverview,
  renderStaffingLedger,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderOverview()).toContain("Board Approval Capacity Brief");
  });

  it("renders the added product-depth proof and shared KG pattern", () => {
    const html = renderOverview();
    expect(html).toContain("Product depth");
    expect(html).toContain("What these repos have in common");
    expect(html).toContain("For GTM and diligence");
    expect(html).toContain("portfolio.kineticgain.com");
    expect(html).toContain("board-approval-capacity-brief");
  });

  it("renders each board-capacity route with the expected active nav", () => {
    expect(renderCapacityLane()).toContain('class="active" href="/capacity-lane"');
    expect(renderStaffingLedger()).toContain('class="active" href="/staffing-ledger"');
    expect(renderInterventionPosture()).toContain('class="active" href="/intervention-posture"');
    expect(renderVerification()).toContain('class="active" href="/verification"');
  });

  it("escapes payload content inside the docs route", () => {
    expect(renderDocs()).toContain("&quot;report&quot;");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
