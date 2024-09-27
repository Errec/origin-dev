import { defineField, defineType } from 'sanity'
import { v4 as uuidv4 } from 'uuid'

// Function to generate a unique ID
const generateUniqueId = async (existingIds: string[]) => {
  let newId = uuidv4()
  while (existingIds.includes(newId)) {
    newId = uuidv4()
  }
  return newId
}

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
      validation: (Rule) => Rule.max(9),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'projectId',
              title: 'Project ID',
              type: 'string',
              validation: (Rule) => Rule.required(),
              initialValue: async (_, context) => {
                const client = context.getClient({ apiVersion: '2021-03-25' });
                try {
                  const existingIds = await client.fetch('*[_type == "projectsPage"].projects[].projectId');
                  return generateUniqueId(existingIds || []);
                } catch (error) {
                  console.error('Error generating project ID:', error);
                  throw new Error('Failed to generate project ID');
                }
              },
              readOnly: true,
            }),
            defineField({
              name: 'photo',
              title: 'Project Photo',
              type: 'image',
              options: { hotspot: true },
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
              name: 'techStack',
              title: 'Tech Stack',
              type: 'array',
              of: [{ type: 'string' }],
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
