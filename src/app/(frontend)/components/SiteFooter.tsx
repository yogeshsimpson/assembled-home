import Link from 'next/link'
import React from 'react'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>© {new Date().getFullYear()} Assembled Home · Livingston, Montana</span>
        <span style={{ display: 'flex', gap: 20 }}>
          <Link href="/cost-matrix">Cost Matrix</Link>
          <a href="https://yogeshsimpson.substack.com" target="_blank" rel="noopener noreferrer">
            Substack
          </a>
        </span>
      </div>
    </footer>
  )
}
