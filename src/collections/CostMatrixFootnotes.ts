import type { CollectionConfig } from 'payload'

export const CostMatrixFootnotes: CollectionConfig = {
  slug: 'cost-matrix-footnotes',
  labels: {
    singular: 'Cost Matrix Footnote',
    plural: 'Cost Matrix Footnotes',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'tier', 'number'],
    group: 'Cost Matrix',
  },
  defaultSort: 'number',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: { description: 'Short title, e.g. "Timber Age CLT".' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'tier',
          type: 'select',
          required: true,
          defaultValue: 'tier1',
          admin: { width: '50%' },
          options: [
            { label: 'Tier 1', value: 'tier1' },
            { label: 'Tier 2', value: 'tier2' },
          ],
        },
        {
          name: 'number',
          type: 'number',
          required: true,
          admin: { width: '50%', description: 'Footnote number within its tier.' },
        },
      ],
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
    },
  ],
}
