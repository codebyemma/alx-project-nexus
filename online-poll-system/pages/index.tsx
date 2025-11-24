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

  useEffect(() => {
    dispatch(fetchPolls())
  }, [dispatch])

  const filtered = polls.filter(p => p.question.toLowerCase().includes(query.toLowerCase()))

  return (
    <>
      <Header />
      <main style={{ padding: '24px 48px' }}>
        <section style={{ background: 'linear-gradient(90deg,#7C3AED,#3A7AFE)', color: 'white', borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>Discover & Vote</h2>
          <p style={{ marginTop: 8, marginBottom: 0, opacity: 0.95 }}>Join the conversation! Vote on trending polls or create your own to gather opinions from the community.</p>
        </section>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search polls..." style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 10,
            border: '1px solid #E5E7EB'
          }} />
          <button style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #E5E7EB', background: 'white' }}>All Polls</button>
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
