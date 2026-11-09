/**
 * Adds Phoenix Haus's H5|14 Homestead model to Tier 3 of the cost matrix.
 *
 * Kept separate from seed-tier3.ts on purpose: re-running that script would also restore the
 * Croft Tier 3 row, which is pulled until Croft signs off (2026-11-05).
 *
 * Safe to re-run: skips any Tier 3 row whose company + design already exists.
 * Run with NODE_ENV=production so getPayload doesn't push the schema in dev mode:
 *
 *   export $(grep -v '^#' .env | xargs) && NODE_ENV=production npx tsx --tsconfig tsconfig.json scripts/seed-tier3-phoenix-haus.ts
 *
 * Sources:
 *  - Price, R-values (Alpha Base), inclusions and builder scope: Phoenix Haus "H5|14 Estimate" (Qwilr,
 *    pages.qwilr.com/H5-14-Alpha-Base-System-Estimate-LNpOenkSCKT3), sent to Yogesh February 2026.
 *  - Sqft, bed/bath, published plans, plans-and-engineering estimate (~$35K), design-services step:
 *    Phoenix Haus "Homestead Model Guide 2026" PDF.
 *  - Service area: phoenixhaus.com/models, checked 2026-11-09 (Montana no longer listed).
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'

const list = (...items: string[]) => items.map((item) => ({ item }))

const rows = [
  {
    company: 'Phoenix Haus',
    order: 10,
    location: 'Colorado',
    website: 'https://www.phoenixhaus.com',
    system: 'H5|14',
    sqft: '1,462 sqft · 2,060 with garage',
    bedBath: '3 bed / 2 bath · attached ADU + 2-car garage',
    plansPublished: 'Yes · floor plans in model guide',
    wallsR: 'R-40.6',
    roofR: 'R-69.2',
    quote: '$227.1K',
    quoteSortValue: 227.1,
    quoteNote: 'panels + windows + doors · $237.2K delivered',
    estimatedTotal: 'Not published',
    estimatedTotalSource: 'plans + engineering ~$35K on top, per Phoenix Haus',
    customization:
      'A design-services step refines a model for your site and needs.\nScope and cost of changes not published.',
    included: list(
      'Wall, roof, floor + interior wall panels',
      'Dense-pack cellulose + fiberboard exterior insulation',
      'Garage panels (Alpha Lite, uninsulated)',
      'Alpen Tyrol triple-pane windows',
      'ProVia exterior doors',
      'Install hardware, delivery + onsite advisor',
    ),
    notIncluded: list(
      'Plans + engineering (~$35K)',
      'Site survey + soils report',
      'Foundation',
      'Crane + panel install',
      'Roofing, siding, finishes',
      'Plumbing, electrical, mechanical',
    ),
    analysisHeadline: '$227.1K · panels, windows + doors',
    analysis: `Phoenix Haus doesn't publish prices. Its model guide has floor plans, R-values and a clear split between what it supplies and what the builder does, but no dollar figures. This number is from an estimate Phoenix Haus sent me in February 2026 for the H5|14: $227,109 for the prefab package, plus $7,343 for shipping and $2,750 for an onsite advisor, $237,202 in all with taxes included. Phoenix Haus puts that at $114 a square foot, counting all 2,060 sqft including the garage. Over the 1,462 sqft of house it's about $162.\n\nTwo things make it hard to line up against the other rows. The price includes Alpen Tyrol triple-pane windows and ProVia doors, which most rows here leave out. And it's for the Alpha Base system: 2x6 walls at R-40.6 and an R-69.2 roof. The model guide advertises the Alpha+ system (R-45.6 walls, R-75.6 roof), and I don't have a price for that version.\n\nArchitectural, engineering, MEP and civil plans aren't included. Phoenix Haus estimates them at about $35,000. The company is in Grand Junction, Colorado. Its model guide lists Montana as a service area, but its website no longer does.\n\nThe price is from Phoenix Haus's H5|14 estimate of February 2026. Specs are from its 2026 Homestead Model Guide and its website as of November 9, 2026.`,
  },
]

const run = async () => {
  const payload = await getPayload({ config: await config })

  const existing = await payload.find({
    collection: 'cost-matrix-entries',
    where: { tier: { equals: 'tier3' } },
    limit: 200,
    depth: 0,
  })
  const seen = new Set(existing.docs.map((d) => `${d.company}::${d.system ?? ''}`))

  let created = 0
  for (const row of rows) {
    const key = `${row.company}::${row.system}`
    if (seen.has(key)) {
      console.log(`skip (exists): ${key}`)
      continue
    }
    await payload.create({ collection: 'cost-matrix-entries', data: { ...row, tier: 'tier3' } })
    console.log(`created: ${key}`)
    created++
  }
  console.log(`done: ${created} created, ${rows.length - created} skipped`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
