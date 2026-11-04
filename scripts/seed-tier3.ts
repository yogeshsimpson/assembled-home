/**
 * Adds the Tier 3 rows (stock designs from panel companies) to the cost matrix.
 *
 * Safe to re-run: skips any Tier 3 row whose company + design already exists.
 * Run with NODE_ENV=production so getPayload doesn't push the schema in dev mode:
 *
 *   export $(grep -v '^#' .env | xargs) && NODE_ENV=production npx tsx --tsconfig tsconfig.json scripts/seed-tier3.ts
 *
 * Sources (all as of Oct-Nov 2026):
 *  - Timber Age: panel prices and ~R-50 from Chris Hamm (call, 2026-10-01; prices ran in Issue 16).
 *    Totals from Timber Age's website "Total Estimated Cost" ranges.
 *  - Collective Carpentry: collectivecarpentry.com model pages, PDF packets and calculator, checked 2026-10-14.
 *  - Hereabout x B.PUBLIC Nest: Hereabout planning-set materials and B.PUBLIC estimate EST-000984 (July 2026;
 *    ran in Issue 15). Semi-custom fee from Holly Mumford's coffee chat, 2026-10-16.
 *  - Croft: croft.haus and kit packets, checked 2026-10-14.
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'

const list = (...items: string[]) => items.map((item) => ({ item }))

const TIMBER_AGE_CUSTOMIZATION =
  'No rubric yet for where stock becomes custom. Changes are handled case by case.'

const COLLECTIVE_CUSTOMIZATION =
  '20 design hours included (site plan, orientation, slab foundation). Layout changes billed hourly.\nFull custom design to 100% construction drawings: $5K to $20K, hourly.'

const COLLECTIVE_INCLUDED = list(
  'Insulated wall, floor + roof panels',
  'Glulam structure',
  'Air/weather sealing, rainscreen prep',
  '50% design-development drawings',
)

const collectiveNotIncluded = (windows: string) =>
  list(
    `Windows + doors (${windows})`,
    'Panel + window install',
    'Foundation',
    'Roofing, siding, finishes',
    'Plumbing, electrical, mechanical',
    'Engineering + energy modeling',
  )

const rows = [
  // ---------------- Timber Age ----------------
  {
    company: 'Timber Age',
    order: 1,
    location: 'Colorado',
    website: 'https://www.timberage.com',
    system: 'Willows Edge',
    sqft: '~1,200 sqft · two stories',
    bedBath: '2 bed / 2 bath · built-in garage',
    plansPublished: 'No',
    wallsR: '~R-50',
    roofR: '~R-50',
    quote: '~$150K',
    quoteSortValue: 150,
    quoteNote: 'panel system · per Timber Age',
    estimatedTotal: '$297K to $440K',
    estimatedTotalSortValue: 297,
    estimatedTotalSource: 'Timber Age website estimate',
    customization: TIMBER_AGE_CUSTOMIZATION,
    included: list('CLT panels w/ dense-pack cellulose', 'Itemized breakdown not provided yet'),
    notIncluded: list('Windows (unconfirmed)', 'Foundation', 'Finishes + mechanicals'),
    analysisHeadline: '~$150K to ~$200K · panel system',
    analysis: `Timber Age doesn't publish a panel price, only a total-cost range for each design. Chris Hamm gave me the panel numbers on a call in October: about $150K for Willows Edge and about $200K for Ponder House. The Ponder House number is "all in" for the system, includes the garage and a sizable contingency, and leaves out windows and window installation. I haven't seen an itemized breakdown for either.\n\nThe R-50 is Chris's verbal figure for the wall and roof (12 inches of dense-pack cellulose plus 3 inches of CLT), not a published spec. It's higher than the Tier 1 quote because Tier 1 priced the most affordable adequate wall.\n\nNeither design had been built or sold as of October 2026.`,
  },
  {
    company: 'Timber Age',
    order: 2,
    location: 'Colorado',
    website: 'https://www.timberage.com',
    system: 'Ponder House',
    sqft: '1,400-1,600 sqft · two stories',
    bedBath: '2 bed + loft, 3 bed, or 4 bed · 1- or 2-car garage',
    plansPublished: 'No',
    wallsR: '~R-50',
    roofR: '~R-50',
    quote: '~$200K',
    quoteSortValue: 200,
    quoteNote: 'panel system, "all in" · per Timber Age',
    estimatedTotal: '$380K to $640K',
    estimatedTotalSortValue: 380,
    estimatedTotalSource: 'Timber Age website estimate',
    customization: TIMBER_AGE_CUSTOMIZATION,
    included: list('CLT panels w/ dense-pack cellulose', 'Garage', 'Sizable contingency'),
    notIncluded: list('Windows', 'Window installation', 'Foundation', 'Finishes + mechanicals'),
  },

  // ---------------- Collective Carpentry ----------------
  {
    company: 'Collective Carpentry',
    order: 3,
    location: 'British Columbia',
    website: 'https://collectivecarpentry.com',
    system: 'Perian',
    sqft: '1,087 sqft · one covered porch',
    bedBath: '2 bed / 2 bath',
    plansPublished: 'Yes · preview drawings + brochure',
    wallsR: 'R-25 to R-55',
    roofR: 'R-52 to R-60',
    quote: '$90K to $110K',
    quoteSortValue: 90,
    quoteNote: 'base package · USD',
    estimatedTotal: '~$195K',
    estimatedTotalSortValue: 195,
    estimatedTotalSource: "Collective's calculator default: panels, shipping, windows, both installs",
    customization: COLLECTIVE_CUSTOMIZATION,
    included: COLLECTIVE_INCLUDED,
    notIncluded: collectiveNotIncluded('$20K to $45K'),
    analysisHeadline: '$90K to $177K · base package',
    analysis: `Collective publishes nearly everything: price ranges for each model, inclusions, exclusions, wall systems and preview plans. Three systems are offered: Net Zero (R-25 wall, R-52 roof), High Performance (R-40 wall, R-52 roof) and Passive House (R-55 wall, R-60 roof). The site doesn't say which system the base price range assumes, and the calculator default uses the top of each range.\n\nThe estimated total is the site calculator's default for panels, about $2K of shipping from Invermere with customs, windows, panel install and window install. It still leaves out the foundation, roofing, siding, finishes and mechanicals. Collective sells direct to a GC or owner-builder, so expect a GC markup on top.\n\nFigures are from Collective's website as of October 14, 2026.`,
  },
  {
    company: 'Collective Carpentry',
    order: 4,
    location: 'British Columbia',
    website: 'https://collectivecarpentry.com',
    system: 'Calina',
    sqft: '1,508 sqft · two covered porches',
    bedBath: '3 bed / 2 bath',
    plansPublished: 'Yes · preview drawings + brochure',
    wallsR: 'R-25 to R-55',
    roofR: 'R-52 to R-60',
    quote: '$119K to $145K',
    quoteSortValue: 119,
    quoteNote: 'base package · USD',
    estimatedTotal: '~$249K',
    estimatedTotalSortValue: 249,
    estimatedTotalSource: "Collective's calculator default: panels, shipping, windows, both installs",
    customization: COLLECTIVE_CUSTOMIZATION,
    included: COLLECTIVE_INCLUDED,
    notIncluded: collectiveNotIncluded('$30K to $65K'),
  },
  {
    company: 'Collective Carpentry',
    order: 5,
    location: 'British Columbia',
    website: 'https://collectivecarpentry.com',
    system: 'Asta',
    sqft: '~1,890 sqft · two levels',
    bedBath: '3 bed / 2.5 bath · main-floor primary',
    plansPublished: 'Yes · preview drawings + brochure',
    wallsR: 'R-25 to R-55',
    roofR: 'R-52 to R-60',
    quote: '$146K to $177K',
    quoteSortValue: 146,
    quoteNote: 'base package · USD',
    estimatedTotal: '~$311K',
    estimatedTotalSortValue: 311,
    estimatedTotalSource: "Collective's calculator default: panels, shipping, windows, both installs",
    customization: COLLECTIVE_CUSTOMIZATION,
    included: COLLECTIVE_INCLUDED,
    notIncluded: collectiveNotIncluded('$35K to $80K'),
  },

  // ---------------- Hereabout x B.PUBLIC ----------------
  {
    company: 'Hereabout × B.PUBLIC',
    order: 6,
    location: 'Plans: Vermont/New York · Panels: New Mexico',
    website: 'https://hereabouthome.com',
    system: 'Nest',
    plansPublished: 'Yes · sold as plan sets',
    wallsR: 'R-35',
    roofR: 'R-59',
    quote: '$139.5K',
    quoteSortValue: 139.5,
    quoteNote: 'panels + $8K freight · B.PUBLIC estimate',
    estimatedTotal: 'Not published',
    estimatedTotalSource: 'design, engineering, panels + freight: ~$159K to $164K',
    customization:
      "Interior layout only, to hold the panel price (2 hours included). Windows, doors and structure stay fixed.\nBigger changes: Hereabout's semi-custom process, a fixed fee from $10K.",
    included: list('Wall + roof panels', 'Mid-floor platform', 'Freight'),
    notIncluded: list(
      'Design + engineering ($19.2K to $24.9K)',
      'Foundation',
      'GC, mechanical, finishes',
      'Permitting',
    ),
    analysisHeadline: '$139.5K · panels + freight',
    analysis: `Nest is Holly Mumford's Hereabout plan drawn for B.PUBLIC's panels from the first sketch. The panel number is B.PUBLIC's estimate for the R-35 wall and R-59 roof version: $65.6K walls, $49.9K roof, $16.1K mid-floor platform and $8K freight. Design and engineering run $19.2K standard or $24.9K customized, which puts the shell at roughly $159K to $164K before a GC touches it.\n\nThese were generic planning-set numbers from July 2026, not a quote for a specific site.`,
  },

  // ---------------- Croft ----------------
  {
    company: 'Croft',
    order: 7,
    location: 'Maine',
    website: 'https://www.croft.haus',
    system: 'Croft Kits S, M, L',
    sqft: '541 to ~1,750 sqft templates',
    bedBath: '1 bed to 2 bed / up to 2 bath',
    plansPublished: 'Yes · plans + elevations in kit packets',
    wallsR: 'Not published',
    roofR: 'Not published',
    quote: 'Not published',
    quoteNote: 'only the XS shell is priced: from $22.5K',
    estimatedTotal: '$375 to $450 / sqft',
    estimatedTotalSource: "Croft's budget-build guidance, all in; Croft's share up to about a third",
    customization:
      'Windows and interior walls move within each footprint. Kits can be stretched or combined.',
    included: list('Wall, roof + floor panels', 'Delivery + crane install to weather-tight shell'),
    notIncluded: list('Site work + foundation', 'Plumbing, electrical, mechanical', 'Roofing + siding', 'Interior finishes'),
    analysisHeadline: 'Not published · S, M and L kits',
    analysis: `Croft publishes plans for its S, M and L kits but not prices or R-values. I'm listing them anyway, because not publishing is part of the picture. The materials are named (straw, sheep's wool, Maine spruce and pine), but there are no numbers.\n\nThe budget guidance is Croft's own: about $375 to $450 a square foot all in for a budget build, with Croft's portion up to about a third, and $600 to $1,000+ a square foot for a high-end build.\n\nFigures are from Croft's website and kit packets as of October 14, 2026.`,
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
