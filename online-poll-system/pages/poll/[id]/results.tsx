import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { useRouter } from 'next/router'

export default function Results() {
  const router = useRouter()
  const { id } = router.query
  const [poll, setPoll] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    fetch('/api/polls').then(r => r.json()).then((arr) => {
      const p = arr.find((x: any) => x.id === id)
      setPoll(p)
    })
  }, [id])

  if (!poll) return (<><Header /><main style={{ padding: 32 }}>Loading…</main></>)

  const total = poll.options.reduce((s: number, o: any) => s + o.votes, 0) || 1

  return (
    <>
      <Header />
      <main style={{ padding: 32 }}>
        <h2>Results — {poll.question}</h2>
        <div style={{ marginTop: 12, maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {poll.options.map((o: any) => {
            const pct = Math.round((o.votes / total) * 100)
            return (
              <div key={o.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <div>{o.text}</div>
                  <div>{o.votes} votes • {pct}%</div>
                </div>
                <div style={{ background: '#F3F4F6', height: 12, borderRadius: 8, marginTop: 8 }}>
                  <div style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#7C3AED,#3A7AFE)', height: '100%', borderRadius: 8 }} />
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}
