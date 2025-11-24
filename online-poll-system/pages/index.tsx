import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import PollCard from '../components/PollCard'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchPolls } from '../store/pollsSlice'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const polls = useAppSelector((s) => s.polls.list)
  const loading = useAppSelector((s) => s.polls.loading)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'closed'>('all')

  useEffect(() => {
    dispatch(fetchPolls())
  }, [dispatch])

  const filtered = polls
    .filter(p => p.question.toLowerCase().includes(query.toLowerCase()))
    .filter(p => statusFilter === 'all' ? true : p.status === statusFilter)

  return (
    <>
      <Header />
      <main style={{ padding: '24px 48px' }}>
        <section style={{ background: 'linear-gradient(90deg,#7C3AED,#3A7AFE)', color: 'white', borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>Discover & Vote</h2>
          <p style={{ marginTop: 8, marginBottom: 0, opacity: 0.95 }}>Join the conversation! Vote on trending polls or create your own to gather opinions from the community.</p>
        </section>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search polls..." style={{
            flex: 1,
            minWidth: 220,
            padding: '12px 16px',
            borderRadius: 10,
            border: '1px solid #E5E7EB'
          }} />
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'All', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Closed', value: 'closed' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value as typeof statusFilter)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 999,
                  border: statusFilter === filter.value ? '1px solid #C7D2FE' : '1px solid #E5E7EB',
                  background: statusFilter === filter.value ? '#EEF2FF' : 'white',
                  color: statusFilter === filter.value ? '#111827' : '#4B5563',
                  fontWeight: statusFilter === filter.value ? 600 : 500,
                  cursor: 'pointer'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ color: '#374151', marginBottom: 8 }}>Showing {filtered.length} polls</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
          {loading ? <div>Loading...</div> : filtered.map(p => <PollCard key={p.id} poll={p} />)}
        </div>
      </main>
    </>
  )
}

export default Home
