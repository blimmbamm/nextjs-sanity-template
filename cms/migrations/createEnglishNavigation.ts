function rewriteNavLink(link: any) {
  return {
    ...link,
    page: link.page
      ? {
          ...link.page,
          _ref: `${link.page._ref}-en`,
        }
      : link.page,
  }
}

function rewriteNavDropdownItem(item: any) {
  return {
    ...item,
    page: item.page
      ? {
          ...item.page,
          _ref: `${item.page._ref}-en`,
        }
      : item.page,
  }
}

function rewriteNavItems(items: any[]) {
  return items.map((item) => {
    if (item._type === 'navLink') {
      return rewriteNavLink(item)
    }

    if (item._type === 'navDropdown') {
      return {
        ...item,
        items: (item.items || []).map(rewriteNavDropdownItem),
      }
    }

    return item
  })
}

import {defineMigration, create} from 'sanity/migrate'

export default defineMigration({
  title: 'Create English navigation',
  documentTypes: ['navigation'],
  async *migrate(documents, context) {
    for await (const doc of documents()) {
      if (doc.language !== 'de') continue

      const enNavId = `${doc._id}-en`

      // Skip if EN navigation already exists
      const existing = (await context.client.fetch('count(*[_id == $id])', {id: enNavId})) > 0
      if (existing) continue

      const enNav = {
        ...doc,
        _id: enNavId,
        language: 'en',
        title: 'Navigation (EN)',
        items: rewriteNavItems((doc.items as any[]) || []),
      }

      yield create(enNav)
    }
  },
})
