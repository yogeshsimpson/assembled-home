import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { SiteHeader } from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'
import { CostMatrixTable, type MatrixRow } from './CostMatrixTable'

export const metadata = {
  title: 'The Cost Matrix',
  description:
    'Eleven manufacturers and builders, eleven different definitions of "what\'s included." Custom envelope quotes and stock kits, itemized — with footnotes.',
}

export const dynamic = 'force-dynamic'

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
      <h3>Footnotes — {tierLabel}</h3>
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
    tier: 'tier1' | 'tier2'
    analysisHeadline?: string | null
    analysis?: string | null
  })[]
  const footnotes = footnotesRes.docs as unknown as (Footnote & { tier: 'tier1' | 'tier2' })[]

  const tier1 = entries.filter((e) => e.tier === 'tier1')
  const tier2 = entries.filter((e) => e.tier === 'tier2')
  const fn1 = footnotes.filter((f) => f.tier === 'tier1')
  const fn2 = footnotes.filter((f) => f.tier === 'tier2')

  const empty = entries.length === 0

  return (
    <>
      <SiteHeader />

      <section className="cm-hero">
        <div className="container">
          <span className="eyebrow">Reference · The Cost Matrix</span>
          <h1>Apples and Oranges, Itemized.</h1>
          <p>
            Eleven manufacturers and builders, eleven different definitions of &ldquo;what&rsquo;s
            included,&rdquo; split into two tiers. More companies are in the queue, and the custom
            panel manufacturers have their own pre-designed units that warrant a tier of their own.
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
          <>
            <section className="cm-section">
              <div className="cm-section__head">
                <h2>Tier 1: Customized Panel Systems</h2>
              </div>
              <p className="cm-section__sub">
                Tier 1 is based on my own design: an 1,850 sqft two-story Scandinavian modern shoe
                box with a 500 sqft garage. All quotes assume the owner/builder will handle the
                site prep and utility work on the front end, and do not include windows, doors,
                mechanical systems, interior or exterior finishes on the back end.
              </p>
              <p className="cm-hint">↕ Click any column header to sort.</p>
              <CostMatrixTable rows={tier1} tier="tier1" />
              {/* Footnotes hidden for now — restore when ready */}
              {/* <Footnotes items={fn1} tierLabel="Tier 1" /> */}
              <Analysis rows={tier1} />
            </section>

            <section className="cm-section">
              <div className="cm-section__head">
                <h2>Tier 2: Stock kits &amp; packaged systems</h2>
              </div>
              <p className="cm-section__sub">
                Different square footages, different programs, different definitions of
                &ldquo;kit.&rdquo; All quotes assume the owner/builder will handle the site prep
                and utility work on the front end, while the amount of interior and exterior
                finishing varies widely.
              </p>
              <p className="cm-hint">↕ Click any column header to sort.</p>
              <CostMatrixTable rows={tier2} tier="tier2" />
              {/* Footnotes hidden for now — restore when ready */}
              {/* <Footnotes items={fn2} tierLabel="Tier 2" /> */}
              <Analysis rows={tier2} />
            </section>
          </>
        )}
      </div>

      <SiteFooter />
    </>
  )
}
