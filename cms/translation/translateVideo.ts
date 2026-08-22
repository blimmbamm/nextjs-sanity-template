import translateText from './translateText'

export default async function translateVideo(block: any) {
  return {
    ...block,
    caption: block.caption ? await translateText(block.caption) : block.caption,
  }
}
