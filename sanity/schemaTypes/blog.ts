export default {
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
        {
        name: 'title',
        title: 'Title of Article',
        type: 'string',
        },
        {
        name: 'slug',
        title: 'Slug of Article',
        type: 'slug',
        options: {
            source: 'title',
        },
        },
        {
        name: 'coverImage',
        title: 'Cover Image',
        type: 'image',
        },
        {
        name: 'description',
        title: 'Description of Article',
        type: 'text',
        },
        {
        name: 'content',
        title: 'Content of Article',
        type: 'array',
        of: [{type: 'block'}],
        },
    ],
}