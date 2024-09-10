import {defineField, defineType} from 'sanity'

export const technologiesSection = defineType({
  name: 'technologiesSection',
  title: 'Technologies Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Technology Name'},
            {name: 'logo', type: 'image', title: 'Logo', options: {accept: 'image/svg+xml'}},
          ],
        },
      ],
    }),
  ],
})
