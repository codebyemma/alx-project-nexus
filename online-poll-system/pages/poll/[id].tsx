// pages/poll/[id].tsx
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function PollDetail() {
  const router = useRouter()
  const { id } = router.query
  const [poll, setPoll] = useState<any>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch('/api/polls').then(r => r.json()).then((arr) => {
      const p = arr.find((x: any) => x.id === id)
      setPoll(p)
    })
  }, [id])

  const submit = async () => {
    if (!selected || !id) return
    setLoading(true)
    const res = await fetch(`/api/polls/${id}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ optionId: selected }),
    })
    if (res.ok) {
      const updated = await res.json()
      setPoll(updated)
      // navigate to results or update UI - here we go to results
      router.push(`/poll/${id}/results`)
    } else {
      alert('Unable to submit vote')
    }
    setLoading(false)
  }

  const toggleStatus = async () => {
    if (!poll) return
    setStatusLoading(true)
    const nextStatus = poll.status === 'active' ? 'closed' : 'active'
    try {
      const res = await fetch(`/api/polls/${poll.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      if (!res.ok) throw new Error('Failed')
      const updated = await res.json()
      setPoll(updated)
      if (nextStatus === 'closed') setSelected(null)
    } catch (err) {
      alert('Unable to update poll status')
    }
    setStatusLoading(false)
  }

  if (!poll) return (<><Header /><main style={{ padding: 32 }}>Loading poll…</main></>)

  return (
    <>
      <Header />
      <main style={{ padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0 }}>{poll.question}</h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{
              background: poll.status === 'active' ? '#D1FAE5' : '#FEE2E2',
              color: poll.status === 'active' ? '#065F46' : '#991B1B',
              padding: '6px 10px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600
            }}>
              {poll.status === 'active' ? 'Active' : 'Closed'}
            </span>
            <button
              onClick={toggleStatus}
              disabled={statusLoading}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #E5E7EB',
                background: 'white',
                cursor: statusLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {poll.status === 'active' ? 'Close Poll' : 'Reopen Poll'}
            </button>
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720 }}>
          {poll.options.map((o: any) => (
            <label key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}>
              <input type="radio" name="opt" value={o.id} checked={selected === o.id} onChange={() => setSelected(o.id)} />
              <div>{o.text}</div>
            </label>
          ))}
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={submit} disabled={!selected || loading || poll.status === 'closed'} style={{ background: (!selected || loading || poll.status === 'closed') ? '#D1D5DB' : 'linear-gradient(90deg,#7C3AED,#3A7AFE)', color: 'white', padding: '10px 14px', borderRadius: 8 }}>
              {poll.status === 'closed' ? 'Poll Closed' : 'Submit Vote'}
            </button>
            <Link href={`/poll/${id}/results`} style={{ border: '1px solid #E5E7EB', padding: '10px 14px', borderRadius: 8, textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>View Results</Link>
          </div>
          {poll.status === 'closed' && (
            <p style={{ fontSize: 14, color: '#6B7280' }}>This poll is closed. Reopen it to accept more votes.</p>
          )}
        </div>
      </main>
    </>
  )
}
