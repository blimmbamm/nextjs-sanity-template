import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'
import {table} from '@sanity/table'
import {deployTool} from './plugins/deployTool'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_TITLE ?? 'Content Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({structure}),
    visionTool(),
    table(),
    deployTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'de', title: 'German'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: ['page'],
      languageField: 'language',
      allowCreateMetaDoc: true,
      apiVersion: '2026-01-18',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
