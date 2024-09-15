import { defineField, defineType } from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Field Name' },
            { name: 'label', type: 'string', title: 'Field Label' },
            { name: 'placeholder', type: 'string', title: 'Placeholder' },
            {
              name: 'type',
              type: 'string',
              title: 'Field Type',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Select', value: 'select' },
                ],
              },
            },
            {
              name: 'options',
              type: 'array',
              title: 'Select Options',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => parent?.type !== 'select',
            },
            { name: 'required', type: 'boolean', title: 'Required' },
          ],
        },
      ],
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
    }),
  ],
})
