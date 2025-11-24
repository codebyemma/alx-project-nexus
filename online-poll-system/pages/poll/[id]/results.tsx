import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../../components/Header'
import { useRouter } from 'next/router'

export default function Results() {
  const router = useRouter()
  const { id } = router.query
  const [poll, setPoll] = useState<any>(null)
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar')

  useEffect(() => {
    if (!id) return
    fetch('/api/polls').then(r => r.json()).then((arr) => {
      const p = arr.find((x: any) => x.id === id)
      setPoll(p)
    })
  }, [id])

  const totalVotes = poll?.options.reduce((s: number, o: any) => s + o.votes, 0) ?? 0
  const hasVotes = totalVotes > 0
  const palette = ['#7C3AED', '#3A7AFE', '#F97316', '#10B981', '#EC4899', '#6366F1']

  const chartData = useMemo<{
    id: string
    text: string
    votes: number
    pct: number
    color: string
  }[]>(() => {
    if (!poll) return []
    return poll.options.map((option: any, idx: number) => {
      const pct = hasVotes ? Math.round((option.votes / Math.max(totalVotes, 1)) * 100) : 0
      return {
        ...option,
        pct,
        color: palette[idx % palette.length],
      }
    })
  }, [poll, hasVotes, totalVotes])

  const pieBackground = useMemo(() => {
    if (!hasVotes) return '#E5E7EB 0deg 360deg'
    let currentDeg = 0
    const slices = chartData.map(({ pct, color }: { pct: number; color: string }) => {
      const slice = `${color} ${currentDeg}deg ${currentDeg + (pct / 100) * 360}deg`
      currentDeg += (pct / 100) * 360
      return slice
    }).filter(Boolean)
    return slices.join(', ')
  }, [chartData, hasVotes])

  if (!poll) return (<><Header /><main style={{ padding: 32 }}>Loading…</main></>)

  return (
    <>
      <Header />
      <main style={{ padding: 32 }}>
        <h2>Results — {poll.question}</h2>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 14, color: '#6B7280' }}>Chart view:</span>
          <div style={{ border: '1px solid #E5E7EB', borderRadius: 999, display: 'inline-flex' }}>
            {['bar', 'pie'].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type as 'bar' | 'pie')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: 'none',
                  background: chartType === type ? 'linear-gradient(90deg,#7C3AED,#3A7AFE)' : 'transparent',
                  color: chartType === type ? 'white' : '#374151',
                  cursor: 'pointer',
                }}
              >
                {type === 'bar' ? 'Bar' : 'Pie'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {chartType === 'pie' && (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ width: 240, height: 240, borderRadius: '50%', background: `conic-gradient(${pieBackground})`, boxShadow: '0 10px 30px rgba(15,23,42,0.12)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {chartData.map((option: { id: string; text: string; votes: number; pct: number; color: string }) => (
                  <div key={option.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 999, background: option.color }} />
                    <span>{option.text}</span>
                    <span style={{ marginLeft: 'auto', color: '#6B7280' }}>{option.votes} votes • {option.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ marginTop: 12, maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {chartType === 'bar' && chartData.map((o: any) => {
            return (
              <div key={o.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <div>{o.text}</div>
                  <div>{o.votes} votes • {o.pct}%</div>
                </div>
                <div style={{ background: '#F3F4F6', height: 12, borderRadius: 8, marginTop: 8 }}>
                  <div style={{ width: `${o.pct}%`, background: o.color, height: '100%', borderRadius: 8, transition: 'width 0.3s ease' }} />
                </div>
              </div>
            )
          })}
          {chartType === 'pie' && (
            <p style={{ fontSize: 14, color: '#6B7280', marginTop: 8 }}>
              {hasVotes ? 'Switch back to the bar view to inspect individual progress bars.' : 'No votes yet. Ask participants to vote to populate the chart.'}
            </p>
          )}
        </div>
      </main>
    </>
  )
}
