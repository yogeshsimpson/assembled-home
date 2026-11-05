/**
 * Adds New Frameworks' Casita stock designs (Flora 900, Árbol 1200) to Tier 3 of the cost matrix.
 *
 * Kept separate from seed-tier3.ts on purpose: re-running that script would also restore the
 * Croft Tier 3 row, which is pulled until Croft signs off (2026-11-05).
 *
 * Safe to re-run: skips any Tier 3 row whose company + design already exists.
 * Run with NODE_ENV=production so getPayload doesn't push the schema in dev mode:
 *
 *   export $(grep -v '^#' .env | xargs) && NODE_ENV=production npx tsx --tsconfig tsconfig.json scripts/seed-tier3-new-frameworks.ts
 *
 * Sources:
 *  - Kit prices, inclusions, exclusions and add/alt prices: New Frameworks "Casita Kit Inclusions,
 *    Exclusions, and Add/Alts" packet, dated 2026-01-26.
 *  - R-values, bed/bath, install pricing: newframeworks.com/casitas, checked 2026-11-05.
 *  - Customization terms: newframeworks.com/faq, checked 2026-11-05.
 *  - Estimated total: New Frameworks' "What Does It Cost to Build a Casita?" guide (June 2026),
 *    $450-$700/sf under 1,000 sf and $400-$600/sf over 1,000 sf, Northeast.
 *  - "On piers" figures are my arithmetic from the packet's add/alt chart: base kit + insulated floor
 *    panels + foundation beams + 1st-floor bathroom service floor + fasteners + seam tape.
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'

const list = (...items: string[]) => items.map((item) => ({ item }))

const NF_CUSTOMIZATION =
  'Pre-vetted add/alts priced per model (triple-pane windows, glass doors, extra windows in set locations).\nAnything else: design consultation at $125/hr, 2-hour minimum deposit.'

const NF_INCLUDED = list(
  'Straw + wood-fiber wall panels (double stud)',
  'Wood-fiber gable + roof panels',
  'Loft panels + structural framing',
  'Marvin dual-pane windows + exterior door',
  'Shop-applied air barrier + WRB',
  'Pricing + architectural sets',
  '10 hours of virtual support',
)

const nfNotIncluded = (floorAndBeams: string) =>
  list(
    `Floor panels + foundation beams (add/alt, ${floorAndBeams})`,
    'Fasteners + seam tape (add/alt)',
    'Foundation (helical piers recommended)',
    'Shipping + install ($15 to $24/sqft)',
    'Interior walls, doors + stairs',
    'Roofing, overhangs + finishes',
    'Plumbing, electrical, mechanical',
  )

const rows = [
  {
    company: 'New Frameworks',
    order: 8,
    location: 'Vermont · ships across North America',
    website: 'https://www.newframeworks.com',
    system: 'Flora 900',
    sqft: '~900 sqft · loft',
    bedBath: '1 bed / 1 bath · optional 2nd bed + bath upstairs',
    plansPublished: 'Yes · pricing set $299, architectural set $4,249',
    wallsR: 'R-38',
    roofR: 'R-60',
    quote: '$124.2K',
    quoteSortValue: 124.2,
    quoteNote: 'base kit · ~$172K on piers with floor + add/alts',
    estimatedTotal: '$405K to $630K',
    estimatedTotalSortValue: 405,
    estimatedTotalSource: "New Frameworks' cost guide: $450 to $700/sqft under 1,000 sqft, Northeast",
    customization: NF_CUSTOMIZATION,
    included: NF_INCLUDED,
    notIncluded: nfNotIncluded('$30.6K'),
    analysisHeadline: '$124.2K to $152.5K · base kit',
    analysis: `New Frameworks publishes more than most: a kit price for every Casita, a line-by-line inclusions chart and a priced add/alt list. The catch is that the base kit isn't a complete shell. Floor panels, foundation beams, fasteners and seam tape are all add/alts, and on helical piers, the foundation the Casitas are designed for, the floor panels are required. Adding those back puts the Flora 900 at about $172K and the Árbol 1200 at about $212K before shipping and install. That's my arithmetic from their add/alt chart, not their number.\n\nThe R-values are from their Casitas page: R-38 walls, R-60 roof and R-55 floors. They're higher than the Tier 1 quote for my design (R-35 walls, R-50 roof).\n\nThe estimated total is New Frameworks' own guide for high-performance natural building in the Northeast: $450 to $700 a square foot under 1,000 sqft, and $400 to $600 over. Install runs $15 to $24 a square foot, generally within two hours of one of their Seed Collaborator offices. The closest to Montana is in Arvada, Colorado.\n\nKit prices and inclusions are from New Frameworks' Casita kit packet dated January 26, 2026. R-values, bed/bath counts, the cost guide and the customization terms are from their website as of November 5, 2026.`,
  },
  {
    company: 'New Frameworks',
    order: 9,
    location: 'Vermont · ships across North America',
    website: 'https://www.newframeworks.com',
    system: 'Árbol 1200',
    sqft: '~1,200 sqft · two stories',
    bedBath: '3 bed / 1.5 bath · 1st-floor bedroom',
    plansPublished: 'Yes · pricing set $299, architectural set $4,999',
    wallsR: 'R-38',
    roofR: 'R-60',
    quote: '$152.5K',
    quoteSortValue: 152.5,
    quoteNote: 'base kit · ~$212K on piers with floor + add/alts',
    estimatedTotal: '$480K to $720K',
    estimatedTotalSortValue: 480,
    estimatedTotalSource: "New Frameworks' cost guide: $400 to $600/sqft over 1,000 sqft, Northeast",
    customization: NF_CUSTOMIZATION,
    included: NF_INCLUDED,
    notIncluded: nfNotIncluded('$38.3K'),
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
