import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'

export type PollOption = { id: string; text: string; votes: number }
export type Poll = { id: string; question: string; options: PollOption[]; status: 'active'|'closed' }

interface PollsState {
  list: Poll[]
  loading: boolean
  error?: string | null
}

const initialState: PollsState = {
  list: [],
  loading: false,
  error: null,
}

// fetch from /api/polls
export const fetchPolls = createAsyncThunk('polls/fetchAll', async () => {
  const res = await fetch('/api/polls')
  if (!res.ok) throw new Error('Failed to fetch polls')
  return (await res.json()) as Poll[]
})

export const createPoll = createAsyncThunk('polls/create', async (payload: { question: string; options: string[] }) => {
  const res = await fetch('/api/polls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Create failed')
  return (await res.json()) as Poll
})

export const vote = createAsyncThunk('polls/vote', async (payload: { pollId: string; optionId: string }) => {
  const res = await fetch(`/api/polls/${payload.pollId}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ optionId: payload.optionId }),
  })
  if (!res.ok) throw new Error('Vote failed')
  return (await res.json()) as Poll
})

const slice = createSlice({
  name: 'polls',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolls.pending, (s) => { s.loading = true })
      .addCase(fetchPolls.fulfilled, (s, action: PayloadAction<Poll[]>) => { s.loading = false; s.list = action.payload })
      .addCase(fetchPolls.rejected, (s, a) => { s.loading = false; s.error = a.error.message })
      .addCase(createPoll.fulfilled, (s, action: PayloadAction<Poll>) => { s.list.unshift(action.payload) })
      .addCase(vote.fulfilled, (s, action: PayloadAction<Poll>) => {
        const idx = s.list.findIndex(p => p.id === action.payload.id)
        if (idx >= 0) s.list[idx] = action.payload
      })
  }
})

export default slice.reducer
