export default {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
    },
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'string' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image' },
      ],
    },
    {
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Body', type: 'text' },
        { name: 'profileImage', title: 'Profile Image', type: 'image' },
      ],
    },
    {
      name: 'projectsSection',
      title: 'Projects Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Project Title', type: 'string' },
            { name: 'description', title: 'Project Description', type: 'text' },
            { name: 'previewImage', title: 'Preview Image', type: 'image' },
            { name: 'link', title: 'Project Link', type: 'url' },
          ],
        },
      ],
    },
  ],
};
