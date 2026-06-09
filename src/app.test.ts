import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-approval-capacity-brief app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Approval Capacity Brief");
  });

  it("serves the capacity lane route", async () => {
    const response = await request(app).get("/capacity-lane");
    expect(response.status).toBe(200);
  });

  it("serves the staffing ledger route", async () => {
    const response = await request(app).get("/staffing-ledger");
    expect(response.status).toBe(200);
  });

  it("serves the intervention posture route", async () => {
    const response = await request(app).get("/intervention-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification and docs routes", async () => {
    const verification = await request(app).get("/verification");
    const docs = await request(app).get("/docs");

    expect(verification.status).toBe(200);
    expect(verification.text).toContain("Synthetic approval-capacity data");
    expect(docs.status).toBe(200);
    expect(docs.text).toContain("/api/payload");
  });

  it("serves the public JSON APIs", async () => {
    const routes = [
      "/api/dashboard/summary",
      "/api/capacity-lane",
      "/api/staffing-ledger",
      "/api/intervention-posture",
      "/api/risk-map",
      "/api/verification",
      "/api/sample"
    ];

    for (const route of routes) {
      const response = await request(app).get(route);
      expect(response.status, route).toBe(200);
    }
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });
});
