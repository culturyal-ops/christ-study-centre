'use client'

import { useEffect, useRef, useState } from 'react'

type Bubble = { id: number; type: 'parent' | 'centre'; text: string }

const SCRIPT: Omit<Bubble, 'id'>[] = [
  { type: 'parent', text: 'Hi — need Class X tuition for Maths & Science' },
  { type: 'centre', text: 'Hello! Mon–Sat batches, 4–8 PM. CBSE or SCERT?' },
  { type: 'parent', text: 'CBSE please' },
  { type: 'centre', text: '✅ Noted! Batch details on WhatsApp shortly.' },
]

const DELAYS = [600, 1600, 2600, 3600]

export default function ChatMockup() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const wrapRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const ran = useRef(false)

  useEffect(() => {
    const run = () => {
      if (ran.current) return
      ran.current = true
      SCRIPT.forEach((msg, i) => {
        setTimeout(() => {
          setBubbles((prev) => [...prev, { ...msg, id: i }])
        }, DELAYS[i])
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run()
      },
      { threshold: 0.15 }
    )

    const node = wrapRef.current
    if (node) observer.observe(node)

    // Hero is above the fold — start immediately on load
    const t = window.setTimeout(run, 400)

    return () => {
      window.clearTimeout(t)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [bubbles])

  return (
    <div className="chat-mockup-wrap" ref={wrapRef} data-tilt>
      <div className="chat-mockup fly-card">
        <div className="chat-header">
          <div className="chat-avatar">
            <span>CSC</span>
            <div className="avatar-ring" aria-hidden="true" />
          </div>
          <div className="chat-info">
            <div className="chat-name">Christ Study Centre</div>
            <div className="chat-status">
              <span className="status-dot" aria-hidden="true" />
              <span>Typically replies in minutes</span>
            </div>
          </div>
        </div>

        <div className="chat-messages" ref={messagesRef} aria-live="polite">
          {bubbles.map((b) => (
            <div
              key={b.id}
              className={`chat-bubble bubble-${b.type}`}
            >
              {b.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input type="text" placeholder="Admission enquiry…" readOnly tabIndex={-1} />
          <button type="button" aria-label="Send" tabIndex={-1}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="chat-mockup-glow" aria-hidden="true" />
    </div>
  )
}
