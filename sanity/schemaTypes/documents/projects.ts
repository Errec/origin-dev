export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Project Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Project Description',
        type: 'text',
      },
      {
        name: 'image',
        title: 'Project Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'link',
        title: 'Project Link',
        type: 'url',
      },
    ],
  };
  