// components/Header.tsx
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <header style={{ padding: 16, borderBottom: '1px solid #EEF2F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Use your Figma screenshot as logo if you want; see path below */}
        <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(90deg,#7C3AED,#3A7AFE)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
          PH
        </div>
        <div>
          <div style={{ fontWeight: 700 }}>PollHub</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>Create & Vote on Polls</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link
          href="/create"
          style={{ background: 'linear-gradient(90deg,#7C3AED,#3A7AFE)', color: 'white', padding: '10px 16px', borderRadius: 10, boxShadow: '0 6px 18px rgba(59,53,239,0.12)', textDecoration: 'none', display: 'inline-block' }}
        >
          + Create Poll
        </Link>
      </div>
    </header>
  )
}
