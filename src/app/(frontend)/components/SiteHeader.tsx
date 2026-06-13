import Link from 'next/link'
import React from 'react'

const SUBSTACK_URL = 'https://yogeshsimpson.substack.com'

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="Assembled Home — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/AH-logo-horizontal.svg"
            alt="Assembled Home"
            style={{ height: 45, width: 'auto', display: 'block' }}
          />
        </Link>
        <nav className="nav">
          <Link href="/cost-matrix" className="nav__hide">
            Cost Matrix
          </Link>
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="nav__hide">
            Archive
          </a>
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="btn">
            Subscribe
          </a>
        </nav>
      </div>
    </header>
  )
}
