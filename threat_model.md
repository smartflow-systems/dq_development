# Threat Model

## Project Overview

A Node.js/Express 5 API server with a React frontend (SmartFlow Systems), backed by PostgreSQL via Drizzle ORM. The stack uses pnpm workspaces with TypeScript 5.9. There is a shared API contract layer generated from an OpenAPI spec (Orval → Zod + React Query hooks). The application is not yet deployed to production.

- **API server**: Express 5 at `artifacts/api-server/` — currently only exposes `/api/healthz`.
- **Frontend**: Vite + React at `artifacts/smartflow/` — currently a stub with no-auth pages.
- **Mockup sandbox**: Dev-only design canvas at `artifacts/mockup-sandbox/` — not production-reachable.
- **DB layer**: Drizzle ORM connecting to PostgreSQL via `DATABASE_URL` env var.

## Assets

- **Application secrets** — `DATABASE_URL` connection string. Compromise allows full database access.
- **Future user data** — the schema is currently empty; as features are added this will include PII and business data.
- **API auth tokens** — not yet implemented; `custom-fetch.ts` already contains token getter infrastructure.

## Trust Boundaries

- **Browser → API server** — all client requests cross this boundary. Currently unauthenticated; must be hardened before adding protected routes.
- **API server → PostgreSQL** — Drizzle parameterizes queries; this boundary is low-risk today. Injection risk increases as query complexity grows.
- **Public / Authenticated** — no separation yet. All routes public.
- **Dev / Production** — mockup-sandbox and vite dev server are dev-only; Vite dev server is not built into the production artifact.

## Scan Anchors

- **Production entry point**: `artifacts/api-server/src/app.ts` (Express app), `artifacts/api-server/src/routes/index.ts`
- **Highest-risk area**: CORS configuration in `app.ts` — wildcard origin; must be restricted when auth is added
- **Public surface**: `/api/healthz` only today
- **Dev-only**: `artifacts/mockup-sandbox/`, Vite dev server (`artifacts/smartflow/vite.config.ts`)
- **DB schema**: `lib/db/src/schema/index.ts` (currently empty)

## Threat Categories

### Spoofing

No authentication is implemented yet. The `custom-fetch.ts` client has a `setAuthTokenGetter` hook for future bearer tokens. Before any protected routes are added, authentication middleware must be applied. Webhooks or callbacks from third parties must be signature-verified.

### Tampering

All API inputs will need Zod validation. The Zod schema library and `@workspace/api-zod` generated schemas are already in place, which is the correct foundation.

### Information Disclosure

CORS is configured with `app.use(cors())` (no options), which defaults to `Access-Control-Allow-Origin: *`. Any malicious website can make credentialed cross-origin requests to the API. This is low-risk today (only `/healthz` exists), but will become a serious issue as soon as authentication cookies or sensitive endpoints are added.

The logger (`pino`) correctly redacts `Authorization` headers and cookies. Query strings are stripped from logged URLs.

### Denial of Service

No rate limiting or request-size limits beyond Express's built-in defaults. The `express.json()` middleware uses a 100 KB default body limit. No authentication throttling. These gaps must be addressed before public launch.

### Elevation of Privilege

No authorization checks exist yet (no routes require them). Drizzle ORM parameterizes queries, reducing SQL injection risk. No file upload endpoints exist yet.
