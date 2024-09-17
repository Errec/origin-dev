import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'projectsSection',
  title: 'Projects Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
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
            defineField({
              name: 'photo',
              title: 'Project Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'subtitle',
              title: 'Project Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Project Description',
              type: 'text',
            }),
            defineField({
              name: 'link',
              title: 'Project Link',
              type: 'url',
            }),
          ],
        },
      ],
    }),
  ],
})
