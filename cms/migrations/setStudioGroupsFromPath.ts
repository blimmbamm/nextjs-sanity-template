import {at, defineMigration, patch, set} from 'sanity/migrate'

function studioGroupForPage(page: {
  isHome?: boolean
  path?: string
}): string | undefined {
  if (page.isHome) {
    return undefined
  }

  if (!page.path) {
    return 'general'
  }

  if (page.path.startsWith('docs/')) {
    return 'docs'
  }

  if (page.path.startsWith('blog/')) {
    return 'blog'
  }

  return 'general'
}

export default defineMigration({
  title: 'Set studioGroup on pages from path prefix',
  documentTypes: ['page'],
  async *migrate(documents) {
    for await (const document of documents()) {
      const page = document as typeof document & {
        isHome?: boolean
        path?: string
        studioGroup?: string
      }

      if (page.studioGroup) {
        continue
      }

      const studioGroup = studioGroupForPage(page)

      if (!studioGroup) {
        continue
      }

      yield patch(document._id, [at('studioGroup', set(studioGroup))])
    }
  },
})
