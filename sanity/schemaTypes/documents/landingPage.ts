import { defineField, defineType } from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'heroSection',
    }),
    defineField({
      name: 'projectsSection',
      title: 'Projects Section',
      type: 'projectsSection',
    }),
    defineField({
      name: 'technologiesSection',
      title: 'Technologies Section',
      type: 'technologiesSection',
    }),
    defineField({
      name: 'blogPreviewSection',
      title: 'Blog Preview Section',
      type: 'blogPreviewSection',
    }),
    defineField({
      name: 'footerSection',
      title: 'Footer Section',
      type: 'footerSection',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})