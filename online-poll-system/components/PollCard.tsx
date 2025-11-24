import React from 'react'
import Link from 'next/link'
import { Poll } from '../types'

export default function PollCard({ poll }: { poll: Poll }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      padding: 18,
      boxShadow: '0 6px 18px rgba(15,23,42,0.04)',
      border: '1px solid #EEF2F7',
      width: 320,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 12
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>{poll.question}</h3>
          <div style={{ background: poll.status === 'active' ? '#D1FAE5' : '#FEE2E2', color: poll.status === 'active' ? '#065F46' : '#991B1B', padding: '4px 8px', borderRadius: 8, fontSize: 12 }}>
            {poll.status === 'active' ? 'Active' : 'Closed'}
          </div>
        </div>
        <div style={{ marginTop: 8, color: '#6B7280', fontSize: 13 }}>
          <div style={{ marginBottom: 8 }}>{poll.options.reduce((s, o) => s + o.votes, 0)} votes</div>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {poll.options.slice(0,3).map(o => <li key={o.id} style={{ marginBottom: 4 }}>{o.text}</li>)}
            {poll.options.length > 3 && <li>+{poll.options.length - 3} more option</li>}
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <Link
          href={`/poll/${poll.id}`}
          style={{
            flex: 1,
            background: 'linear-gradient(90deg,#7C3AED,#3A7AFE)',
            color: 'white',
            textAlign: 'center',
            padding: '10px 14px',
            borderRadius: 8,
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          Vote Now
        </Link>
        <Link
          href={`/poll/${poll.id}/results`}
          style={{
            border: '1px solid #E5E7EB',
            padding: '10px 14px',
            borderRadius: 8,
            textDecoration: 'none',
            color: '#111827',
            display: 'inline-block'
          }}
        >
          Results
        </Link>
      </div>
    </div>
  )
}
