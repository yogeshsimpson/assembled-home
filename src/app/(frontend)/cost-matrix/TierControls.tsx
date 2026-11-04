'use client'

import { useEffect, useState } from 'react'

const tiers = () => Array.from(document.querySelectorAll<HTMLDetailsElement>('details.cm-tier'))

/**
 * "Expand all / Collapse all" for the tier accordions, plus deep links:
 * /cost-matrix#tier-3 (or a link to anything inside a tier) opens that tier and scrolls to it.
 */
export function TierControls() {
  const [allOpen, setAllOpen] = useState(false)

  useEffect(() => {
    const sync = () => setAllOpen(tiers().every((d) => d.open))

    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id) return
      const target = document.getElementById(id)
      const details = target?.closest<HTMLDetailsElement>('details.cm-tier')
      if (!target || !details) return
      details.open = true
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }))
    }

    const all = tiers()
    all.forEach((d) => d.addEventListener('toggle', sync))
    openFromHash()
    sync()
    window.addEventListener('hashchange', openFromHash)
    return () => {
      all.forEach((d) => d.removeEventListener('toggle', sync))
      window.removeEventListener('hashchange', openFromHash)
    }
  }, [])

  const toggleAll = () => {
    const next = !allOpen
    tiers().forEach((d) => {
      d.open = next
    })
    setAllOpen(next)
  }

  return (
    <div className="cm-controls">
      <button type="button" className="cm-toggle-all" onClick={toggleAll} aria-pressed={allOpen}>
        {allOpen ? 'Collapse all tiers' : 'Expand all tiers'}
      </button>
    </div>
  )
}
