export type ApprovalCapacityTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type ApprovalCapacityAction = "HIRE" | "REALLOCATE" | "ESCALATE" | "HOLD";

export type CapacitySeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardApprovalCapacityItem {
  id: string;
  lane: string;
  track: ApprovalCapacityTrack;
  action: ApprovalCapacityAction;
  capacityTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  capacityHeadline: string;
  backlogSignal: string;
  escalationOwner: string;
  requiredEvidence: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  reviewersAvailable: number;
  approvalsInFlight: number;
  approvalQueueDays: number;
  committeeLoadScore: number;
  reviewerCapacityScore: number;
  escalationCoverageScore: number;
  decisionCoverageScore: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface CapacityAssessment {
  severity: CapacitySeverity;
  ok: boolean;
  message: string;
}

export interface BoardApprovalCapacityReportItem extends BoardApprovalCapacityItem {
  queueAssessment: CapacityAssessment;
  committeeAssessment: CapacityAssessment;
  reviewerAssessment: CapacityAssessment;
  escalationAssessment: CapacityAssessment;
  decisionCoverageAssessment: CapacityAssessment;
  boardConfidenceAssessment: CapacityAssessment;
  compositeCapacityRiskScore: number;
}

export interface BoardApprovalCapacitySummary {
  items: number;
  constrainedLanes: number;
  hireOrReallocateLanes: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardApprovalCapacityExport {
  generatedAt: string;
  summary: BoardApprovalCapacitySummary;
  items: BoardApprovalCapacityReportItem[];
}

export interface BoardApprovalCapacityPayload {
  report: BoardApprovalCapacityExport;
  capacityLane: ReturnType<typeof import("./services/verticalBriefService.js").capacityLane>;
  staffingLedger: ReturnType<typeof import("./services/verticalBriefService.js").staffingLedger>;
  interventionPosture: ReturnType<typeof import("./services/verticalBriefService.js").interventionPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardApprovalCapacityItem[];
}
