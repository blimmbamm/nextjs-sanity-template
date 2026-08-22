import translateText from './translateText'

export default async function translateImageGallery(block: any) {
  return {
    ...block,
    images: await Promise.all(
      (block.images || []).map(async (image: any) => ({
        ...image,
        caption: image.caption ? await translateText(image.caption) : image.caption,
        alt: image.alt ? await translateText(image.alt) : image.alt,
      })),
    ),
  }
}
