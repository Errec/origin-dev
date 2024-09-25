import {defineField, defineType} from 'sanity'

export const benefitsSection = defineType({
  name: 'benefitsSection',
  title: 'Benefits Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Benefit Text',
              type: 'string',
              validation: (Rule) =>
                Rule.max(50).error('Benefit text must be 50 characters or less'),
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Enter the name of the Radix UI icon (e.g., "PlayIcon", "ClockIcon")',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(6).error('You can have a maximum of 6 benefits'),
    }),
  ],
})
