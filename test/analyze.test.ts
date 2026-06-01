import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardApprovalCapacity } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardApprovalCapacity, { now: "2026-06-01T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardApprovalCapacity.length);
  });

  it("counts constrained lanes", () => {
    const report = analyze(sampleBoardApprovalCapacity, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.constrainedLanes).toBeGreaterThan(0);
  });

  it("counts hire or reallocate actions", () => {
    const report = analyze(sampleBoardApprovalCapacity, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.hireOrReallocateLanes).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleBoardApprovalCapacity, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(154);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardApprovalCapacity, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });
});
