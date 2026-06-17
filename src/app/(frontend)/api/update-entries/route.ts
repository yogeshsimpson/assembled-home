import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

const UPDATES: Record<number, Record<string, unknown>> = {
  // Collective Carpentry
  67: {
    system: 'Cellulose-insulated modified Larsen truss',
    wallsR: 'R-41',
    roofR: 'R-61',
    quote: '$234K',
    quoteSortValue: 234,
    quoteNote: '$138K without roof or install',
    included: [
      { item: 'Shipping' },
      { item: 'Install: 5-person crew + crane' },
      { item: 'Insulated wall + roof panels' },
      { item: 'Uninsulated interior wall + floor + overframe roof panels' },
      { item: 'Vapor barrier' },
    ],
    notIncluded: [],
  },
  // Timber Age
  68: {
    system: 'CLT panels w/ outboard Larsen truss',
    wallsR: 'R-30',
    roofR: 'R-40',
    quote: '$160K',
    quoteSortValue: 160,
    quoteNote: '$28K roof alone',
    included: [
      { item: 'Insulated wall + roof panels' },
      { item: 'Uninsulated floor panels' },
    ],
    notIncluded: [
      { item: 'Shipping' },
      { item: 'Install' },
    ],
  },
  // Croft
  69: {
    system: 'Double-stud + high-density straw fill',
    wallsR: 'R-43',
    roofR: 'Per spec',
    quote: '$186K',
    quoteSortValue: 186,
    quoteNote: '',
    included: [
      { item: 'Insulated wall + roof panels' },
      { item: 'Uninsulated floor deck' },
      { item: 'Service cavity' },
      { item: 'Air barrier' },
      { item: 'WRB + rain screen' },
    ],
    notIncluded: [
      { item: 'Interior walls' },
      { item: 'Shipping' },
      { item: 'Install' },
    ],
  },
  // B.PUBLIC Prefab
  71: {
    system: 'Cellulose-dense 2x8 framing',
    wallsR: 'R-30',
    roofR: 'R-53',
    quote: '$159K',
    quoteSortValue: 159,
    quoteNote: '',
    included: [
      { item: 'Insulated wall + roof panels' },
      { item: 'Uninsulated floor deck' },
      { item: 'Service cavity' },
      { item: 'Vapor barrier' },
      { item: 'WRB' },
    ],
    notIncluded: [
      { item: 'Shipping' },
      { item: 'Install' },
      { item: 'Rain screen' },
    ],
  },
  // Stillwater Builders
  72: {
    system: 'Site-framed double-stud + hemp fiber',
    wallsR: 'R-44',
    roofR: 'R-70',
    quote: '$155K',
    quoteSortValue: 155,
    quoteNote: '$400K for full GC scope to drywall:',
    included: [
      { item: 'Insulated wall + roof framing' },
      { item: 'Interior walls' },
      { item: 'Vapor barrier' },
      { item: 'WRB' },
      { item: 'Install' },
    ],
    notIncluded: [],
  },
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (token !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const results = []
  for (const [idStr, data] of Object.entries(UPDATES)) {
    const id = parseInt(idStr)
    await payload.update({ collection: 'cost-matrix-entries', id, data })
    results.push({ id, status: 'updated' })
  }

  return NextResponse.json({ updated: results.length, results })
}
