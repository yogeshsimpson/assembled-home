'use client'

import React, { useMemo, useState } from 'react'

export type MatrixRow = {
  id: string | number
  company: string
  location?: string | null
  system?: string | null
  wallsR?: string | null
  roofR?: string | null
  sqft?: string | null
  quote?: string | null
  quoteSortValue?: number | null
  quoteNote?: string | null
  included?: { item: string }[] | null
  notIncluded?: { item: string }[] | null
  order?: number | null
}

type SortKey = 'company' | 'system' | 'wallsR' | 'roofR' | 'quote' | null
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
  tier: 'tier1' | 'tier2'
}) {
  const [sortKey, setSortKey] = useState<SortKey>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const productLabel = tier === 'tier1' ? 'System' : 'Product'
  const quoteLabel = tier === 'tier1' ? 'Quote ($K)' : 'Kit Price ($K)'

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
            <th className="cm-col-list">Included</th>
            <th className="cm-col-list">Not Included</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id}>
              <td>
                <span className="cm-company">{r.company}</span>
                {r.location ? <span className="cm-loc">{r.location}</span> : null}
              </td>
              <td>
                {r.system}
                {tier === 'tier2' && r.sqft ? (
                  <span className="cm-sqft">{r.sqft} sqft</span>
                ) : null}
              </td>
              <td>
                <div className="cm-r-cell">
                  <div className="cm-r-pair">
                    <span className="cm-r-label">walls</span>
                    <span className="cm-num">{r.wallsR}</span>
                  </div>
                  {tier === 'tier1' && r.roofR ? (
                    <div className="cm-r-pair">
                      <span className="cm-r-label">roof</span>
                      <span className="cm-num">{r.roofR}</span>
                    </div>
                  ) : null}
                </div>
              </td>
              <td>
                <span className="cm-quote">{r.quote}</span>
                {r.quoteNote ? <span className="cm-quote-note">{r.quoteNote}</span> : null}
              </td>
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
