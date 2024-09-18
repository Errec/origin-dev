import {defineField, defineType} from 'sanity'

export const projects = defineType({
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Page Subtitle',
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
