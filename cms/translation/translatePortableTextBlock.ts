import translateText from './translateText'

const ANCHOR_LABEL_RENAMES: Record<string, string> = {
  Beschreibung: 'Description',
  Bilder: 'Images',
  'Technische Daten': 'Technical data',
  Details: 'Details',
}

export default async function translatePortableTextBlock(block: any) {
  return {
    ...block,
    children: await Promise.all(
      (block.children || []).map(async (child: any) => {
        if (!child.text) return child

        // preserve leading/trailing whitespace
        const leadingSpace = child.text.match(/^(\s*)/)?.[0] || ''
        const trailingSpace = child.text.match(/(\s*)$/)?.[0] || ''

        const trimmedText = child.text.trim()
        const translated = trimmedText ? await translateText(trimmedText) : ''

        return {
          ...child,
          text: `${leadingSpace}${translated}${trailingSpace}`,
        }
      }),
    ),
    markDefs: await Promise.all(
      (block.markDefs || []).map(async (mark: any) => {
        if (mark._type === 'anchor' && mark.label) {
          return {
            ...mark,
            // map label if exists in your rename map
            label: ANCHOR_LABEL_RENAMES[mark.label] ?? mark.label,
          }
        }
        return mark
      }),
    ),
  }
}
