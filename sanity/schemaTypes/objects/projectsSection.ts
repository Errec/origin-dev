import { defineField, defineType } from 'sanity'

export const projectsSection = defineType({
  name: 'projectsSection',
  title: 'Projects Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Project Title' },
            { name: 'subtitle', type: 'string', title: 'Project Subtitle' },
            { name: 'image', type: 'image', title: 'Project Image' },
            { name: 'hoverVideo', type: 'file', title: 'Hover Video', options: { accept: 'video/*' } }
          ]
        }
      ]
    })
  ]
})