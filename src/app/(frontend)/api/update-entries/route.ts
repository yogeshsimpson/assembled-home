import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (token !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // New Frameworks — ID 70
  await payload.update({
    collection: 'cost-matrix-entries',
    id: 70,
    data: {
      system: 'Double-stud + high-density straw fill',
      wallsR: 'R-35',
      roofR: 'R-50',
      quote: '$170K',
      quoteSortValue: 170,
      quoteNote: '',
      included: [
        { item: 'Insulated wall + roof panels' },
        { item: 'Shipping ($12.5K allowance, actual cost TBD)' },
      ],
      notIncluded: [
        { item: 'Install' },
        { item: 'Vapor barriers ($2.8K add-on)' },
        { item: 'WRB + rain screen' },
      ],
    },
  })

  return NextResponse.json({ updated: 'New Frameworks (70)' })
}
