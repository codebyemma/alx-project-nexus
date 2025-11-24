// pages/api/polls/[id]/status.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { updatePollStatus } from '../../../../lib/pollsStore'
import { Poll } from '../../../../types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') return res.status(405).end()

  const { id } = req.query as { id: string }
  const { status } = req.body as { status?: Poll['status'] }

  if (!status || !['active', 'closed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  const poll = updatePollStatus(id, status)
  if (!poll) return res.status(404).json({ error: 'Not found' })

  return res.status(200).json(poll)
}

