import {createClient} from '@sanity/client'
import extractPlainTextFromBlocks from './extractPlainTextFromBlocks'
import generateSeoDescription from './generateSeoDescription'

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
async function testGeneration() {
  const page = await getSinglePage()

  const text = extractPlainTextFromBlocks(page.content);

  const description = await generateSeoDescription(text)

  console.log('Generated description: ', description)
}

testGeneration()
  .then(() => console.log('\n✅ Done'))
  .catch((err) => console.error(err))
