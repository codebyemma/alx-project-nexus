export type PollOption = { id: string; text: string; votes: number }
export type Poll = { id: string; question: string; options: PollOption[]; status: 'active'|'closed' }
