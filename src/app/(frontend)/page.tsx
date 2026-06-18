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
          <div className="hero__head">
            <span className="eyebrow">Prefab fluency for the panel-curious</span>
            <h1>
              Can a regular person build a house that&rsquo;s efficient, affordable, and design-forward?
            </h1>
            <p className="hero__lede">
              Prefab kits and panelized construction promise to make that possible. I&rsquo;m testing
              that promise against my own build in Livingston, Montana. Real quotes, real numbers, and
              a deep dive into whether it actually delivers.
            </p>
            <div className="hero__cta">
              <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="btn">
                Subscribe on Substack
              </a>
              <Link href="/cost-matrix" className="btn btn--ghost">
                See the Cost Matrix →
              </Link>
            </div>
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
            <h2>Parsing the particulars</h2>
            <p>
              Building a home involves an enormous scope of work. Every prefab and panel company
              takes on a different portion of that scope, from big-ticket items like shipping and
              labor to details like vapor barriers and service cavities. Assembled Home maps what
              each one actually includes for the quoted price.
            </p>
          </div>

          <div className="feature">
            <div className="feature__body">
              <span className="eyebrow">Reference</span>
              <h3>The Cost Matrix</h3>
              <p>
                Eleven manufacturers and builders, eleven different definitions of
                &ldquo;what&rsquo;s included,&rdquo; split into two tiers. Tier 1 is based on my
                design: a 1,850 sqft two-story Scandinavian modern shoe box with a 500 sqft
                garage. Tier 2 is pre-designed stock kits of comparable size. It&rsquo;s a start.
                More companies are in the queue, and the custom panel manufacturers have their own
                pre-designed units that warrant a tier of their own.
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
                Real conversations with the people behind the panels: B.PUBLIC, Collective
                Carpentry, Timber Age, Backcountry Hut Co., and more. Past the sales call and into
                the actual process.
              </p>
            </div>
            <div className="topic-card">
              <h4>Quotes, itemized</h4>
              <p>
                What each number actually covers: walls, roof, shipping, install, finishes. And
                what&rsquo;s left for you. The devil is in the details.
              </p>
            </div>
            <div className="topic-card">
              <h4>Assemblies &amp; R-values</h4>
              <p>
                Panel companies love to show you their assemblies. Kit companies, not so much.
                Larsen trusses, CLT, straw, steel-and-foam: the choice affects your mechanical
                system, your energy costs, and your build for the next hundred years.
              </p>
            </div>
            <div className="topic-card">
              <h4>Financing reality</h4>
              <p>
                Construction loans, OTC loans, DSCR financing, DTI ceilings, and the gap between
                what a project costs and what a bank will actually lend.
              </p>
            </div>
            <div className="topic-card">
              <h4>Build documentation</h4>
              <p>
                Design isn&rsquo;t a straight line. It&rsquo;s a cycle: each price reveals a
                tradeoff, each tradeoff reveals a priority. Value engineering means figuring out
                which ones you can live with, and being honest when the answer changes.
              </p>
            </div>
            <div className="topic-card">
              <h4>Design literacy</h4>
              <p>
                Knowing what to ask is half the job. The other half is knowing when the answer is
                missing. R-values, thermal bridging, air sealing, vapor management: the basics that
                separate a marketing line from a wall that actually performs.
              </p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="cta-band">
            <span className="eyebrow" style={{ color: 'var(--accent-soft)' }}>
              The newsletter
            </span>
            <h2>The homework you didn&rsquo;t want to do.</h2>
            <p>
              New issues land on Substack. If you&rsquo;ve been eyeing the sexy kit renders or dream
              about seeing your own design come to life with super-efficient panels, get on board.
            </p>
            <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="btn">
              Subscribe for free
            </a>
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  )
}
