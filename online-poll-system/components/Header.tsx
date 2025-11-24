// components/Header.tsx
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

const navItems = [
  { label: 'All Polls', href: '/' },
  { label: 'My Polls', href: '/create', cta: true },
]

export default function Header() {
  const router = useRouter()

  return (
    <header style={{ padding: 16, borderBottom: '1px solid #EEF2F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Use your Figma screenshot as logo if you want; see path below */}
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(90deg,#7C3AED,#3A7AFE)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
            PH
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>PollHub</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>Create & Vote on Polls</div>
          </div>
        </Link>
      </div>
      <nav style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {navItems.map((item) => {
          const isActive = router.pathname === item.href
          if (item.cta) {
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  background: 'linear-gradient(90deg,#7C3AED,#3A7AFE)',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: 10,
                  boxShadow: '0 6px 18px rgba(59,53,239,0.12)',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                + Create Poll
              </Link>
            )
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                textDecoration: 'none',
                color: isActive ? '#111827' : '#4B5563',
                background: isActive ? '#EEF2FF' : 'transparent',
                border: isActive ? '1px solid #C7D2FE' : '1px solid transparent',
                fontSize: 14,
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
