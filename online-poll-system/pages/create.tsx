import React, { useState } from 'react'
import Header from '../components/Header'
import { useAppDispatch } from '../hooks'
import { createPoll } from '../store/pollsSlice'
import { useRouter } from 'next/router'

export default function Create() {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const dispatch = useAppDispatch()
  const router = useRouter()

  const addOption = () => setOptions(prev => [...prev, ''])
  const updateOption = (i: number, v: string) => setOptions(prev => prev.map((o, idx) => idx === i ? v : o))
  const canSubmit = question.trim().length > 0 && options.filter(o => o.trim()).length >= 2

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    const opts = options.filter(o => o.trim()).map(o => o.trim())
    try {
      await dispatch(createPoll({ question: question.trim(), options: opts })).unwrap()
      router.push('/')
    } catch (err) {
      alert('Failed to create poll')
    }
  }

  return (
    <>
      <Header />
      <main style={{ padding: 32 }}>
        <h2>Create Poll</h2>
        <form onSubmit={onSubmit} style={{ maxWidth: 720, marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Poll question" style={{ padding: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
          {options.map((opt, i) => (
            <input key={i} value={opt} onChange={e => updateOption(i, e.target.value)} placeholder={`Option ${i + 1}`} style={{ padding: 12, borderRadius: 8, border: '1px solid #E5E7EB' }} />
          ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" onClick={addOption} style={{ background: 'white', border: '1px solid #E5E7EB', padding: '8px 12px', borderRadius: 8 }}>Add Option</button>
            <button type="submit" disabled={!canSubmit} style={{ marginLeft: 'auto', background: canSubmit ? 'linear-gradient(90deg,#7C3AED,#3A7AFE)' : '#E5E7EB', color: canSubmit ? 'white' : '#9CA3AF', padding: '8px 12px', borderRadius: 8 }}>Create</button>
          </div>
        </form>
      </main>
    </>
  )
}
