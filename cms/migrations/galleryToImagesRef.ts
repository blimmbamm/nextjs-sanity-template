import {defineMigration, at, set, createIfNotExists, patch} from 'sanity/migrate'

const isGerman = (id: string) => !id.endsWith('-en')

export default defineMigration({
  title: 'Convert imageGallery blocks to imagesRef (order based)',
  documentTypes: ['page'],
  migrate: {
    async document(doc, context) {
      // if (doc._id !== 'af5afdd3-d958-457d-94c4-f6a877b4a55d') return []
      if (!isGerman(doc._id)) return []
      if (!Array.isArray(doc.content)) return []

      const patches: any[] = []

      // find german gallery indices
      const germanGalleryIndices = doc.content
        .map((b: any, i: number) => (b._type === 'imageGallery' ? i : -1))
        .filter((i: number) => i !== -1)

      if (!germanGalleryIndices.length) return []

      // fetch english sibling
      const enId = `${doc._id}-en`
      const enDoc = await context.client.fetch('*[_id == $enId][0]', {enId})

      const enGalleries = enDoc.content.filter((b: any) => b._type === 'imageGallery')

      germanGalleryIndices.forEach((gIndex, orderIndex) => {
        const block = (doc.content as any[])[gIndex]
        const imagesDocId = `images.${doc._id}.${orderIndex}`

        // create shared images doc
        patches.push(
          createIfNotExists({
            _id: imagesDocId,
            _type: 'images',
            title: doc.title,
            images: block.images,
          }),
        )

        const newBlock = {
          _type: 'imagesRef',
          images: {
            _type: 'reference',
            _ref: imagesDocId,
          },
        }

        // patch german
        patches.push(at(['content', gIndex], set(newBlock)))

        // patch english by occurrence index
        const enBlock = enGalleries[orderIndex]

        if (enBlock !== undefined) {
          patches.push(patch(enId, [at([`content[_key=="${enBlock._key}"]`], set(newBlock))]))
        }
      })

      return patches
    },
  },
})
