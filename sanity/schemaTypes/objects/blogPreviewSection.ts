import { defineField, defineType } from 'sanity'

export const blogPreviewSection = defineType({
  name: 'blogPreviewSection',
  title: 'Blog Preview Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'featuredPosts',
      title: 'Featured Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blog' }]
        }
      ],
      validation: Rule => Rule.max(3)
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Button Text' },
        { name: 'link', type: 'string', title: 'Button Link' }
      ]
    })
  ]
})