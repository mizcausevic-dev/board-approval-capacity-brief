import { describe, expect, it } from "vitest";
import { capacityLane, interventionPosture, payload, staffingLedger, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the capacity summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the capacity lane view", () => {
    expect(capacityLane().length).toBeGreaterThan(0);
  });

  it("returns the staffing ledger view", () => {
    expect(staffingLedger().length).toBeGreaterThan(0);
  });

  it("returns the intervention posture view", () => {
    expect(interventionPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
