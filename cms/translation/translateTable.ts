import translateText from './translateText'

export default async function translateTable(block: any) {
  return {
    ...block,
    rows: await Promise.all(
      (block.rows || []).map(async (row: any) => ({
        ...row,
        cells: await Promise.all(
          (row.cells || []).map(async (cell: string, index: number) => {
            // Translate label column
            if (index === 0) {
              return await translateText(cell)
            }

            // Translate value column only if safe
            if (shouldTranslateCell(cell)) {
              return await translateText(cell)
            }

            return cell
          }),
        ),
      })),
    ),
  }
}

function shouldTranslateCell(text: string) {
  if (!text) return false

  // contains ? or placeholders
  if (text.includes('?')) return false

  // standards, norms, identifiers
  if (/^[A-Z]{2}\s?\d+/.test(text)) return false

  // mostly numbers / symbols
  const letters = text.replace(/[^a-zA-ZäöüÄÖÜß]/g, '').length
  const ratio = letters / text.length

  return ratio > 0.3
}
