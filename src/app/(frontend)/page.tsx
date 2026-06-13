import Link from 'next/link'
import React from 'react'

import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'

const SUBSTACK_URL = 'https://yogeshsimpson.substack.com'

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__inner">
          <span className="eyebrow">Prefab fluency for the panel-curious</span>
          <h1>
            Figuring out how to actually <em>build a house</em> — in public.
          </h1>
          <p className="hero__lede">
            Assembled Home documents a custom panelized home build in Livingston, Montana: the
            manufacturers, the real quotes, the wall assemblies, and the tradeoffs nobody puts in the
            brochure. No expertise claimed. Learning out loud, one issue at a time.
          </p>
          <div className="hero__cta">
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="btn">
              Subscribe on Substack
            </a>
            <Link href="/cost-matrix" className="btn btn--ghost">
              See the Cost Matrix →
            </Link>
          </div>
          <div className="hero__meta">
            <div>
              <span className="stat">11</span>
              <span className="label">Manufacturers compared</span>
            </div>
            <div>
              <span className="stat">2 tiers</span>
              <span className="label">Itemized, with footnotes</span>
            </div>
            <div>
              <span className="stat">Livingston, MT</span>
              <span className="label">One real build</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <div className="section__head">
            <span className="eyebrow">What this is</span>
            <h2>A neutral seat between the buyer and the brochure.</h2>
            <p>
              Every prefab and panel company defines &ldquo;what&rsquo;s included&rdquo; differently.
              Some quote shipping, some don&rsquo;t. Some send a crew, some assume you&rsquo;ll find
              one. Assembled Home sits in the buyer&rsquo;s chair and writes down what&rsquo;s
              actually being sold — so the next person doesn&rsquo;t have to spend six months
              learning it the hard way.
            </p>
          </div>

          <div className="feature">
            <div className="feature__body">
              <span className="eyebrow">Reference</span>
              <h3>The Cost Matrix</h3>
              <p>
                Eleven manufacturers and builders, eleven different definitions of
                &ldquo;what&rsquo;s included.&rdquo; Split into two tiers — custom envelope quotes
                against one real design, and stock kits — with sortable columns and footnotes that do
                the real work.
              </p>
              <p style={{ marginTop: 24 }}>
                <Link href="/cost-matrix" className="btn">
                  Open the matrix →
                </Link>
              </p>
            </div>
            <div className="feature__art" aria-hidden="true">
              <div className="glyph">
                COLLECTIVE CARPENTRY · $234K
                <br />
                TIMBER AGE · $160K
                <br />
                B.PUBLIC · $159K
                <br />
                STILLWATER · $155K
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="eyebrow">What you&rsquo;ll get</span>
            <h2>The parts of a build that don&rsquo;t fit in a render.</h2>
          </div>
          <div className="topics">
            <div className="topic-card">
              <h4>Manufacturer profiles</h4>
              <p>
                Real conversations with the people behind the panels — B.PUBLIC, Collective
                Carpentry, Timber Age, Backcountry Hut Co., and more.
              </p>
            </div>
            <div className="topic-card">
              <h4>Quotes, itemized</h4>
              <p>
                What each number actually covers — walls, roof, shipping, install, finishes — and
                what it quietly leaves for you.
              </p>
            </div>
            <div className="topic-card">
              <h4>Assemblies &amp; R-values</h4>
              <p>
                Double-stud, CLT, straw, steel-and-foam. Why R-value, thermal bridging, and air
                sealing matter more than square-foot price.
              </p>
            </div>
            <div className="topic-card">
              <h4>Financing reality</h4>
              <p>
                Construction loans, DTI ceilings, and the gap between what a project costs and what a
                bank will actually lend.
              </p>
            </div>
            <div className="topic-card">
              <h4>Build documentation</h4>
              <p>
                The decisions in real time — design changes, value engineering, and the honest
                admission when prefab doesn&rsquo;t pencil.
              </p>
            </div>
            <div className="topic-card">
              <h4>Design literacy</h4>
              <p>
                Learning to read the spec sheet, ask the right question, and tell a marketing line
                from a load-bearing fact.
              </p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="cta-band">
            <span className="eyebrow" style={{ color: 'var(--accent-soft)' }}>
              The newsletter
            </span>
            <h2>One build. Every number. No spin.</h2>
            <p>
              New issues land on Substack. If you&rsquo;re weighing prefab, panels, or just trying to
              build something good without getting fleeced — come along.
            </p>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="btn">
              Subscribe — it&rsquo;s free
            </a>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  )
}
