import {defineField, defineType} from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'smallTitle',
      title: 'Small Title (e.g. "NEXT PAGE")',
      type: 'string',
    }),
    defineField({
      name: 'bigTitle',
      title: 'Big Title (e.g. "WORK")',
      type: 'string',
    }),
    defineField({
      name: 'ctaPhrase',
      title: 'Call to Action Phrase',
      type: 'string',
    }),
    defineField({
      name: 'businessEnquiries',
      title: 'Business Enquiries',
      type: 'object',
      fields: [
        {name: 'email', type: 'string', title: 'Email'},
        {name: 'phone', type: 'string', title: 'Phone'},
      ],
    }),
    defineField({
      name: 'openPositions',
      title: 'Open Positions',
      type: 'object',
      fields: [{name: 'email', type: 'string', title: 'Email'}],
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'city', type: 'string', title: 'City'},
            {name: 'address', type: 'string', title: 'Address'},
            {name: 'country', type: 'string', title: 'Country'},
          ],
        },
      ],
    }),
  ],
})
