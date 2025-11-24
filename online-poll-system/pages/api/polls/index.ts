// pages/api/polls/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'

type PollOption = { id: string; text: string; votes: number }
type Poll = { id: string; question: string; options: PollOption[]; status: 'active'|'closed' }

let polls: Poll[] = [
  {
    id: 'p1',
    question: 'What is your favorite programming language?',
    options: [
      { id: 'o1', text: 'JavaScript', votes: 274 },
      { id: 'o2', text: 'Python', votes: 180 },
      { id: 'o3', text: 'TypeScript', votes: 120 },
    ],
    status: 'active',
  },
  {
    id: 'p2',
    question: 'Which framework do you prefer for building web apps?',
    options: [
      { id: 'o1', text: 'React', votes: 513 },
      { id: 'o2', text: 'Vue.js', votes: 320 },
      { id: 'o3', text: 'Angular', votes: 182 },
    ],
    status: 'active',
  },
  {
    id: 'p3',
    question: 'Which database would you choose for a new project?',
    options: [
      { id: 'o1', text: 'PostgreSQL', votes: 320 },
      { id: 'o2', text: 'MongoDB', votes: 210 },
      { id: 'o3', text: 'MySQL', votes: 147 },
    ],
    status: 'closed',
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(polls)
  } else if (req.method === 'POST') {
    const { question, options } = req.body as { question: string; options: string[] }
    if (!question || !options || options.length < 2) return res.status(400).json({ error: 'Invalid payload' })
    const newPoll: Poll = {
      id: uuid(),
      question,
      options: options.map((t, i) => ({ id: String(i + 1), text: t, votes: 0 })),
      status: 'active',
    }
    polls.unshift(newPoll)
    return res.status(201).json(newPoll)
  } else {
    return res.status(405).end()
  }
}
