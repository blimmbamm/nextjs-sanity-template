import { openai } from "../openai/client"

const SYSTEM_PROMPT = `
You are a translation engine.
Translate text from German to English.

Rules:
- Return ONLY the translated text.
- Do NOT explain.
- Do NOT add quotes.
- Do NOT add punctuation.
- Do NOT ask questions.
- If the input is unclear, return it unchanged.
- Preserve numbers, units, and identifiers.
`

export default async function translateText(text: string) {
  if (!text) return ''
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // cheap & good for translation
    messages: [
      {role: 'system', content: SYSTEM_PROMPT},
      {role: 'user', content: text},
    ],
    temperature: 0,
  })

  return response.choices[0].message?.content ?? text
}
