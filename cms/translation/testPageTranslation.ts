import {createClient} from '@sanity/client'
import translatePage from './translatePage'

// -------------------------
// Sanity client
// -------------------------
const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'development',
  useCdn: false,
  apiVersion: '2026-01-18',
  token: process.env.SANITY_API_TOKEN, // must have write access if creating
})

// -------------------------
// Fetch one page
// -------------------------
async function getSinglePage() {
  const page = await sanityClient.fetch(
    `*[_type == "page" && _id == "6505c039-3d45-4a81-9964-0b865c4c5413"][0]`,
  )
  if (!page) throw new Error('No German page found')
  return page
}

// -------------------------
// Main test function
// -------------------------
async function testTranslation() {
  const page = await getSinglePage()

  const translatedPage = await translatePage(page)

  // -------------------------
  // Optional: insert translated page into Sanity
  // -------------------------
  const createInSanity = true // change to false if you just want to test
  if (createInSanity) {
    const newDoc = {
      ...translatedPage,
      _id: page._id + '-en',
      language: 'en',
      title: `${translatedPage.seoTitle} (EN)`
    }
    await sanityClient.create(newDoc)
    console.log('\nTranslated page created in Sanity with _id:', newDoc._id)
  }
}

testTranslation()
  .then(() => console.log('\n✅ Done'))
  .catch((err) => console.error(err))
