import { getPayload } from 'payload'

import config from '@/payload.config'

const NUMBER_WORDS = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen',
  'Nineteen', 'Twenty',
]
export const numberWord = (n: number) => NUMBER_WORDS[n] ?? String(n)

type CountableEntry = { company: string; tier: string }

/** Distinct companies and non-empty tiers, counted the same way everywhere on the site. */
export const countMatrix = (entries: CountableEntry[]) => ({
  companyCount: new Set(entries.map((e) => e.company.trim().toLowerCase())).size,
  tierCount: new Set(entries.map((e) => e.tier)).size,
})

export async function getMatrixCounts() {
  const payload = await getPayload({ config: await config })
  const res = await payload.find({
    collection: 'cost-matrix-entries',
    limit: 200,
    depth: 0,
    select: { company: true, tier: true },
  })
  return countMatrix(res.docs as unknown as CountableEntry[])
}
