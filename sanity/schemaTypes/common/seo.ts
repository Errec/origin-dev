import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The page title used for SEO and browser tabs (50-60 characters)',
      validation: Rule => Rule.max(60).warning('Longer titles may be truncated by search engines')
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'A brief summary of the page content (120-158 characters)',
      validation: Rule => Rule.max(158).warning('Longer descriptions may be truncated by search engines')
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords that describe the content of the page',
    }),
    defineField({
      name: 'image',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image displayed when sharing the page on social media (1200x630 pixels recommended)',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'When enabled, tells search engines not to index this page',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The preferred version of this page for search engines to index',
    }),
  ]
})