import translateBlockContent from './translateBlockContent'
import translateText from './translateText'

export default async function translatePage(page: any) {
  console.log('Original seoTitle:', page.seoTitle)
  console.log('Original description:', page.description)

  const translatedSeoTitle = await translateText(page.seoTitle)
  const translatedDescription = await translateText(page.description)
  const translatedContent = await translateBlockContent(page.content || [])

  console.log('\nTranslated title:', translatedSeoTitle)
  console.log('Translated description:', translatedDescription)

  return {
    ...page,
    seoTitle: translatedSeoTitle,
    description: translatedDescription,
    content: translatedContent,
  }
}
