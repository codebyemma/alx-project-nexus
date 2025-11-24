// pages/api/polls/[id]/vote.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { voteOnPoll } from '../../../../lib/pollsStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { id } = req.query as { id: string }
  const { optionId } = req.body as { optionId: string }

  if (!optionId) return res.status(400).json({ error: 'optionId required' })

  const result = voteOnPoll(id, optionId)
  if (result === null) return res.status(404).json({ error: 'Not found' })
  if (result === 'closed') return res.status(400).json({ error: 'closed' })
  if (result === 'option_not_found') return res.status(404).json({ error: 'option not found' })

  return res.status(200).json(result)
}
