import type {StructureResolver} from 'sanity/structure'

const API_VERSION = '2026-01-18'

const HIDDEN_FROM_TYPE_LIST = new Set([
  'page',
  'navigation',
  'translation.metadata',
])

function formatGroupLabel(group: string) {
  return group.charAt(0).toUpperCase() + group.slice(1)
}

export const structure: StructureResolver = async (S, context) => {
  const client = context.getClient({apiVersion: API_VERSION})

  const groups = await client.fetch<string[]>(
    `array::unique(*[_type == "page" && defined(studioGroup) && studioGroup != ""].studioGroup) | order(@ asc)`,
  )

  const pageItems = [
    S.listItem()
      .title('Homepages')
      .child(
        S.documentList()
          .title('Homepages')
          .filter('_type == "page" && isHome == true')
          .defaultOrdering([{field: 'language', direction: 'asc'}]),
      ),
    S.divider(),
    ...groups.map((group) =>
      S.listItem()
        .title(formatGroupLabel(group))
        .child(
          S.documentList()
            .title(formatGroupLabel(group))
            .filter('_type == "page" && studioGroup == $group')
            .params({group})
            .defaultOrdering([
              {field: 'language', direction: 'asc'},
              {field: 'title', direction: 'asc'},
            ]),
        ),
    ),
    S.listItem()
      .title('Ungrouped pages')
      .child(
        S.documentList()
          .title('Ungrouped pages')
          .filter(
            '_type == "page" && isHome != true && (!defined(studioGroup) || studioGroup == "")',
          )
          .defaultOrdering([
            {field: 'language', direction: 'asc'},
            {field: 'title', direction: 'asc'},
          ]),
      ),
    S.listItem()
      .title('All pages')
      .child(
        S.documentList()
          .title('All pages')
          .filter('_type == "page"')
          .defaultOrdering([
            {field: 'studioGroup', direction: 'asc'},
            {field: 'language', direction: 'asc'},
            {field: 'title', direction: 'asc'},
          ]),
      ),
  ]

  const navigationItems = S.listItem()
    .title('Main Navigation')
    .child(
      S.list()
        .title('Main Navigation')
        .items([
          S.listItem()
            .title('German')
            .id('navigation-de')
            .child(
              S.document()
                .schemaType('navigation')
                .documentId('navigation-de')
                .title('Main Navigation (DE)')
                .initialValueTemplate('navigation-de'),
            ),
          S.listItem()
            .title('English')
            .id('navigation-en')
            .child(
              S.document()
                .schemaType('navigation')
                .documentId('navigation-en')
                .title('Main Navigation (EN)')
                .initialValueTemplate('navigation-en'),
            ),
        ]),
    )

  const otherDocumentTypes = S.documentTypeListItems().filter(
    (item) => !HIDDEN_FROM_TYPE_LIST.has(item.getId() ?? ''),
  )

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(S.list().title('Pages').items(pageItems)),
      S.divider(),
      navigationItems,
      S.divider(),
      ...otherDocumentTypes,
    ])
}
