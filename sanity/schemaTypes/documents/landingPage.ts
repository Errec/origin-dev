import { defineField, defineType } from 'sanity'

export default defineType({
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
      name: 'technologiesSection',
      title: 'Technologies Section',
      type: 'technologiesSection',
    }),
    defineField({
      name: 'projectsSection',
      title: 'Projects Section',
      type: 'projectsSection',
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
  ],
})