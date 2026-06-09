import { capacityLane, interventionPosture, payload, riskMap, staffingLedger, summary, verification } from "./verticalBriefService.js";

const productTitle = "Board Approval Capacity Brief";
const domain = "https://capacity.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://portfolio.kineticgain.com/">Portfolio</a>
        <a href="https://suite.kineticgain.com/">Suite</a>
        <a href="https://github.com/mizcausevic-dev/board-approval-capacity-brief">Repo</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/capacity-lane", "Capacity lane"],
    ["/staffing-ledger", "Staffing ledger"],
    ["/intervention-posture", "Intervention posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = capacityLane().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Capacity theme:</strong> ${escapeHtml(item.capacityTheme)}</p>
        <p><strong>Reviewers:</strong> ${item.reviewersAvailable} · <strong>In flight:</strong> ${item.approvalsInFlight}</p>
        <p><strong>Board confidence:</strong> ${item.boardConfidenceScore}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeCapacityRiskScore} · $${item.valueAtStakeMillions}M at stake</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Approval capacity</span>
      <h1>Where is board-safe approval demand outrunning reviewer bandwidth, committee throughput, and escalation coverage?</h1>
      <p class="lede">Board Approval Capacity Brief turns reviewer staffing, queue pressure, escalation coverage, and decision confidence into one board-readable packet for hiring, reallocation, escalation, or queue holds.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Capacity lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled approval-capacity lanes in the current board packet.</div></div>
        <div class="metric"><span class="metric-label">Constrained lanes</span><span class="metric-value">${executiveSummary.constrainedLanes}</span><div class="metric-copy">Lanes with severe queue, load, reviewer, escalation, decision-coverage, or confidence pressure.</div></div>
        <div class="metric"><span class="metric-label">Hire or reallocate</span><span class="metric-value">${executiveSummary.hireOrReallocateLanes}</span><div class="metric-copy">Lanes that already justify staffing moves before more scope is approved.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to unresolved approval-capacity constraints.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Capacity lane</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible capacity exposures</h2>
      <ul>${risks}</ul>
    </section>
    <section class="section">
      <h2>Product depth</h2>
      <div class="grid">
        <article class="card">
          <div class="chip">For executives</div>
          <h3>Capacity becomes a decision packet, not a queue report.</h3>
          <p>The surface converts reviewer load, committee throughput, escalation gaps, and confidence scores into a board-readable staffing and intervention brief.</p>
        </article>
        <article class="card">
          <div class="chip">For operators</div>
          <h3>Every overloaded lane keeps its owner and next move.</h3>
          <p>Capacity pressure stays tied to the accountable owner, audience, reviewers available, approvals in flight, and the action leadership can actually take.</p>
        </article>
        <article class="card">
          <div class="chip">For GTM and diligence</div>
          <h3>The story is useful to buyers and technical reviewers.</h3>
          <p>This repo shows how Kinetic Gain turns messy operating constraints into reusable executive intelligence: risk, owner, proof, and next action in one surface.</p>
        </article>
      </div>
    </section>
    <section class="section">
      <h2>What these repos have in common</h2>
      <div class="grid">
        <article class="card">
          <div class="chip">Risk</div>
          <h3>The fragile handoff is made visible.</h3>
          <p>Here the fragile handoff is approval demand outrunning reviewer bandwidth, committee cadence, and escalation coverage while leaders keep approving more work.</p>
        </article>
        <article class="card">
          <div class="chip">Owner</div>
          <h3>The accountable function stays attached.</h3>
          <p>Each lane keeps owner, audience, capacity theme, staffing pressure, and intervention posture visible so accountability does not disappear into status theater.</p>
        </article>
        <article class="card">
          <div class="chip">Proof</div>
          <h3>The claim is inspectable.</h3>
          <p>The repo includes fixtures, tests, JSON payloads, prerendered pages, screenshots, and release checks that make the public story reproducible.</p>
        </article>
      </div>
    </section>`,
    "Board-ready approval-capacity surface for reviewer bandwidth, committee load, intervention posture, and staffing tradeoffs across the executive estate."
  );
}

export function renderCapacityLane() {
  const rows = capacityLane()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.capacityTheme)}</td>
        <td>${item.reviewersAvailable}</td>
        <td>${item.approvalsInFlight}</td>
        <td>${item.boardConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Capacity lane",
    "/capacity-lane",
    `<section class="hero">
      <span class="eyebrow">Capacity lane</span>
      <h1>Each lane stays tied to one capacity theme, one board audience, one staffing action, and one safe next move.</h1>
      <p class="lede">The capacity lane keeps reviewer pressure readable instead of hiding queue load and staffing tradeoffs across scattered committee packets.</p>
      <div class="nav">${navLinks("/capacity-lane")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Capacity theme</th><th>Reviewers</th><th>In flight</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Approval-capacity view showing actions, staffing pressure, and board-confidence strength."
  );
}

export function renderStaffingLedger() {
  const rows = staffingLedger()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.capacityHeadline)}</td>
        <td>${escapeHtml(item.backlogSignal)}</td>
        <td>${escapeHtml(item.escalationOwner)}</td>
        <td>${item.reviewersAvailable}</td>
        <td>${item.approvalsInFlight}</td>
        <td>${escapeHtml(item.requiredEvidence.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Staffing ledger",
    "/staffing-ledger",
    `<section class="hero">
      <span class="eyebrow">Staffing ledger</span>
      <h1>Capacity headlines, backlog signals, escalation owners, reviewer counts, and required evidence stay visible before queues become a board problem.</h1>
      <p class="lede">This view makes it obvious which approval bottlenecks are truly staffing problems and who must respond before leadership funds more scope.</p>
      <div class="nav">${navLinks("/staffing-ledger")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Capacity headline</th><th>Backlog signal</th><th>Escalation owner</th><th>Reviewers</th><th>In flight</th><th>Required evidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Staffing-ledger view for approval backlog, named escalation ownership, and reviewer bandwidth."
  );
}

export function renderInterventionPosture() {
  const rows = interventionPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.compositeCapacityRiskScore}</td>
        <td>${escapeHtml(item.queue.severity)}</td>
        <td>${escapeHtml(item.committee.severity)}</td>
        <td>${escapeHtml(item.reviewer.severity)}</td>
        <td>${escapeHtml(item.escalation.severity)}</td>
        <td>${escapeHtml(item.boardConfidence.severity)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Intervention posture",
    "/intervention-posture",
    `<section class="hero">
      <span class="eyebrow">Intervention posture</span>
      <h1>See where leadership should hire, reallocate, escalate, or hold before approval-capacity strain distorts the board story.</h1>
      <p class="lede">This posture view keeps queue risk and staffing risk connected so leadership can intervene before capacity drift compounds across adjacent lanes.</p>
      <div class="nav">${navLinks("/intervention-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Composite risk</th><th>Queue</th><th>Committee</th><th>Reviewer</th><th>Escalation</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Intervention posture for approval-capacity severities, staffing stress, and board-safe action."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this approval-capacity packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, staffing assumptions, and reproducibility notes visible before anyone treats the sample as live board evidence.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Approval Capacity Brief sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Approval Capacity Brief docs</h1>
      <p class="lede">This surface packages board-readable approval-capacity signals into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/capacity-lane</code> keeps actions, staffing themes, and next moves readable.</li>
        <li><code>/staffing-ledger</code> compares capacity headlines, backlog signals, and escalation ownership.</li>
        <li><code>/intervention-posture</code> shows which lanes should hire, reallocate, escalate, or hold.</li>
        <li><code>/api/payload</code> exposes the reproducible approval-capacity packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Approval Capacity Brief and its board-ready routes."
  );
}
