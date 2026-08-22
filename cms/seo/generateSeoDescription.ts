import {openai} from '../openai/client'

export default async function generateSeoDescription(text: string): Promise<string> {
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: [
      {
        role: 'system',
        content:
          'You generate concise SEO meta descriptions. ' +
          'Write one sentence, max ~160 characters, neutral tone, no quotes. ' +
          'Write the description in German.',
      },
      {
        role: 'user',
        content: text,
      },
    ],
  })

  return response.output_text.trim()
}
