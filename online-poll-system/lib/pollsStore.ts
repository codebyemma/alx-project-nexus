import { v4 as uuid } from 'uuid'
import { Poll } from '../types'

type PollStore = {
  polls: Poll[]
}

declare global {
  // eslint-disable-next-line no-var
  var __pollStore: PollStore | undefined
}

const INITIAL_POLLS: Poll[] = [
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
  },
]

const getStore = (): PollStore => {
  if (!globalThis.__pollStore) {
    // Clone so each dev session starts from the same baseline
    globalThis.__pollStore = {
      polls: INITIAL_POLLS.map((poll) => ({
        ...poll,
        options: poll.options.map((opt) => ({ ...opt })),
      })),
    }
  }
  return globalThis.__pollStore
}

export const listPolls = () => getStore().polls

export const createPoll = (question: string, options: string[]) => {
  const poll: Poll = {
    id: uuid(),
    question,
    options: options.map((text, idx) => ({
      id: `o${idx + 1}`,
      text,
      votes: 0,
    })),
    status: 'active',
  }
  getStore().polls.unshift(poll)
  return poll
}

export const getPoll = (id: string) => listPolls().find((poll) => poll.id === id)

export const voteOnPoll = (pollId: string, optionId: string) => {
  const poll = getPoll(pollId)
  if (!poll) return null
  if (poll.status === 'closed') return 'closed' as const

  const option = poll.options.find((opt) => opt.id === optionId)
  if (!option) return 'option_not_found' as const

  option.votes += 1
  return poll
}

export const updatePollStatus = (pollId: string, status: Poll['status']) => {
  const poll = getPoll(pollId)
  if (!poll) return null
  poll.status = status
  return poll
}

