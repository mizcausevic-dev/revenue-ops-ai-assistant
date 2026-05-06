import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET /health returns service metadata", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.service, "Revenue Ops AI Assistant");
  assert.equal(response.body.status, "ok");
});

test("GET /api/accounts returns an array", async () => {
  const response = await request(app).get("/api/accounts");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length >= 1);
});

test("GET /api/revenue/summary returns top-line metrics", async () => {
  const response = await request(app).get("/api/revenue/summary");

  assert.equal(response.status, 200);
  assert.equal(response.body.totalArr, 1269000);
  assert.equal(response.body.openOpportunities, 4);
});

test("POST /api/assistant/account-brief returns fallback AI structure", async () => {
  const response = await request(app)
    .post("/api/assistant/account-brief")
    .send({ accountId: "acct-001" });

  assert.equal(response.status, 200);
  assert.equal(response.body.mode, "fallback");
  assert.ok(typeof response.body.summary === "string");
  assert.ok(Array.isArray(response.body.recommendations));
});
