import {defineField, defineType} from 'sanity'

export const technologiesSection = defineType({
  name: 'technologiesSection',
  title: 'Technologies Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
            },
          ],
        },
      ],
    }),
  ],
})
