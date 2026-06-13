/**
 * Seed the cost matrix from Issue 12 ("Apples and Oranges, Itemized").
 * Idempotent: clears the two cost-matrix collections, then re-inserts.
 *
 * `seedMatrix(payload)` is meant to be called with a live Payload instance.
 * The data already lives in the Neon database; to re-seed, expose this via a
 * temporary token-guarded route handler and call it (a plain `payload run`
 * script currently hits a tsx/Node loader bug on this setup).
 */
import type { Payload } from 'payload'

const list = (...items: string[]) => items.map((item) => ({ item }))

type EntrySeed = {
  company: string
  tier: 'tier1' | 'tier2'
  order: number
  location?: string
  system?: string
  wallsR?: string
  roofR?: string
  sqft?: string
  quote?: string
  quoteSortValue?: number
  quoteNote?: string
  included?: { item: string }[]
  notIncluded?: { item: string }[]
  analysisHeadline?: string
  analysis?: string
}

const entries: EntrySeed[] = [
  // ---------------- TIER 1 ----------------
  {
    company: 'Collective Carpentry',
    tier: 'tier1',
    order: 1,
    location: 'British Columbia',
    system: 'Cellulose-insulated all-timber panels',
    wallsR: 'R-41',
    roofR: 'R-61',
    quote: '$234K',
    quoteSortValue: 234,
    quoteNote: 'supply + install',
    included: list(
      'Structural connections',
      '5-person crew + crane',
      '7-day weathertight',
    ),
    notIncluded: list('Shipping', 'Windows', 'Doors', 'Roofing material', 'Siding'),
    analysisHeadline: '$234K · supply + install',
    analysis:
      'The most expensive option in Tier 1 by a real margin. They are also the most engineered, the most insulated, and the most explicitly turnkey-on-the-envelope. The 7-day install with their own crew and crane is not a marketing line — Andrea Michael at Love Schack confirmed it in Issue 03, on a project that hit weathertight in under a week.\n\nWhat I’m not paying for at $234K: the Net Zero Wall downgrade. 2x6 framing with 1.5-3" of continuous exterior insulation lands somewhere between R-25 and R-30. Cheaper. I’ve followed up to see what that does to the number.',
  },
  {
    company: 'Timber Age',
    tier: 'tier1',
    order: 2,
    location: 'Colorado',
    system: 'CLT panels w/ outboard cellulose',
    wallsR: 'R-30',
    roofR: 'R-40',
    quote: '$160K',
    quoteSortValue: 160,
    quoteNote: 'supply only · $28K roof alone',
    included: list('CLT interior finish', 'CNC wire chases', 'No drywall needed'),
    notIncluded: list('Install labor', 'Windows', 'Shipping', 'Ridge beam (working on it)'),
    analysisHeadline: '$160K · supply only · $28K roof alone',
    analysis:
      'The aesthetic case is real. Three inches of solid wood as the interior finish — no drywall, no paint — is something the other Tier 1 companies can’t offer at any price. The committing nature of the manufacturing lock is also real: electrical penetrations get CNC-routed into the CLT, and you have to know where every outlet goes before fabrication.\n\nThe pricing seed is the roof. $28K for roof panels alone — half what the other manufacturers charge — is the outlier that opened the hybrid approach I wrote about in Issue 06. Site-built walls plus a Timber Age roof is the only configuration in the entire spreadsheet that gets me under budget without sacrificing the vaulted ceiling.',
  },
  {
    company: 'Croft',
    tier: 'tier1',
    order: 3,
    location: 'Maine',
    system: 'Double-stud + high-density natural fiber',
    wallsR: 'R-58 / R-43',
    roofR: 'Per spec',
    quote: '$186K',
    quoteSortValue: 186,
    quoteNote: 'SD estimate 03/13/26 · shipping + install T&M',
    included: list(
      'Wall + roof panels',
      'Service cavity',
      'Air barrier',
      'WRB + rain screen',
      'Rough openings',
      'Uninsulated floor deck',
    ),
    notIncluded: list(
      'Windows + doors',
      'Interior walls',
      'Shipping (T&M)',
      'Install (T&M)',
      'Insulated floor deck',
    ),
    analysisHeadline: '$186K SD estimate · 03/13/26',
    analysis:
      'An update from my earlier coverage. When I wrote about Croft in Issues 02 and 04, I’d received only a verbal estimate of around $195K and was waiting on formal documentation. The formal quote arrived on March 13, dated and bound to a specific drawing set (YS_house_v2.1), and it changes my read on the company entirely.\n\nThe $186,100 SD estimate is for the panelization scope: exterior wall panels, exterior roof panels (excluding the screened porch), uninsulated interior floor decks, and rough openings for window and door install. Everything else gets categorized explicitly. It is the most rigorous scope document of any Tier 1 quote I’ve received.\n\nThe wall R-values land the highest in the matrix: R-58 at 16" thick or R-43 at 12" thick, double-stud frame with high-density natural fiber insulation. The roof panels are sized per the specified assembly — Croft doesn’t pin an R-value without seeing the final design, which is an honest posture I haven’t seen from another vendor.\n\nService rates are printed on the quote document itself: $150/hr for design and shop drawings, $85/hr for project management, $85/hr for site labor. Most manufacturers keep service rates inside conversations. Croft writes them down.',
  },
  {
    company: 'New Frameworks',
    tier: 'tier1',
    order: 4,
    location: 'Vermont',
    system: 'Straw-filled panels',
    wallsR: 'R-35',
    roofR: 'R-50',
    quote: '$170K',
    quoteSortValue: 170,
    quoteNote: 'incl. low shipping',
    included: list('Panel supply', 'Shipping', 'Interior plaster (option)'),
    notIncluded: list('Vapor barriers', 'Strapping', 'Install', 'Drywall-ready finish'),
    analysisHeadline: '$170K · cheapest, but with asterisks',
    analysis:
      'The cheapest of the Tier 1 quotes, but the asterisks are the story. The panels arrive without vapor barriers or strapping — the wall is shipped, but not in a state ready for siding or drywall. Their shipping number is shockingly low.\n\nThe Ace McArleton conversation in Issue 05 reframed what New Frameworks is actually selling: not the assembly I originally pictured, but a kit of parts that assumes I bring the site-finishing labor. Their philosophy is closer to "panels are one ingredient in a high-performance build," not "panels are the build." That’s a fair posture. It also means a true apples-to-apples with Collective requires me to add roughly $40-60K of site finishing back into the New Frameworks number.',
  },
  {
    company: 'B.PUBLIC Prefab',
    tier: 'tier1',
    order: 5,
    location: 'New Mexico',
    system: 'Cellulose-dense framed panels',
    wallsR: 'R-30',
    roofR: 'R-40',
    quote: '$159K — $200K',
    quoteSortValue: 159,
    quoteNote: '"pretty good wall" · R-35 = $185K · full = $200K',
    included: list('Full system', 'Shipping', 'Vapor management'),
    notIncluded: list('Site work', 'Labor', 'Finishes'),
    analysisHeadline: '$159K — $200K · tiered',
    analysis:
      'The most-tiered offering in the matrix. The "pretty good wall" R-30 option at $159K is the cheapest custom-design panel quote I’ve received that I’d actually trust. R-35 is $185K. The full passive-house-spec system is closer to $200K. Natasha Ribeiro has been the most generous with her time of any vendor — she gave me the R-30 option specifically because I told her I wasn’t chasing certification.\n\nThe "pretty good wall" framing — coined by the four Maine builders behind the book — has become unexpectedly useful vocabulary across my whole evaluation. R-30 isn’t a passive house number. It’s meaningfully better than code. The cost delta between R-30 and R-40 is real enough that it should be on every spreadsheet in this category, not just mine.',
  },
  {
    company: 'Stillwater Builders',
    tier: 'tier1',
    order: 6,
    location: 'Livingston, MT · site-built',
    system: 'Site-framed double-stud + hemp fiber',
    wallsR: 'R-44',
    roofR: 'R-70',
    quote: '$155K',
    quoteSortValue: 155,
    quoteNote: 'envelope only · full GC bid to drywall: $400K',
    included: list(
      'Wall + roof framing',
      'Insulation',
      'Air sealing',
      'Interior partitions',
      'Stairs',
      'No shipping',
      'No crane',
    ),
    notIncluded: list(
      'Windows',
      'Doors',
      'Roofing material',
      'Siding',
      'Mechanical',
      'Drywall + finishes',
    ),
    analysisHeadline: '$155K envelope · $400K through drywall',
    analysis:
      'The only bid in Tier 1 that isn’t panelized — and the only bid in the matrix where the value-engineering conversation is the conversation, not a footnote on the quote sheet.\n\nBen Shachner and his business partner Ted are local. Both have built with panels in the past. Their original envelope-only number was $155K for site-framed double-stud walls and roof, insulated with Hempitecture hemp fiber, with the air barrier built on site. R-44 walls. R-70 roof. The highest insulation values in the entire matrix. No cross-country shipping. No crane.\n\nIn May they sharpened the broader number: $400K to take the project from site prep through drywall. That number includes site work, foundation, roof, exterior trim and siding, plumbing and electrical rough-in, and drywall. It is the closest thing in the matrix to a true comparable-total-cost number, because it doesn’t leave the most-expensive parts of the build for me to figure out separately.\n\nIt also comes with a clear value-engineering case: pivot to a standard 2x6 build, swap Schuco for Andersen 100 windows, design out the wall jogs, and simplify the roof. Ben framed it as how to close the last $15K with more confidence — not how to get to $400K.',
  },

  // ---------------- TIER 2 ----------------
  {
    company: 'Backcountry Hut Co.',
    tier: 'tier2',
    order: 1,
    location: 'British Columbia',
    system: 'System 02 · Layout F or G',
    wallsR: 'R-24',
    sqft: '~870-1,000',
    quote: '$235K-$291K',
    quoteSortValue: 235,
    quoteNote: 'Layout G garage 3M: $235K · Layout F deck 3M: $291K · +1 module: ~$49K',
    included: list(
      'Loewen windows',
      'Velux skylights',
      'Standing seam roof',
      'DF T&G ceiling',
      'Staircase',
      'Cedar gables',
    ),
    notIncluded: list('Garage module (Layout G)', 'Interior walls', 'Utility chases', 'Foundation'),
    analysisHeadline: '$235K (Layout G) — $291K (Layout F)',
    analysis:
      'The surprise of the Tier 2 set, and now a moving target. I’d written them off as too expensive years ago. Going back to them after two recent calls with Pete and Robbie, the per-square-foot ratio of "what’s included" is favorable when you actually itemize. The kit comes with Loewen windows, Velux skylights, standing seam metal roofing, Douglas fir T&G ceiling on the first floor, the staircase, and Western Red Cedar gable interiors.\n\nThe R-24 walls look low compared to Collective Carpentry’s R-41, but the assembly philosophy is different: continuous insulation, minimal thermal bridging, structural elements visible as part of the design. "Passive adjacent," as Robbie called it. The 2021 all-in number from the San Juan Islands case study — $467K — is the only fully-documented all-in number any company in either tier has published. That transparency is itself a spec.\n\nPete and Robbie are actively working on Layout G, the garage configuration that’s been my open question since Issue 09. Preliminary pricing on the 3-module Layout G is approximately $235K — cheaper than Layout F at $291K. The catch is real: Layout G has never been built, and the pricing is preliminary.',
  },
  {
    company: 'DEN Outdoors',
    tier: 'tier2',
    order: 2,
    location: 'New York',
    system: 'Prefab kit (launched March 2025)',
    wallsR: 'Not published',
    sqft: '~800',
    quote: 'Varies',
    quoteSortValue: 0,
    quoteNote: 'opacity = the data point',
    included: list('Design package', '"Steel and closed-cell foam"'),
    notIncluded: list('R-value disclosure', 'Steel gauge', 'Thermal bridging discussion'),
    analysisHeadline: 'Varies · opacity is the data point',
    analysis:
      'The wall assembly description, in full, on DEN’s published materials: "steel and closed-cell foam." That is the entirety of their public technical disclosure. No R-value. No steel gauge. No discussion of thermal bridging. DEN’s primary product is plans (hundreds sold, by their own count), not kits. The prefab kit is the marketing story; the plans are the business.\n\nI’m including DEN specifically because it represents what most of the design press is covering in this category. Dwell features them. Dezeen features them. 200,000+ Instagram followers. The transparency floor is below everyone else in the comparison, and the buyer is implicitly not asking the questions other buyers ask. That’s a real customer. It’s just a different one than the Tier 1 companies are after.',
  },
  {
    company: 'Modern Alpine',
    tier: 'tier2',
    order: 3,
    location: 'Wyoming',
    system: '2025 Prefab — steel & foam',
    wallsR: 'Not published',
    sqft: '~1,200',
    quote: '$161K',
    quoteSortValue: 161,
    quoteNote: 'includes shipping & doors',
    included: list('Wall + roof panels', 'Windows', 'Doors', 'Shipping'),
    notIncluded: list('Site work', 'Install labor', 'Mechanical', 'Finishes'),
    analysisHeadline: '$161K · most-inclusive kit price',
    analysis:
      'The most-inclusive kit price in the matrix on paper. Steel and foam panels, windows, doors, and shipping all bundled in. The wall assembly is structurally similar to DEN’s; the R-value isn’t published. I haven’t talked to anyone who has actually built a Modern Alpine yet, so the kit-to-finished delta is unknown to me. If you’ve done it, please reply.',
  },
  {
    company: 'Zook Cabins',
    tier: 'tier2',
    order: 4,
    location: 'Pennsylvania, Amish-built',
    system: 'A-Frame Lodge, 2bd/2ba',
    wallsR: 'Not specified',
    sqft: '1,960',
    quote: '$649K',
    quoteSortValue: 649,
    quoteNote: 'delivered + installed',
    included: list('Near-finished structure', 'Delivery', 'Install'),
    notIncluded: list('Most finishes', 'Site prep', 'Foundation', 'Utility hookups'),
    analysisHeadline: '$649K · delivered + installed',
    analysis:
      'The most responsive company in the matrix. I emailed asking for a quote on the A-Frame Lodge — 1,960 sqft, 2bd/2ba. The quote arrived the next day. Most companies took weeks. Zook was also ranked #100 on the Financial Times’ fastest-growing companies list in 2024, which is consistent with the responsiveness.\n\nWhat Zook is selling isn’t really a kit; it’s a near-finished structure that arrives on a flatbed and gets set on your foundation. Walking through what’s included, it’s closer to a built home minus the site work than to a panelized envelope. The price reflects that. If your program matches one of their existing designs, the all-in math could actually be competitive with Tier 1 plus everything Tier 1 leaves out.',
  },
  {
    company: 'Avrame',
    tier: 'tier2',
    order: 5,
    location: 'Estonia',
    system: 'Trio 120 · A-frame kit',
    wallsR: 'DIY install',
    sqft: '1,400',
    quote: '$115K',
    quoteSortValue: 115,
    quoteNote: '3rd-party finished: $339-$596/sqft',
    included: list('A-frame structural kit'),
    notIncluded: list('Insulation (DIY)', 'Doors', 'Windows', 'Foundation', 'Mechanical'),
    analysisHeadline: '$115K kit · $475-$835K all-in (est.)',
    analysis:
      'The most kit-like of the kit options, in the original sense of the word. No insulation in any tier. No doors. No windows. No foundation. No mechanical. The Estonian company has the strongest A-frame community in the matrix, and the kit is genuinely transparent about what it is and isn’t.\n\nThe third-party-reviewed contractor-finished cost in the US — $339-$596 per square foot — tells you how much variability sits downstream of what looks like a $115K kit. That’s a $475K-$835K all-in range on the Trio 120. Compare that to a known-quantity custom panel build at $500K, and the "cheap kit" framing becomes much harder to defend.',
  },
]

const footnotes: { tier: 'tier1' | 'tier2'; number: number; label: string; body: string }[] = [
  {
    tier: 'tier1',
    number: 1,
    label: 'Timber Age CLT',
    body: '3" cross-laminated timber panels with modified Larsen truss outboard insulation. Interior surface is the CLT itself — no drywall, no paint.',
  },
  {
    tier: 'tier1',
    number: 2,
    label: 'Timber Age R-values',
    body: 'Reported R-30/R-40 reflects the wall and roof assemblies including the outboard cellulose. Roof panels alone, without ridge beam, $28K — the seed of the hybrid approach in Issue 06.',
  },
  {
    tier: 'tier1',
    number: 3,
    label: 'Croft assembly and R-values',
    body: 'Per the 03/13/26 formal SD estimate: double-stud structural wall panels with high-density natural fiber insulation. Two thickness options: R-58 at 16" thick or R-43 at 12" thick. The wall assembly includes a service cavity, variable-perm air barrier, diagonal sheathing, high-perm WRB, and a vented rain screen. New Frameworks publishes R-35 walls / R-50 roof for their standard straw-panel assembly — separately from Croft.',
  },
  {
    tier: 'tier1',
    number: 4,
    label: 'B.PUBLIC tiers',
    body: 'R-30 is the "pretty good wall" entry tier (2x8 framing). R-35 is the mid-tier. The full passive-house-spec system is closer to $200K.',
  },
  {
    tier: 'tier1',
    number: 5,
    label: 'Stillwater assembly',
    body: 'Double-stud wall with a 2x6 exterior structural wall, 3.5" gap, and 2x4 interior wall, insulated with Hempitecture FiberFill. Hempitecture’s hemp fiber is one of the few insulation products on the market with a published carbon-negative LCA.',
  },
  {
    tier: 'tier1',
    number: 6,
    label: 'Croft roof R-value',
    body: 'The formal SD estimate explicitly says "R-Value dependent on specified assembly." Croft doesn’t pin a roof number without seeing the final design. The roof panel scope includes ceiling strapping for electrical, variable-perm air barrier, WRB, vented channel, and sheathing with metal-roofing-approved underlayment.',
  },
  {
    tier: 'tier2',
    number: 1,
    label: 'BHC System 02',
    body: 'Designed by Michael Lecke, one of BHC’s owners and a custom-home architect. The structural elements are exposed on the interior — part of the design intent, not a cost-cutting move. R-24 walls / R-38 floor and ceiling. Two layouts in active conversation: Layout F (3-module + deck + 2/3 window wall, no garage, 999 sqft) and Layout G (3-module garage configuration, 871 sqft).',
  },
  {
    tier: 'tier2',
    number: 2,
    label: 'DEN and Modern Alpine',
    body: 'Wall assembly description, in full, on both companies’ published materials: "steel and closed-cell foam." Steel conducts heat ~300x faster than wood; the thermal-bridging story is not addressed publicly.',
  },
  {
    tier: 'tier2',
    number: 3,
    label: 'Avrame insulation',
    body: 'The kit is delivered with no insulation in any tier. Buyers source insulation locally. Per the most-cited third-party review, the US contractor-finished cost runs $339-$596/sqft — a $475K-$835K all-in range on the Trio 120.',
  },
  {
    tier: 'tier2',
    number: 4,
    label: 'BHC Layout G',
    body: 'Layout G is "still under development" and has never been built. Pricing is preliminary. Each additional module on the System 02 platform runs roughly $49K USD — so the 4-module Layout G extrapolation of $284K assumes that linear math holds. The historical reference: the 2021 San Juan Islands case study (Layout F variant) was $263K kit, $467K all-in.',
  },
]

export const seedMatrix = async (payload: Payload) => {
  // Clear existing
  const existingEntries = await payload.find({ collection: 'cost-matrix-entries', limit: 500 })
  for (const doc of existingEntries.docs) {
    await payload.delete({ collection: 'cost-matrix-entries', id: doc.id })
  }
  const existingFn = await payload.find({ collection: 'cost-matrix-footnotes', limit: 500 })
  for (const doc of existingFn.docs) {
    await payload.delete({ collection: 'cost-matrix-footnotes', id: doc.id })
  }

  for (const data of entries) {
    await payload.create({ collection: 'cost-matrix-entries', data })
  }
  for (const data of footnotes) {
    await payload.create({ collection: 'cost-matrix-footnotes', data })
  }

  return { entries: entries.length, footnotes: footnotes.length }
}
