import type { RequestHandler } from './$types'
import { Configuration, OpenAIApi } from 'openai'
import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { text } = await request.json()

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `以下の要望を満たす飲食店を3店ほどご紹介していただけませんか？\n回答は日本語でお願いします。\nお店選びの候補として使いたいので、自然言語で視覚的に明確かつ詳細に説明してください。文章だけでもお店の雰囲気や内装を感じたいので、お店の説明はできるだけ長くお願いします。\n要望: \n${text}`
        }
      ]
    })

    return json({ data: completion.data.choices[0].message })
  } catch (error) {
    return json({ data: null })
  }
}
