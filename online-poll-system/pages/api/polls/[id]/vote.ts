// pages/api/polls/[id]/vote.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { id } = req.query as { id: string }
  const { optionId } = req.body as { optionId: string }

  const g: any = globalThis
  // initialize if absent
  if (!g.polls) {
    g.polls = []
    // seed same as index route — quickly copy the seed:
    g.polls.push({
      id: 'p1',
      question: 'What is your favorite programming language?',
      options: [
        { id: 'o1', text: 'JavaScript', votes: 274 },
        { id: 'o2', text: 'Python', votes: 180 },
        { id: 'o3', text: 'TypeScript', votes: 120 },
      ],
      status: 'active',
    })
    g.polls.push({
      id: 'p2',
      question: 'Which framework do you prefer for building web apps?',
      options: [
        { id: 'o1', text: 'React', votes: 513 },
        { id: 'o2', text: 'Vue.js', votes: 320 },
        { id: 'o3', text: 'Angular', votes: 182 },
      ],
      status: 'active',
    })
    g.polls.push({
      id: 'p3',
      question: 'Which database would you choose for a new project?',
      options: [
        { id: 'o1', text: 'PostgreSQL', votes: 320 },
        { id: 'o2', text: 'MongoDB', votes: 210 },
        { id: 'o3', text: 'MySQL', votes: 147 },
      ],
      status: 'closed',
    })
  }

  const poll = g.polls.find((p: any) => p.id === id)
  if (!poll) return res.status(404).json({ error: 'Not found' })
  if (poll.status === 'closed') return res.status(400).json({ error: 'closed' })
  const opt = poll.options.find((o: any) => o.id === optionId)
  if (!opt) return res.status(404).json({ error: 'option not found' })
  opt.votes = (opt.votes || 0) + 1
  return res.status(200).json(poll)
}
