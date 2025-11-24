// pages/api/polls/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createPoll, listPolls } from '../../../lib/pollsStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(listPolls())
  } else if (req.method === 'POST') {
    const { question, options } = req.body as { question: string; options: string[] }
    if (!question || !options || options.length < 2) return res.status(400).json({ error: 'Invalid payload' })
    const newPoll = createPoll(question, options)
    return res.status(201).json(newPoll)
  } else {
    return res.status(405).end()
  }
}
