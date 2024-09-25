import {defineField, defineType} from 'sanity'

export const blog = defineType({
  name: 'blog',
  title: 'Blog Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title of Article',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug of Article',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'titleImage',
      title: 'Title Image',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Description of Article',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content of Article',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
