# Architecture

Board Approval Capacity Brief is a static-friendly TypeScript executive-intelligence surface for showing where reviewer bandwidth, committee load, escalation coverage, and queue pressure are constraining board-backed decisions.

## Routes

- `/`
- `/capacity-lane`
- `/staffing-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Data Flow

1. Sample approval-capacity items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores queue days, committee load, reviewer strength, escalation coverage, decision coverage, and board confidence.
3. `src/services/verticalBriefService.ts` shapes the board-readable capacity packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.
