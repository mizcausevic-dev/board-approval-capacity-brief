# Board Approval Capacity Brief

Board-ready approval capacity surface for reviewer bandwidth, committee throughput, escalation coverage, and decision-ready staffing tradeoffs across the executive estate.

- Live: `https://capacity.kineticgain.com/`
- Repo: `mizcausevic-dev/board-approval-capacity-brief`

## Why this matters

Leaders need more than queue visibility. They need one surface that shows where reviewer coverage, committee throughput, and escalation capacity are too thin to support the next board-backed move.

## Product depth

For executives, this turns approval-capacity pressure into a board-ready decision packet: reviewer load, committee throughput, escalation gaps, value at stake, and confidence scores are presented as staffing and intervention choices.

For operators, every overloaded lane keeps its accountable owner, board audience, reviewer count, approvals in flight, capacity theme, and safe next move attached.

For GTM and diligence, the repo demonstrates a repeatable Kinetic Gain pattern: messy operating constraints become risk, owner, proof, and next action in one public surface.

## What these repos have in common

- `risk`: the fragile handoff is made explicit before it becomes a vague operating complaint.
- `owner`: the accountable function remains attached to the next action.
- `proof`: fixtures, tests, JSON payloads, prerendered pages, screenshots, and release checks support the public story.

## Operating workflow

1. Model approval lanes, owners, audiences, reviewer capacity, queue pressure, and value at stake.
2. Calculate board-confidence and composite capacity-risk signals.
3. Publish capacity lanes, staffing ledger, intervention posture, and verification pages.
4. Use the brief for board prep, hiring tradeoffs, operating reviews, and diligence narratives.

## What it includes

- TypeScript executive-intelligence surface for approval capacity with modeled reviewer lanes, staffing pressure, committee throughput, and board-safe intervention posture
- synthetic executive lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness
- reusable outputs for capacity briefs, staffing ledgers, intervention packets, and board-ready operating memos
- prerendered static site, JSON payloads, screenshots, and docs

## Routes

- `/`
- `/capacity-lane`
- `/staffing-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Local run

```bash
cd board-approval-capacity-brief
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-approval-capacity-brief fixtures/board-approval-capacity-brief.json --format summary
npx board-approval-capacity-brief fixtures/board-approval-capacity-brief-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Capacity lane](screenshots/02-capacity-lane-proof.png)
![Staffing ledger](screenshots/03-staffing-ledger-proof.png)
![Intervention posture](screenshots/04-intervention-posture-proof.png)
