import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'year', 'featured', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Architecture', value: 'architecture' },
        { label: 'Campaign', value: 'campaign' },
        { label: 'Branding', value: 'branding' },
        { label: 'Digital', value: 'digital' },
        { label: 'Motion', value: 'motion' },
        { label: 'Photography', value: 'photography' },
      ],
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 2000,
      max: 2100,
    },
    {
      name: 'client',
      type: 'text',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Full Project Description',
    },
    {
      name: 'testimonial',
      type: 'group',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
        },
        {
          name: 'author',
          type: 'text',
        },
        {
          name: 'authorRole',
          type: 'text',
        },
      ],
    },
  ],
}
