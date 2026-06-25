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
  website?: string
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
  footnote?: string
}

const entries: EntrySeed[] = [
  // ---------------- TIER 1 ----------------
  {
    company: 'Collective Carpentry',
    tier: 'tier1',
    order: 1,
    location: 'British Columbia',
    website: 'https://collectivecarpentry.com',
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
    footnote: `Design and engineering: 3D modeling, shop drawings, and architectural and structural design coordination are all bundled into the supply price. What's carved out and left to me is the fee for my own architect and structural engineer to review Collective's fabrication drawings, and no estimate is given for that review.`,
    analysis: `The most expensive option in Tier 1 but for good reason. They are also the most engineered, the most insulated, and the most explicitly turnkey-on-the-envelope. The 7-day install with their own crew and crane is not a marketing line. Andrea Michael at Love Schack confirmed it in Issue 03, on a project that hit weathertight in under a week. They generously provided four quotes in total to try and accommodate my budget, with the lowest price option of 134K, eliminating the roof system entirely and relying on local labor.`,
  },
  {
    company: 'Timber Age',
    tier: 'tier1',
    order: 2,
    location: 'Colorado',
    website: 'https://www.timberage.com',
    system: 'CLT panels w/ outboard cellulose',
    wallsR: 'R-30',
    roofR: 'R-40',
    quote: '$160K',
    quoteSortValue: 160,
    quoteNote: 'supply only · $28K roof alone',
    included: list('CLT interior finish', 'CNC wire chases', 'No drywall needed'),
    notIncluded: list('Install labor', 'Windows', 'Shipping', 'Ridge beam (working on it)'),
    analysisHeadline: '$160K · supply only · $28K roof alone',
    footnote: `Design and engineering: a single $1,600 line: 20 hours at $80/hr to generate machine files and manufacturing drawings. Plumbing, HVAC, and electrical design are each scoped at zero hours. There's no separate structural or architectural PE fee called out; it's absorbed into the 15% project-management/overhead/profit and 20% contingency already baked into the not-to-exceed total.`,
    analysis: `The aesthetic case is real. Three inches of solid wood as the interior finish, no drywall, no paint, is something the other Tier 1 companies can't offer at any price. The committing nature of the manufacturing lock is also real: electrical penetrations get CNC-routed into the CLT, and you have to know where every outlet goes before fabrication.\n\nThe pricing seed is the roof. $28K for roof panels alone, half what the other manufacturers charge, is the outlier that opened the hybrid approach I wrote about in Issue 06. Site-built walls plus a Timber Age roof is the only configuration in the entire spreadsheet that gets me under budget without sacrificing the vaulted ceiling.`,
  },
  {
    company: 'Croft',
    tier: 'tier1',
    order: 3,
    location: 'Maine',
    website: 'https://www.croft.haus',
    system: 'Double-stud + high-density natural fiber',
    wallsR: 'R-58 / R-43',
    roofR: 'Per spec',
    quote: '$172K',
    quoteSortValue: 172,
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
    analysisHeadline: '$172K SD estimate · 03/13/26',
    footnote: `Design and engineering: design and shop drawings are billed time-and-materials at $150/hr, with project management at $85/hr. No hours are estimated and no design total is scoped. It's the most open-ended design arrangement in Tier 1.`,
    analysis: `An update from my earlier coverage. When I wrote about Croft in Issues 02 and 04, I'd received only a verbal estimate of around $195K and was waiting on formal documentation. The formal quote arrived on March 13, dated and bound to a specific drawing set (YS_house_v2.1), and it changes my read on the company entirely.\n\nThe $186,100 SD estimate is for the panelization scope: exterior wall panels, exterior roof panels (excluding the screened porch), uninsulated interior floor decks, and rough openings for window and door install. Everything else gets categorized explicitly. It is the most rigorous scope document of any Tier 1 quote I've received.\n\nThe wall R-values land the highest in the matrix: R-58 at 16" thick or R-43 at 12" thick, double-stud frame with high-density natural fiber insulation. The roof panels are sized per the specified assembly, and Croft doesn't pin an R-value without seeing the final design, which is an honest posture I haven't seen from another vendor.\n\nService rates are printed on the quote document itself: $150/hr for design and shop drawings, $85/hr for project management, $85/hr for site labor. Most manufacturers keep service rates inside conversations. Croft writes them down.`,
  },
  {
    company: 'New Frameworks',
    tier: 'tier1',
    order: 4,
    location: 'Vermont',
    website: 'https://www.newframeworks.com',
    system: 'Straw-filled panels',
    wallsR: 'R-35',
    roofR: 'R-50',
    quote: '$170K',
    quoteSortValue: 170,
    quoteNote: 'panel supply · shipping low but separate',
    included: list('Panel supply', 'Interior plaster (option)'),
    notIncluded: list('Shipping (low)', 'Vapor barriers', 'Strapping', 'Install', 'Drywall-ready finish'),
    analysisHeadline: '$170K · cheapest, but with asterisks',
    footnote: `Design and engineering: the most transparent of the group. $2,000 to $5,000 of structural engineering and 10 hours of design review are included. Beyond that the rates are published: $125/hr lead design, $85/hr associate, $225/hr senior structural engineer, $150/hr staff structural engineer. So the cost is at least something I can model.`,
    analysis: `The cheapest of the Tier 1 quotes, but the asterisks are the story. The panels arrive without vapor barriers or strapping. The wall is shipped, but not in a state ready for siding or drywall. Their shipping number is shockingly low.\n\nThe Ace McArleton conversation in Issue 05 reframed what New Frameworks is actually selling: not the assembly I originally pictured, but a kit of parts that assumes I bring the site-finishing labor. Their philosophy is closer to "panels are one ingredient in a high-performance build," not "panels are the build." That's a fair posture. It also means a true apples-to-apples with Collective requires me to add roughly $40-60K of site finishing back into the New Frameworks number.`,
  },
  {
    company: 'B.PUBLIC Prefab',
    tier: 'tier1',
    order: 5,
    location: 'New Mexico',
    website: 'https://www.bpublicprefab.com',
    system: 'Cellulose-dense framed panels',
    wallsR: 'R-30',
    roofR: 'R-40',
    quote: '$159K to $200K',
    quoteSortValue: 159,
    quoteNote: '"pretty good wall" · R-35 = $185K · full = $200K',
    included: list('Full system', 'Vapor management'),
    notIncluded: list('Shipping', 'Site work', 'Labor', 'Finishes'),
    analysisHeadline: '$159K to $200K · tiered',
    footnote: `Design and engineering: sold as an "Assembly Set": a $2,000 upfront deposit, then hourly with no estimate of hours and no cap. Completely open-ended.`,
    analysis: `The most-tiered offering in the matrix. The "pretty good wall" R-30 option at $159K is the cheapest custom-design panel quote I've received that I'd actually trust. R-35 is $185K. The full passive-house-spec system is closer to $200K. Natasha Ribeiro has been the most generous with her time of any vendor, and she gave me the R-30 option specifically because I told her I wasn't chasing certification.\n\nThe "pretty good wall" framing, coined by the four Maine builders behind the book, has become unexpectedly useful vocabulary across my whole evaluation. R-30 isn't a passive house number. It's meaningfully better than code. The cost delta between R-30 and R-40 is real enough that it should be on every spreadsheet in this category, not just mine.`,
  },
  {
    company: 'Stillwater Builders',
    tier: 'tier1',
    order: 6,
    location: 'Livingston, MT · site-built',
    website: 'https://www.stillwaterbuildersllc.com',
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
    footnote: `Design and engineering: the only site-built bid in Tier 1, so there's no panel-design or shop-drawing fee to quote. The architectural and structural engineering sit with my own design team rather than with the builder.`,
    analysis: `The only bid in Tier 1 that isn't panelized, and the only bid in the matrix where the value-engineering conversation is the conversation, not a footnote on the quote sheet.\n\nBen Shachner and his business partner Ted are local. Both have built with panels in the past. Their original envelope-only number was $155K for site-framed double-stud walls and roof, insulated with Hempitecture hemp fiber, with the air barrier built on site. R-44 walls. R-70 roof. The highest insulation values in the entire matrix. No cross-country shipping. No crane.\n\nIn May they sharpened the broader number: $400K to take the project from site prep through drywall. That number includes site work, foundation, roof, exterior trim and siding, plumbing and electrical rough-in, and drywall. It is the closest thing in the matrix to a true comparable-total-cost number, because it doesn't leave the most-expensive parts of the build for me to figure out separately.\n\nIt also comes with a clear value-engineering case: pivot to a standard 2x6 build, swap Schuco for Andersen 100 windows, design out the wall jogs, and simplify the roof. Ben framed it as how to close the last $15K with more confidence, not how to get to $400K.`,
  },

  // ---------------- TIER 2 ----------------
  {
    company: 'Backcountry Hut Co.',
    tier: 'tier2',
    order: 1,
    location: 'British Columbia',
    website: 'https://www.thebackcountryhutcompany.com',
    system: 'System 02 · Layout F or G',
    wallsR: 'R-24',
    sqft: '~870-1,150',
    quote: '~$280K',
    quoteSortValue: 280,
    quoteNote: '4-Module G Custom (garage): ~$280K · 3M Layout G: $235K · 3M Layout F + deck: $291K',
    included: list(
      'Garage module (Layout G)',
      'Loewen windows',
      'Velux skylights',
      'Standing seam roof',
      'DF T&G ceiling',
      'Staircase',
      'Cedar gables',
    ),
    notIncluded: list('Interior walls', 'Utility chases', 'Interior finishes'),
    analysisHeadline: '$235K (Layout G) to $291K (Layout F)',
    analysis: `The surprise of the Tier 2 set, and now a moving target. I'd written them off as too expensive years ago. Going back to them after two recent calls with Pete and Robbie, the per-square-foot ratio of "what's included" is favorable when you actually itemize. The kit comes with Loewen windows, Velux skylights, standing seam metal roofing, Douglas fir T&G ceiling on the first floor, the staircase, and Western Red Cedar gable interiors.\n\nThe R-24 walls look low compared to Collective Carpentry's R-41, but the assembly philosophy is different: continuous insulation, minimal thermal bridging, structural elements visible as part of the design. "Passive adjacent," as Robbie called it.\n\nPete and Robbie are actively working on Layout G, the garage configuration that's been my open question since Issue 09. Preliminary pricing on the 4-module Layout G is approximately $280K, and would represent their first design that incorporates a slab on grade, so the engineering is a work in progress.`,
  },
  {
    company: 'DEN Outdoors',
    tier: 'tier2',
    order: 2,
    location: 'New York · model: Modern Alpine 2025',
    website: 'https://denoutdoors.com',
    system: 'Steel-framed shell + closed-cell foam',
    wallsR: 'R-58 claimed',
    sqft: 'Not specified',
    quote: '$160,964',
    quoteSortValue: 161,
    quoteNote: 'Modern Alpine 2025 panel kit · shell-only',
    included: list('Wall + roof panels', 'Windows', 'Doors', 'Shipping', 'Design package'),
    notIncluded: list('Steel gauge', 'Thermal bridging data', 'Interior finishes', 'Mechanical'),
    analysisHeadline: '$160,964 · Modern Alpine 2025 kit',
    analysis: `When I wrote about DEN in Issue 09, the public wall description was, in full, "steel and closed-cell foam." No R-value, no steel gauge, no thermal-bridging discussion. That's changed: DEN now claims R-58 for the whole system.\n\nHere's why I'd still want to see the assembly before I print that number as fact. Steel conducts heat roughly 300 times faster than wood. A steel-framed wall can hit a high nominal R-value in the cavity and still lose much of it to thermal bridging through the studs, unless there's continuous exterior insulation doing the heavy lifting. An R-58 whole-system claim is only meaningful if it's a whole-system number, and DEN doesn't publish the assembly detail that would let anyone check. R-58 is now their claim, and I'm glad they're putting a number out. I just can't verify it yet.`,
  },
  {
    company: 'Good Way Homes',
    tier: 'tier2',
    order: 3,
    location: 'Canada · Carriage House Model C',
    website: 'https://goodwayhomes.com',
    system: 'Volumetric modular · net-zero ready',
    wallsR: 'Passive house walls',
    sqft: '659 liv / 912 ftpt',
    quote: '$350K',
    quoteSortValue: 350,
    quoteNote: '1BR carriage house · likely CAD (approx. $255K USD)',
    included: list(
      'Complete finished home',
      'Standard finishes',
      'High-perf windows/doors',
      'Passive house walls',
      'Delivery (200km) + crane',
    ),
    notIncluded: list('Premium finishes', 'Sitework + foundation'),
    analysisHeadline: '$350K listed · 1BR · net-zero ready',
    analysis: `The only company in the matrix selling a genuinely finished home through volumetric modular construction. Initially, I was looking at their Model 202, which is closest to my current design, but that is listed on their website at $750k CAD. I have since switched it to the Carriage House Model C. It's a one-bedroom, 1.5-bath with 659 SF of livable area on a 912 SF footprint. It's definitely as small as I would want to go, but if I were also building a detached garage with a rental unit above, the price could be right to achieve that. Net Zero Ready, passive house wall assemblies, high-performance windows and doors, standard finishes included. Listed at $350k, which is roughly $255k USD. Shipping is the big X factor here. They list a 200 km allowance as included. Located just outside of Revelstoke, BC, I'd be looking at about 6x that distance.`,
  },
  {
    company: 'Zook Cabins',
    tier: 'tier2',
    order: 4,
    location: 'Pennsylvania, Amish-built',
    website: 'https://www.zookcabins.com',
    system: 'A-Frame Lodge, 2bd/2ba',
    wallsR: 'Not specified',
    sqft: '1,960',
    quote: '$649K',
    quoteSortValue: 649,
    quoteNote: 'delivered + installed',
    included: list('Near-finished structure', 'Delivery', 'Install', 'Most finishes'),
    notIncluded: list('Utility hookups'),
    analysisHeadline: '$649K · delivered + installed',
    analysis: `What Zook is selling isn't really a kit; it's a near-finished structure that arrives on a flatbed and gets set on your foundation. Walking through what's included, it's closer to a built home minus the site work than to a panelized envelope. The price reflects that. If your program matches one of their existing designs, the all-in math could actually be competitive with Tier 1 plus everything Tier 1 leaves out.`,
  },
  {
    company: 'Avrame',
    tier: 'tier2',
    order: 5,
    location: 'Estonia',
    website: 'https://avrame.com',
    system: 'Trio 120 · A-frame kit',
    wallsR: 'DIY install',
    sqft: '1,400',
    quote: '$115K',
    quoteSortValue: 115,
    quoteNote: '3rd-party finished: $339-$596/sqft',
    included: list('A-frame structural kit'),
    notIncluded: list('Insulation (DIY)', 'Doors', 'Windows', 'Mechanical'),
    analysisHeadline: '$115K kit · $475-$835K all-in (est.)',
    analysis: `The most kit-like of the kit options, in the original sense of the word. No insulation in any tier. No doors. No windows. No foundation. No mechanical. The Estonian company has the strongest A-frame community in the matrix, and the kit is genuinely transparent about what it is and isn't.\n\nThe third-party-reviewed contractor-finished cost in the US, $339-$596 per square foot, tells you how much variability sits downstream of what looks like a $115K kit. That's a $475K-$835K all-in range on the Trio 120. Compare that to a known-quantity custom panel build at $500K, and the "cheap kit" framing becomes much harder to defend.`,
  },
]

// Tier 1 design-and-engineering notes now live on each entry's `footnote` field
// (rendered as "Footnotes · Design & Engineering"). Only Tier 2 footnotes remain here.
const footnotes: { tier: 'tier1' | 'tier2'; number: number; label: string; body: string }[] = [
  {
    tier: 'tier2',
    number: 1,
    label: 'BHC System 02',
    body: `Designed by Michael Lecke, one of BHC's owners and a custom-home architect. The structural elements are exposed on the interior, part of the design intent, not a cost-cutting move. R-24 walls / R-38 floor and ceiling. Two layouts in active conversation: Layout F (3-module + deck + 2/3 window wall, no garage, 999 sqft) and Layout G (3-module garage configuration, 871 sqft). See footnote 2.`,
  },
  {
    tier: 'tier2',
    number: 2,
    label: 'BHC Layout G',
    body: `The configuration I've now worked out with BHC is the System 02 | 4-Module | Layout G Custom (the garage configuration), landing around $280K. That's close to the earlier $284K extrapolation (each additional module on the System 02 platform runs roughly $49K), which suggests the per-module math holds. Layout G is still effectively under development (it has never been built), so the ~$280K is a worked-out estimate, not a delivered-and-proven number. Historical reference: the 2021 San Juan Islands case study (Layout F variant) was $263K kit, $467K all-in; today's $291K is the updated 2026 kit price for that same 3-module Layout F product.`,
  },
  {
    tier: 'tier2',
    number: 3,
    label: 'DEN Outdoors & the Modern Alpine model',
    body: `"Modern Alpine 2025" is a model from DEN Outdoors, not a separate company. The $160,964 figure is DEN's Modern Alpine panel kit (shell-only, includes windows, doors, and shipping). DEN now claims R-58 for the whole system. That's a striking number for a steel-framed, closed-cell-foam shell: steel conducts heat ~300x faster than wood, so an R-58 whole-assembly claim hinges entirely on continuous insulation and how thermal bridging is handled, neither of which DEN details publicly (no steel gauge, no assembly section). Treat R-58 as a manufacturer claim, not a verified assembly value.`,
  },
  {
    tier: 'tier2',
    number: 4,
    label: 'Good Way Homes · Carriage House Model C',
    body: `A one-bedroom, 1.5-bath carriage house: 659 SF livable, 912 SF footprint, 128 SF deck, 14' x 45'. Listed at $350,000. Net Zero Ready, with passive house wall assemblies, high-performance windows and doors, quality membranes and tapes, and R-values built to each climate zone (Good Way doesn't publish a single headline R-number; it's spec'd per zone). Standard finishes included; premium finishes extra. Sitework (services, excavation, foundation) is excluded; a 200 km delivery allowance and a 50' crane-drop radius are included. Currency caveat: Good Way is Canadian and the listing shows no currency symbol beyond "$", almost certainly CAD, which at ~0.73 is approximately $255K USD, or roughly $280/sqft USD on the footprint. Confirm currency before relying on the number.`,
  },
  {
    tier: 'tier2',
    number: 5,
    label: 'Avrame insulation',
    body: 'The kit is delivered with no insulation in any tier. Buyers source insulation locally. Per the most-cited third-party review, the US contractor-finished cost runs $339-$596/sqft, a $475K-$835K all-in range on the Trio 120.',
  },
]

export const seedMatrix = async (payload: Payload) => {
  // Safety check: refuse to run if data already exists.
  // Use the Payload admin to edit live content. This function is for first-time setup only.
  const existingEntries = await payload.find({ collection: 'cost-matrix-entries', limit: 1 })
  if (existingEntries.totalDocs > 0) {
    throw new Error(
      'seedMatrix: data already exists. Refusing to wipe live content. Edit via the Payload admin instead.',
    )
  }

  for (const data of entries) {
    await payload.create({ collection: 'cost-matrix-entries', data })
  }
  for (const data of footnotes) {
    await payload.create({ collection: 'cost-matrix-footnotes', data })
  }

  return { entries: entries.length, footnotes: footnotes.length }
}
