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

- **Cost Matrix Entries** — one row per company (Tier 3: one row per design). `tier` (tier1/tier2/tier3) selects which table it appears in. Tier 2 and 3 show Sqft. Tier 3 adds bed/bath, plans published, estimated total (with source) and a customization path. `quoteSortValue` drives numeric column sorting. `analysis` is the prose shown below the table.
- **Cost Matrix Footnotes** — numbered footnotes per tier.

The `/cost-matrix` page revalidates hourly, so CMS edits appear without a redeploy.

## Deploy (Vercel)

Set `DATABASE_URI` and `PAYLOAD_SECRET` as environment variables in the Vercel project, then connect this GitHub repo. Point `assembledhome.com` at the Vercel project.

## Schema changes

There are no Payload migrations in this repo. The production schema was created by Payload's dev push, and `next build` does not migrate. So a schema change ships as a hand-written, additive SQL file in `migrations-sql/`, run against Neon **before** deploying the code that needs it. Never run `next dev` against the production `DATABASE_URI`: in dev, Payload pushes the schema into whatever database it points at.

### Tier 3 go-live (2026-11)

1. Run `migrations-sql/2026-11-03-add-tier3.sql` against production (Neon SQL editor, or `psql`). It adds the `tier3` enum value and six nullable columns. It is safe to re-run, and the current production code keeps working after it.
2. Merge `stock-design-tier` into `main` and let Vercel deploy.
3. Load the rows: `export $(grep -v '^#' .env | xargs) && NODE_ENV=production npx tsx --tsconfig tsconfig.json scripts/seed-tier3.ts`. `NODE_ENV=production` is essential. The script skips rows that already exist.
4. Check `/cost-matrix` (the page is dynamic, so rows show immediately).

Note: `psql` rejects Neon's `uselibpqcompat` URI parameter; drop it from the connection string for `psql`.
