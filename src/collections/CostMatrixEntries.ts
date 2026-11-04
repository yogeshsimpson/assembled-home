import type { CollectionConfig } from 'payload'

export const CostMatrixEntries: CollectionConfig = {
  slug: 'cost-matrix-entries',
  labels: {
    singular: 'Cost Matrix Entry',
    plural: 'Cost Matrix Entries',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'tier', 'location', 'quote', 'order'],
    group: 'Cost Matrix',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      defaultValue: 'tier1',
      options: [
        { label: 'Tier 1: Envelope quotes (against my design)', value: 'tier1' },
        { label: 'Tier 2: Stock kits / packaged systems', value: 'tier2' },
        { label: 'Tier 3: Stock designs from panel companies', value: 'tier3' },
      ],
      admin: {
        description: 'Which table this row belongs to.',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Sort order within the tier (lowest first).',
        step: 1,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'location',
          type: 'text',
          admin: { width: '50%', description: 'e.g. "British Columbia" or "Livingston, MT · site-built"' },
        },
        {
          name: 'system',
          type: 'text',
          admin: { width: '50%', description: 'Assembly / system description.' },
        },
      ],
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        description: "Company website URL, e.g. https://example.com. Shown as a 'website' link under the location.",
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'wallsR',
          type: 'text',
          label: 'Walls R',
          admin: { width: '50%', description: 'e.g. "R-41" or "Not specified"' },
        },
        {
          name: 'roofR',
          type: 'text',
          label: 'Roof R',
          admin: { width: '50%', description: 'e.g. "R-61" or "Not specified"' },
        },
      ],
    },
    {
      name: 'sqft',
      type: 'text',
      label: 'Sqft',
      admin: {
        description: 'Tiers 2 and 3. e.g. "~870-1,000 sqft" or "1,960 sqft"',
        condition: (data) => data?.tier === 'tier2' || data?.tier === 'tier3',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'bedBath',
          type: 'text',
          label: 'Bed / bath',
          admin: {
            width: '50%',
            description: 'Tier 3 only. e.g. "2 bed / 2 bath"',
            condition: (data) => data?.tier === 'tier3',
          },
        },
        {
          name: 'plansPublished',
          type: 'text',
          label: 'Plans published?',
          admin: {
            width: '50%',
            description: 'Tier 3 only. e.g. "Yes · downloadable previews" or "No"',
            condition: (data) => data?.tier === 'tier3',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'quote',
          type: 'text',
          admin: {
        width: '50%',
        description: 'Display value, e.g. "$234K" or "$159K to $200K". For Tier 3, the panel system price.',
      },
        },
        {
          name: 'quoteSortValue',
          type: 'number',
          label: 'Quote (numeric, for sorting)',
          admin: {
            width: '50%',
            description: 'Numeric value in thousands used for column sorting, e.g. 234.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'estimatedTotal',
          type: 'text',
          label: 'Estimated total',
          admin: {
            width: '50%',
            description: 'Tier 3 only. Display value, e.g. "$297K to $440K"',
            condition: (data) => data?.tier === 'tier3',
          },
        },
        {
          name: 'estimatedTotalSortValue',
          type: 'number',
          label: 'Estimated total (numeric, for sorting)',
          admin: {
            width: '50%',
            description: 'Tier 3 only. Thousands, low end of the range, e.g. 297.',
            condition: (data) => data?.tier === 'tier3',
          },
        },
      ],
    },
    {
      name: 'estimatedTotalSource',
      type: 'text',
      label: 'Estimated total: source',
      admin: {
        description: 'Tier 3 only. Where the total comes from, e.g. "Timber Age website estimate"',
        condition: (data) => data?.tier === 'tier3',
      },
    },
    {
      name: 'customization',
      type: 'textarea',
      label: 'Customization path',
      admin: {
        description:
          'Tier 3 only. What changes cost and where stock becomes custom, e.g. "20 design hours included, then hourly."',
        rows: 3,
        condition: (data) => data?.tier === 'tier3',
      },
    },
    {
      name: 'quoteNote',
      type: 'text',
      label: 'Quote note',
      admin: { description: 'e.g. "supply + install" or "envelope only · full GC bid to drywall: $400K"' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'included',
          type: 'array',
          admin: { width: '50%' },
          labels: { singular: 'Included item', plural: 'Included items' },
          fields: [{ name: 'item', type: 'text', required: true }],
        },
        {
          name: 'notIncluded',
          type: 'array',
          admin: { width: '50%' },
          labels: { singular: 'Not-included item', plural: 'Not-included items' },
          fields: [{ name: 'item', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'analysisHeadline',
      type: 'text',
      admin: {
        description: 'Short pricing line shown under the company name in the analysis section, e.g. "$234K · supply + install".',
      },
    },
    {
      name: 'analysis',
      type: 'textarea',
      admin: {
        description: 'Company-by-company prose shown below the table. Separate paragraphs with a blank line.',
        rows: 8,
      },
    },
    {
      name: 'footnote',
      type: 'textarea',
      admin: {
        description:
          'Tier 1 only. A short design-and-engineering note shown in the "Footnotes · Design & Engineering" list under the Tier 1 table.',
        rows: 4,
        condition: (data) => data?.tier === 'tier1',
      },
    },
  ],
}
