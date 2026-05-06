# Revenue Ops AI Assistant Architecture

## Service Overview

Revenue Ops AI Assistant is a compact backend service designed to model how a revenue, growth, or RevOps team could combine structured SaaS operating data with AI-assisted narrative output.

The service is intentionally opinionated:

- relational operating data is modeled in PostgreSQL via Prisma
- operational APIs expose accounts, opportunities, campaigns, activities, and revenue context
- assistant endpoints convert those metrics into operator-ready summaries and recommendations

## Request Flow

1. Requests enter through `helmet`, `cors`, `morgan`, and JSON parsing.
2. Route handlers map requests to account, campaign, activity, revenue, or assistant workflows.
3. Structured data is sourced from the in-repo sample data model, mirrored in Prisma schema and seed logic.
4. AI endpoints package bounded metrics into structured prompts for OpenAI.
5. If no `OPENAI_API_KEY` is configured, fallback summaries still return useful output for local demos.
6. Errors are normalized through a centralized JSON error handler.

## Endpoint Map

| Endpoint | Responsibility |
| --- | --- |
| `GET /health` | Runtime status and service metadata |
| `GET /api/accounts` | Account-level revenue intelligence data |
| `GET /api/accounts/:id` | Single account with contacts, opportunities, activities, and revenue snapshots |
| `GET /api/opportunities` | Pipeline opportunity listing |
| `GET /api/campaigns` | Campaign performance listing |
| `GET /api/activities` | Engagement event stream |
| `GET /api/revenue/summary` | Top-line revenue metrics |
| `POST /api/assistant/account-brief` | AI-assisted account summary |
| `POST /api/assistant/pipeline-summary` | AI-assisted pipeline summary |
| `POST /api/assistant/campaign-insights` | AI-assisted campaign summary |

## AI Design Notes

- prompts are structured and narrow
- responses include source metrics so summaries remain explainable
- fallback mode keeps the project runnable without external credentials
- AI is used for narrative interpretation, not authoritative calculation

## Future Production Upgrades

- swap in a live PostgreSQL connection and migrations-driven runtime
- add auth, audit logs, and row-level access control
- persist assistant outputs and analyst feedback
- add prompt evaluation and model cost tracking
- publish events to CRM or analytics systems
