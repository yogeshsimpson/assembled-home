'use client'

import React, { useMemo, useState } from 'react'

export type MatrixRow = {
  id: string | number
  company: string
  location?: string | null
  website?: string | null
  system?: string | null
  wallsR?: string | null
  roofR?: string | null
  sqft?: string | null
  bedBath?: string | null
  plansPublished?: string | null
  quote?: string | null
  quoteSortValue?: number | null
  quoteNote?: string | null
  estimatedTotal?: string | null
  estimatedTotalSortValue?: number | null
  estimatedTotalSource?: string | null
  customization?: string | null
  included?: { item: string }[] | null
  notIncluded?: { item: string }[] | null
  order?: number | null
}

export type Tier = 'tier1' | 'tier2' | 'tier3'

type SortKey = 'company' | 'system' | 'wallsR' | 'roofR' | 'quote' | 'estimatedTotal' | null
type SortDir = 'asc' | 'desc'

const parseR = (v?: string | null): number => {
  if (!v) return Number.NEGATIVE_INFINITY
  const m = v.match(/-?\d+(\.\d+)?/)
  return m ? parseFloat(m[0]) : Number.NEGATIVE_INFINITY
}

export function CostMatrixTable({
  rows,
  tier,
}: {
  rows: MatrixRow[]
  tier: Tier
}) {
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const isStock = tier === 'tier3'
  const productLabel = tier === 'tier1' ? 'System' : tier === 'tier2' ? 'Product' : 'Design'
  const quoteLabel =
    tier === 'tier1' ? 'Quote ($K)' : tier === 'tier2' ? 'Kit Price ($K)' : 'Panel System ($K)'

  const sorted = useMemo(() => {
    if (!sortKey) return rows
    const dir = sortDir === 'asc' ? 1 : -1
    return [...rows].sort((a, b) => {
      let av: number | string
      let bv: number | string
      switch (sortKey) {
        case 'quote':
          av = a.quoteSortValue ?? Number.NEGATIVE_INFINITY
          bv = b.quoteSortValue ?? Number.NEGATIVE_INFINITY
          break
        case 'estimatedTotal':
          av = a.estimatedTotalSortValue ?? Number.NEGATIVE_INFINITY
          bv = b.estimatedTotalSortValue ?? Number.NEGATIVE_INFINITY
          break
        case 'wallsR':
          av = parseR(a.wallsR)
          bv = parseR(b.wallsR)
          break
        case 'roofR':
          av = parseR(a.roofR)
          bv = parseR(b.roofR)
          break
        default:
          av = (a[sortKey] ?? '').toString().toLowerCase()
          bv = (b[sortKey] ?? '').toString().toLowerCase()
      }
      if (av < bv) return -1 * dir
      if (av > bv) return 1 * dir
      return 0
    })
  }, [rows, sortKey, sortDir])

  const onSort = (key: Exclude<SortKey, null>) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const ariaSort = (key: Exclude<SortKey, null>): 'ascending' | 'descending' | 'none' =>
    sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'

  const arrow = (key: Exclude<SortKey, null>) =>
    sortKey === key ? (sortDir === 'asc' ? '▲' : '▼') : '↕'

  const Th = ({ k, children }: { k: Exclude<SortKey, null>; children: React.ReactNode }) => (
    <th
      className="sortable"
      aria-sort={ariaSort(k)}
      onClick={() => onSort(k)}
      role="columnheader"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSort(k)
        }
      }}
    >
      {children}
      <span className="arrow">{arrow(k)}</span>
    </th>
  )

  return (
    <div className="cm-table-wrap">
      <table className={`cm-table cm-table--${tier}`}>
        <thead>
          <tr>
            <Th k="company">Company</Th>
            <Th k="system">{productLabel}</Th>
            <th>R-Value</th>
            <Th k="quote">{quoteLabel}</Th>
            {isStock ? <Th k="estimatedTotal">Est. Total ($K)</Th> : null}
            {isStock ? <th className="cm-col-custom">Customization</th> : null}
            <th className="cm-col-list">Included</th>
            <th className="cm-col-list">Not Included</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id}>
              <td>
                <span className="cm-company">{r.company}</span>
                {r.website ? (
                  <a
                    className="cm-website"
                    href={r.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit the ${r.company} website`}
                    title={`Visit the ${r.company} website`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ) : null}
                {r.location ? <span className="cm-loc">{r.location}</span> : null}
              </td>
              <td>
                {r.system}
                {tier !== 'tier1' && r.sqft ? (
                  <span className="cm-sqft">{r.sqft}</span>
                ) : null}
                {isStock && r.bedBath ? <span className="cm-sqft">{r.bedBath}</span> : null}
                {isStock && r.plansPublished ? (
                  <span className="cm-plans">Plans published: {r.plansPublished}</span>
                ) : null}
              </td>
              <td>
                <div className="cm-r-cell">
                  <div className="cm-r-pair">
                    <span className="cm-num">{r.wallsR}</span>
                    <span className="cm-r-label">walls</span>
                  </div>
                  {r.roofR ? (
                    <div className="cm-r-pair">
                      <span className="cm-num">{r.roofR}</span>
                      <span className="cm-r-label">roof</span>
                    </div>
                  ) : null}
                </div>
              </td>
              <td>
                <span className="cm-quote">{r.quote}</span>
                {r.quoteNote ? <span className="cm-quote-note">{r.quoteNote}</span> : null}
              </td>
              {isStock ? (
                <td>
                  <span className="cm-quote cm-quote--total">{r.estimatedTotal}</span>
                  {r.estimatedTotalSource ? (
                    <span className="cm-quote-note">{r.estimatedTotalSource}</span>
                  ) : null}
                </td>
              ) : null}
              {isStock ? <td className="cm-col-custom cm-custom">{r.customization}</td> : null}
              <td className="cm-col-list">
                <ul className="cm-list">
                  {(r.included ?? []).map((i, idx) => (
                    <li key={idx}>{i.item}</li>
                  ))}
                </ul>
              </td>
              <td className="cm-col-list">
                <ul className="cm-list cm-list--no">
                  {(r.notIncluded ?? []).map((i, idx) => (
                    <li key={idx}>{i.item}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
