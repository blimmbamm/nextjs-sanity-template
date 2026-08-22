import {defineMigration, patch, at, set} from 'sanity/migrate'

const SLUG_RENAMES: Record<string, string> = {
  'karussell-1': 'carousel-1',
  'karussell-2': 'carousel-2',
  'karussell-3': 'carousel-3',
  'karussell-4': 'carousel-4',
  'karussell-5': 'carousel-5',
  'karussell-6': 'carousel-6',
  'karussell-7': 'carousel-7',
  'karussell-8': 'carousel-8',
  'karussell-9': 'carousel-9',
  'mini-kaffeetassen-karussell': 'mini-coffee-cup-carousel',
  'bier-karussell': 'beer-carousel',
  'muenz-spielkran': 'coin-game-crane',
  riesenrad: 'ferris-wheel',
  'mini-kaffeetassen-karussell-2': 'mini-coffee-cup-carousel-2',
  'mini-kettenkarussell': 'mini-chain-carousel',
  'mini-schaukeltiere': 'mini-rocking-animals',
  'polyester-und-figurenbau': 'polyester-and-figure-construction',
  'ueber-uns': 'about-us',
  kontakt: 'contact',
}

export default defineMigration({
  title: 'Rename selected page slugs to English',
  documentTypes: ['page'],

  async *migrate(documents) {
    for await (const doc of documents()) {
      const page = doc as typeof doc & {slug?: {current: string}}
      const current = page.slug?.current

      if (!current) continue

      const next = SLUG_RENAMES[current]
      if (!next) continue
      console.log(`\nRenaming: ${current} -> ${next}`)

      yield patch(doc._id, [at('slug.current', set(next))])
    }
  },
})
