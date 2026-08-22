import translateText from './translateText'

export default async function translateHeadlineWithDate(block: any) {
  return {
    ...block,
    title: block.title ? await translateText(block.title) : block.title,
  }
}
