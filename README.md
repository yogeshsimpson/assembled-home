# Assembled Home

Landing page and the **Cost Matrix** for [assembledhome.com](https://assembledhome.com).

Built with **Next.js (App Router) + Payload CMS + Postgres (Neon)**, deployed on Vercel.

- `/` — marketing landing page (hardcoded, not CMS-backed)
- `/cost-matrix` — the Issue 12 cost matrix, rendered from Payload (sortable tier tables + footnotes + analysis)
- `/admin` — Payload admin to edit the matrix

## Stack

| Piece    | Choice                            |
| -------- | --------------------------------- |
| Frontend | Next.js 16, React 19              |
| CMS      | Payload 3                         |
| Database | Postgres (Neon)                   |
| Hosting  | Vercel                            |
| Fonts    | Fraunces · Inter · JetBrains Mono |

## Local setup

1. Copy env and fill in values:
   ```bash
   cp .env.example .env
   ```
   - `DATABASE_URI` — Neon **pooled** connection string
   - `PAYLOAD_SECRET` — any long random string (`openssl rand -hex 32`)

2. Install and run:
   ```bash
   npm install
   npm run dev
   ```
   On first run against an empty database, Payload creates the schema. Visit `/admin` to create the first user.

3. Seed the cost matrix from Issue 12:
   ```bash
   npm run payload -- run src/seed.ts
   ```

## Content model (Payload, group "Cost Matrix")

- **Cost Matrix Entries** — one row per company. `tier` (tier1/tier2) selects which table it appears in. Tier 1 shows Roof R; Tier 2 shows Sqft. `quoteSortValue` drives numeric column sorting. `analysis` is the prose shown below the table.
- **Cost Matrix Footnotes** — numbered footnotes per tier.

The `/cost-matrix` page revalidates hourly, so CMS edits appear without a redeploy.

## Deploy (Vercel)

Set `DATABASE_URI` and `PAYLOAD_SECRET` as environment variables in the Vercel project, then connect this GitHub repo. Point `assembledhome.com` at the Vercel project.
