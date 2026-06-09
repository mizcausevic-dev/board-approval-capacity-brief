import { describe, expect, it } from "vitest";
import { formatJson, formatSummary } from "./format.js";
import { payload } from "./services/verticalBriefService.js";

describe("format", () => {
  const report = payload().report;

  it("formats the board-capacity summary for CLI output", () => {
    const summary = formatSummary(report);

    expect(summary).toContain("Board Approval Capacity Brief");
    expect(summary).toContain(`Lanes: ${report.summary.items}`);
    expect(summary).toContain(`Value at stake: $${report.summary.valueAtStakeMillions}M`);
  });

  it("formats the report as indented JSON", () => {
    const formatted = formatJson(report);

    expect(JSON.parse(formatted).summary.items).toBe(report.summary.items);
    expect(formatted).toContain('\n  "summary"');
  });
});
