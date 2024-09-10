import {defineField, defineType} from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'contactButton',
      title: 'Contact Button',
      type: 'object',
      fields: [
        {name: 'text', type: 'string', title: 'Button Text'},
        {name: 'link', type: 'string', title: 'Button Link'},
      ],
    }),
    defineField({
      name: 'linkColumns',
      title: 'Link Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Column Title'},
            {
              name: 'links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'text', type: 'string', title: 'Link Text'},
                    {name: 'url', type: 'url', title: 'Link URL'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
