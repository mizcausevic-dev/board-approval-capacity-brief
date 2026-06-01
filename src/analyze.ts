import type {
  BoardApprovalCapacityExport,
  BoardApprovalCapacityItem,
  BoardApprovalCapacityReportItem,
  CapacityAssessment,
  CapacitySeverity
} from "./types.js";

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): CapacityAssessment {
  let severity: CapacitySeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): CapacityAssessment {
  let severity: CapacitySeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardApprovalCapacityItem[],
  options: { now?: string } = {}
): BoardApprovalCapacityExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardApprovalCapacityReportItem[] = items.map((item) => {
    const queueAssessment = assessDelay(
      item.approvalQueueDays,
      9,
      15,
      "Approval queue time remains inside the current board-safe planning window.",
      "Approval queue time is rising and will start to slow board actions if staffing stays flat.",
      "Approval queue time is now materially constrained and is pacing the next board decision."
    );

    const committeeAssessment = assessDelay(
      item.committeeLoadScore,
      42,
      58,
      "Committee load remains inside the current reviewer capacity band.",
      "Committee load is rising and needs staffing relief before the next governance cycle.",
      "Committee load is now exceeding practical capacity and distorting decision timing."
    );

    const reviewerAssessment = assessStrength(
      item.reviewerCapacityScore,
      76,
      60,
      "Reviewer capacity is strong enough to support the current approval calendar.",
      "Reviewer capacity is thinning and needs closer load management before more scope lands.",
      "Reviewer capacity is too weak to support the current approval demand."
    );

    const escalationAssessment = assessStrength(
      item.escalationCoverageScore,
      78,
      62,
      "Escalation coverage is strong enough to prevent queue drift from becoming a board problem.",
      "Escalation coverage is becoming uneven and needs reinforcement across adjacent lanes.",
      "Escalation coverage is too thin to absorb the current approval load safely."
    );

    const decisionCoverageAssessment = assessStrength(
      item.decisionCoverageScore,
      75,
      58,
      "Decision coverage remains strong enough to keep approval packets moving cleanly.",
      "Decision coverage is getting patchy and may soon require reallocation or triage.",
      "Decision coverage is too weak to sustain clean board-facing approvals."
    );

    const boardConfidenceAssessment = assessStrength(
      item.boardConfidenceScore,
      78,
      62,
      "Board confidence remains clear enough to support the current staffing plan.",
      "Board confidence is becoming dependent on extra explanation and queue triage.",
      "Board confidence is too thin to support additional approval demand without intervention."
    );

    const compositeCapacityRiskScore =
      Math.round(
        ((item.approvalQueueDays * 3 +
          item.committeeLoadScore +
          (100 - item.reviewerCapacityScore) +
          (100 - item.escalationCoverageScore) +
          (100 - item.decisionCoverageScore) +
          (100 - item.boardConfidenceScore)) /
          8) *
          10
      ) / 10;

    return {
      ...item,
      queueAssessment,
      committeeAssessment,
      reviewerAssessment,
      escalationAssessment,
      decisionCoverageAssessment,
      boardConfidenceAssessment,
      compositeCapacityRiskScore
    };
  });

  const constrainedLanes = reportItems.filter(
    (item) =>
      item.queueAssessment.severity === "HIGH" ||
      item.committeeAssessment.severity === "HIGH" ||
      item.reviewerAssessment.severity === "HIGH" ||
      item.escalationAssessment.severity === "HIGH" ||
      item.decisionCoverageAssessment.severity === "HIGH" ||
      item.boardConfidenceAssessment.severity === "HIGH"
  ).length;

  const hireOrReallocateLanes = reportItems.filter(
    (item) => item.action === "HIRE" || item.action === "REALLOCATE"
  ).length;

  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    constrainedLanes === 0
      ? "Approval capacity remains aligned with the current board agenda and does not require staffing changes."
      : constrainedLanes <= 2
        ? "A few lanes are accumulating enough reviewer and committee pressure to justify board-visible reallocation."
        : "Approval capacity is now a shared operating constraint across multiple lanes and needs explicit staffing intervention."
;

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      constrainedLanes,
      hireOrReallocateLanes,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardApprovalCapacityItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
