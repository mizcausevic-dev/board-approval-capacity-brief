import { analyze } from "../analyze.js";
import { sampleBoardApprovalCapacity } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardApprovalCapacity, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Add reviewer capacity in AI and biotech first, rebalance identity and procurement coverage second, and hold FinTech queue growth until decision coverage catches up."
  };
}

export function capacityLane() {
  return sampleBoardApprovalCapacity.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    capacityTheme: item.capacityTheme,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove,
    reviewersAvailable: item.reviewersAvailable,
    approvalsInFlight: item.approvalsInFlight
  }));
}

export function staffingLedger() {
  return sampleBoardApprovalCapacity.map((item) => ({
    lane: item.lane,
    capacityHeadline: item.capacityHeadline,
    backlogSignal: item.backlogSignal,
    escalationOwner: item.escalationOwner,
    requiredEvidence: item.requiredEvidence,
    reviewersAvailable: item.reviewersAvailable,
    approvalsInFlight: item.approvalsInFlight
  }));
}

export function interventionPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeCapacityRiskScore: item.compositeCapacityRiskScore,
    queue: item.queueAssessment,
    committee: item.committeeAssessment,
    reviewer: item.reviewerAssessment,
    escalation: item.escalationAssessment,
    decisionCoverage: item.decisionCoverageAssessment,
    boardConfidence: item.boardConfidenceAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeCapacityRiskScore: item.compositeCapacityRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic approval-capacity data only - no live committee calendars, reviewer rosters, or actual board packets are included.",
    "Scores are modeled to show how Kinetic Gain can turn reviewer bandwidth and escalation coverage into board-readable staffing tradeoffs.",
    "All routes are read-only and demonstrate approval-capacity packaging, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    capacityLane: capacityLane(),
    staffingLedger: staffingLedger(),
    interventionPosture: interventionPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardApprovalCapacity
  };
}
