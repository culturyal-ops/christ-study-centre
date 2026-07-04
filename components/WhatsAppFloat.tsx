'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import BrandName from '@/components/BrandName'

const WHATSAPP_URL =
  'https://wa.me/919747110790?text=Hi%20Christ%20Study%20Centre%20%E2%80%94%20I%20would%20like%20to%20enquire%20about%20admissions.'

const HIDDEN_PREFIXES = ['/admin', '/student', '/login']
const SHOW_DELAY_MS = 800
const AUTO_HIDE_MS = 2200

export default function WhatsAppFloat() {
  const pathname = usePathname()
  const [widgetIn, setWidgetIn] = useState(false)
  const [bubbleOpen, setBubbleOpen] = useState(false)
  const hidden = HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setWidgetIn(true)
      setBubbleOpen(true)
    }, SHOW_DELAY_MS)

    const hideTimer = window.setTimeout(() => {
      setBubbleOpen(false)
    }, SHOW_DELAY_MS + AUTO_HIDE_MS)

    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  const dismissBubble = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setBubbleOpen(false)
  }

  if (hidden) return null

  return (
    <div
      className={`wa-float-wrap${widgetIn ? ' wa-float-wrap--in' : ''}`}
      aria-live="polite"
    >
      {bubbleOpen && (
        <div className="wa-float-bubble">
          <button
            type="button"
            className="wa-float-bubble-close"
            onClick={dismissBubble}
            aria-label="Dismiss message"
          >
            ×
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-float-bubble-link"
          >
            <span className="wa-float-bubble-head">
              <span className="wa-float-bubble-dot" aria-hidden="true" />
              <BrandName variant="compact" />
            </span>
            <span className="wa-float-bubble-msg">
              Hi! Need Class X tuition? Reply in minutes during centre hours.
            </span>
            <span className="wa-float-bubble-cta">Tap to chat on WhatsApp →</span>
          </a>
        </div>
      )}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Open WhatsApp chat"
      >
        <span className="wa-float-pulse" aria-hidden="true" />
        <span className="wa-float-pulse wa-float-pulse-2" aria-hidden="true" />
        <span className="wa-float-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
      </a>
    </div>
  )
}
