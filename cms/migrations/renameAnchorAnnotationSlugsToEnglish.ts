import {defineMigration, patch, at, set} from 'sanity/migrate'

const ANCHOR_SLUG_RENAMES: Record<string, string> = {
  beschreibung: 'description',
  bilder: 'images',
  'technische-daten': 'technical-data',
}

export default defineMigration({
  title: 'Rename anchor annotation slugs using fixed map',
  documentTypes: ['page'],

  async *migrate(documents) {
    for await (const doc of documents()) {
      const blocks = doc.content
      if (!Array.isArray(blocks)) continue

      const nextBlocks = blocks.map((block: any) => {
        if (!Array.isArray(block.markDefs)) return block

        let changed = false

        const nextMarkDefs = block.markDefs.map((def: any) => {
          if (
            def._type === 'anchor' &&
            def.slug?.current &&
            ANCHOR_SLUG_RENAMES[def.slug.current]
          ) {
            changed = true
            return {
              ...def,
              slug: {
                ...def.slug,
                current: ANCHOR_SLUG_RENAMES[def.slug.current],
              },
            }
          }
          return def
        })

        return changed ? {...block, markDefs: nextMarkDefs} : block
      })

      // Check if anything actually changed
      const didChange = JSON.stringify(blocks) !== JSON.stringify(nextBlocks)
      if (!didChange) continue

      yield patch(doc._id, [at('content', set(nextBlocks))])
    }
  },
})
