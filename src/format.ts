import type { BoardApprovalCapacityExport } from "./types.js";

export function formatSummary(report: BoardApprovalCapacityExport) {
  return [
    "Board Approval Capacity Brief",
    `Generated: ${report.generatedAt}`,
    `Lanes: ${report.summary.items}`,
    `Constrained lanes: ${report.summary.constrainedLanes}`,
    `Hire or reallocate lanes: ${report.summary.hireOrReallocateLanes}`,
    `Average board confidence: ${report.summary.averageBoardConfidence}`,
    `Value at stake: $${report.summary.valueAtStakeMillions}M`,
    `Lead: ${report.summary.leadingMessage}`
  ].join("\n");
}

export function formatJson(report: BoardApprovalCapacityExport) {
  return JSON.stringify(report, null, 2);
}
