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
        { label: 'Tier 1 — Envelope quotes (against my design)', value: 'tier1' },
        { label: 'Tier 2 — Stock kits / packaged systems', value: 'tier2' },
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
      type: 'row',
      fields: [
        {
          name: 'wallsR',
          type: 'text',
          label: 'Walls R',
          admin: { width: '50%', description: 'e.g. "R-41" or "R-58 / R-43"' },
        },
        {
          name: 'roofR',
          type: 'text',
          label: 'Roof R',
          admin: {
            width: '50%',
            description: 'Tier 1 only. e.g. "R-61" or "Per spec"',
            condition: (data) => data?.tier === 'tier1',
          },
        },
        {
          name: 'sqft',
          type: 'text',
          label: 'Sqft',
          admin: {
            width: '50%',
            description: 'Tier 2 only. e.g. "~870-1,000" or "1,960"',
            condition: (data) => data?.tier === 'tier2',
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
          admin: { width: '50%', description: 'Display value, e.g. "$234K" or "$159K — $200K"' },
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
  ],
}
