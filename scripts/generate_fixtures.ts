import { writeFileSync } from "node:fs";
import { sampleBoardApprovalCapacity } from "../src/data/sampleVerticalBrief.js";
import { toExport } from "../src/analyze.js";

const clean = sampleBoardApprovalCapacity.map((item) => ({
  ...item,
  relatedSurfaces: [],
  companyTags: [],
  narrative: "[redacted]",
  nextMove: "[redacted]"
}));

writeFileSync("fixtures/board-approval-capacity-brief.json", JSON.stringify(toExport(sampleBoardApprovalCapacity), null, 2));
writeFileSync("fixtures/board-approval-capacity-brief-clean.json", JSON.stringify(toExport(clean), null, 2));
