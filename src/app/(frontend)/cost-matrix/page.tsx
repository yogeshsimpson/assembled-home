import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { CostMatrixTable, type MatrixRow, type Tier } from './CostMatrixTable'
import { TierControls } from './TierControls'

export const metadata = {
  title: 'The Cost Matrix',
  description:
    'Panel manufacturers and builders, each with its own definition of "what\'s included." Custom envelope quotes, stock kits and stock designs, itemized, with footnotes.',
}

export const dynamic = 'force-dynamic'

const NUMBER_WORDS = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen',
  'Nineteen', 'Twenty',
]
const numberWord = (n: number) => NUMBER_WORDS[n] ?? String(n)

type Footnote = { id: string | number; number: number; label: string; body: string }

function Analysis({ rows }: { rows: (MatrixRow & { analysisHeadline?: string | null; analysis?: string | null })[] }) {
  const withProse = rows.filter((r) => r.analysis)
  if (withProse.length === 0) return null
  return (
    <div className="cm-analysis">
      {withProse.map((r) => (
        <article key={r.id}>
          <h3>
            {r.company}
            {r.analysisHeadline ? <span className="tag">{r.analysisHeadline}</span> : null}
          </h3>
          <div className="body">
            {(r.analysis ?? '')
              .split(/\n\s*\n/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
        </article>
      ))}
    </div>
  )
}

function Footnotes({ items, tierLabel }: { items: Footnote[]; tierLabel: string }) {
  if (items.length === 0) return null
  const sorted = [...items].sort((a, b) => a.number - b.number)
  return (
    <div className="cm-footnotes">
      <h3>Footnotes · {tierLabel}</h3>
      <ol>
        {sorted.map((f) => (
          <li key={f.id}>
            <strong>{f.label}.</strong> {f.body}
          </li>
        ))}
      </ol>
    </div>
  )
}

function TierSection({
  id,
  number,
  title,
  summary,
  rows,
  priceLabel,
  children,
}: {
  id: string
  number: number
  title: string
  summary: string
  rows: MatrixRow[]
  priceLabel: string
  children: React.ReactNode
}) {
  const companies = new Set(rows.map((r) => r.company.trim().toLowerCase())).size
  const prices = rows
    .map((r) => r.quoteSortValue)
    .filter((v): v is number => typeof v === 'number' && Number.isFinite(v))
  const fmt = (v: number) => `$${Math.round(v)}K`
  const lo = prices.length ? Math.min(...prices) : null
  const hi = prices.length ? Math.max(...prices) : null
  const range = lo === null || hi === null ? null : lo === hi ? fmt(lo) : `${fmt(lo)} to ${fmt(hi)}`
  const counts =
    rows.length === companies
      ? `${rows.length} ${rows.length === 1 ? 'company' : 'companies'}`
      : `${rows.length} entries from ${companies} ${companies === 1 ? 'company' : 'companies'}`

  return (
    <details className="cm-tier" id={id}>
      <summary className="cm-tier__summary">
        <span className="cm-tier__num">Tier {number}</span>
        <span className="cm-tier__text">
          <h2>{title}</h2>
          <span className="cm-tier__blurb">{summary}</span>
          <span className="cm-tier__meta">
            {counts}
            {range ? ` · ${priceLabel} ${range}` : null}
          </span>
        </span>
        <span className="cm-tier__icon" aria-hidden="true" />
      </summary>
      <div className="cm-tier__body">{children}</div>
    </details>
  )
}

export default async function CostMatrixPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const entriesRes = await payload.find({
    collection: 'cost-matrix-entries',
    limit: 200,
    sort: 'order',
    depth: 0,
  })
  const footnotesRes = await payload.find({
    collection: 'cost-matrix-footnotes',
    limit: 200,
    sort: 'number',
    depth: 0,
  })

  const entries = entriesRes.docs as unknown as (MatrixRow & {
    tier: Tier
    analysisHeadline?: string | null
    analysis?: string | null
    footnote?: string | null
  })[]
  const footnotes = footnotesRes.docs as unknown as (Footnote & { tier: 'tier1' | 'tier2' })[]

  const tier1 = entries.filter((e) => e.tier === 'tier1')
  const tier2 = entries.filter((e) => e.tier === 'tier2')
  const tier3 = entries.filter((e) => e.tier === 'tier3')
  const companyCount = new Set(entries.map((e) => e.company.trim().toLowerCase())).size
  const tierCount = [tier1, tier2, tier3].filter((t) => t.length > 0).length
  // Tier 1 footnotes now live on each manufacturer entry (the `footnote` field).
  const fn1: Footnote[] = tier1
    .filter((e) => e.footnote)
    .map((e) => ({ id: e.id, number: e.order ?? 0, label: e.company, body: e.footnote as string }))
  const fn2 = footnotes.filter((f) => f.tier === 'tier2')

  const empty = entries.length === 0

  return (
    <>
      <SiteHeader />

      <section className="cm-hero">
        <div className="cm-hero__bg" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Reference · The Cost Matrix</span>
          <h1>
            Apples and
            <br />
            Oranges, Itemized.
          </h1>
          <p>
            {`${numberWord(companyCount)} manufacturers and builders, ${numberWord(companyCount).toLowerCase()} different definitions of “what’s included,” split into ${numberWord(tierCount).toLowerCase()} tiers.`}
          </p>
        </div>
      </section>

      <div className="container">
        {empty ? (
          <section className="cm-section">
            <div className="cm-empty">
              The matrix hasn&rsquo;t been populated yet. Add entries in the Payload admin under{' '}
              <strong>Cost Matrix</strong>.
            </div>
          </section>
        ) : (
          <section className="cm-section cm-tiers">
            <TierControls />

            <TierSection
              id="tier-1"
              number={1}
              title="Customized Panel Systems"
              summary="What would my own design cost as a panel system?"
              rows={tier1}
              priceLabel="quotes"
            >
              <p className="cm-section__sub">
                Tier 1 is based on my own design: an 1,850 sqft two-story Scandinavian modern shoe
                box with a 500 sqft garage. All quotes assume the owner/builder will handle the
                site prep and utility work on the front end, and do not include windows, doors,
                mechanical systems, interior or exterior finishes on the back end.
              </p>
              <p className="cm-hint">↕ Click any column header to sort.</p>
              <CostMatrixTable rows={tier1} tier="tier1" />
              <Footnotes items={fn1} tierLabel="Design & Engineering" />
              <Analysis rows={tier1} />
            </TierSection>

            <TierSection
              id="tier-2"
              number={2}
              title="Stock kits & packaged systems"
              summary="What do off-the-shelf kits actually include?"
              rows={tier2}
              priceLabel="kits"
            >
              <p className="cm-section__sub">
                Different square footages, different programs, different definitions of
                &ldquo;kit.&rdquo; All quotes assume the owner/builder will handle the site prep
                and utility work on the front end, while the amount of interior and exterior
                finishing varies widely.
              </p>
              <p className="cm-hint">↕ Click any column header to sort.</p>
              <CostMatrixTable rows={tier2} tier="tier2" />
              {/* Footnotes hidden for now; restore when ready */}
              {/* <Footnotes items={fn2} tierLabel="Tier 2" /> */}
              <Analysis rows={tier2} />
            </TierSection>

            {tier3.length > 0 ? (
              <TierSection
                id="tier-3"
                number={3}
                title="Stock designs from panel companies"
                summary="What do the panel companies’ own designs cost, and how far can you change them?"
                rows={tier3}
                priceLabel="panel systems"
              >
                <p className="cm-section__sub">
                  Pre-designed homes from the panel companies themselves, priced as a panel system
                  instead of against my design. They sit apart from Tier 2 because a panel shell
                  isn&rsquo;t a finished kit: foundation, mechanicals and finishes are outside the
                  panel price, and windows often are too. The estimated total is the
                  company&rsquo;s own all-in figure where one exists, so check the source under it.
                  The customization column is what it costs to change a stock plan, and where stock
                  turns into custom.
                </p>
                <p className="cm-hint">↕ Click any column header to sort.</p>
                <CostMatrixTable rows={tier3} tier="tier3" />
                <Analysis rows={tier3} />
              </TierSection>
            ) : null}
          </section>
        )}
      </div>

      <SiteFooter />
    </>
  )
}
