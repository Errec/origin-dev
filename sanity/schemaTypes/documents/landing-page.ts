import {defineField, defineType} from 'sanity'

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
      name: 'benefitsSection',
      title: 'Benefits Section',
      type: 'benefitsSection',
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
      name: 'contactSection',
      title: 'Contact Section',
      type: 'contactSection',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
