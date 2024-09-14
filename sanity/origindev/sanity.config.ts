import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'origindev',

  projectId: 'f93vz2nu',
  dataset: 'production-comments',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
