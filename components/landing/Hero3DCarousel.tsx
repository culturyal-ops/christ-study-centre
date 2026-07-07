'use client'

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { PARENT_REVIEWS, type ParentReview } from '@/lib/reviews'
import ReviewCarouselArrow from '@/components/landing/ReviewCarouselArrow'

const REVIEW_COUNT = PARENT_REVIEWS.length

type CarouselLayout = {
  cardW: number
  cardH: number
  spread: number
  rotateY: number
  sideScale: number
  sideOpacity: number
}

function layoutForWidth(width: number): CarouselLayout {
  const w = Math.max(260, width)

  if (w >= 960) {
    const cardW = Math.min(Math.round(w * 0.84), 372)
    return {
      cardW,
      cardH: Math.round(cardW * 1.14),
      spread: Math.round(cardW * 0.56),
      rotateY: 24,
      sideScale: 0.84,
      sideOpacity: 0.58,
    }
  }

  if (w >= 640) {
    const cardW = Math.min(Math.round(w * 0.8), 320)
    return {
      cardW,
      cardH: Math.round(cardW * 1.16),
      spread: Math.round(cardW * 0.5),
      rotateY: 18,
      sideScale: 0.86,
      sideOpacity: 0.62,
    }
  }

  const cardW = Math.min(Math.round(w * 0.78), 292)
  return {
    cardW,
    cardH: Math.round(cardW * 1.18),
    spread: Math.round(cardW * 0.46),
    rotateY: 12,
    sideScale: 0.88,
    sideOpacity: 0.65,
  }
}

function wrappedOffset(index: number, center: number) {
  let offset = index - center
  if (offset > REVIEW_COUNT / 2) offset -= REVIEW_COUNT
  if (offset < -REVIEW_COUNT / 2) offset += REVIEW_COUNT
  return offset
}

function computeCardStyle(offset: number, layout: CarouselLayout) {
  const abs = Math.abs(offset)

  if (abs > 1.05) {
    return {
      transform: 'translate(-50%, -50%) translate3d(0, 0, -120px) scale(0.75)',
      opacity: 0,
      zIndex: 0,
      rotateY: 0,
      visible: false,
      isSide: false,
      isCenter: false,
    }
  }

  const clamped = Math.max(-1, Math.min(1, offset))
  const absClamped = Math.abs(clamped)
  const rotateY = clamped * -layout.rotateY
  const scale = 1 - absClamped * (1 - layout.sideScale)
  const opacity = 1 - absClamped * (1 - layout.sideOpacity)
  const translateX = clamped * layout.spread
  const translateZ = (1 - absClamped) * 84

  return {
    transform: `translate(-50%, -50%) translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: Math.round(100 - absClamped * 12),
    rotateY,
    visible: true,
    isSide: absClamped >= 0.45,
    isCenter: absClamped < 0.32,
  }
}

function Stars({ count }: { count: number }) {
  return (
    <div className="csc-hero-3d__stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? 'is-filled' : undefined}>
          ★
        </span>
      ))}
    </div>
  )
}

type ReviewCardProps = {
  review: ParentReview
  cardW: number
  cardH: number
  slotRef: (el: HTMLDivElement | null) => void
}

const ReviewCard = memo(function ReviewCard({
  review,
  cardW,
  cardH,
  slotRef,
}: ReviewCardProps) {
  return (
    <div
      ref={slotRef}
      className="csc-hero-3d__card-slot"
      style={{ width: cardW, height: cardH }}
    >
      <blockquote className="csc-hero-3d__card csc-hero-3d__review">
        <span className="csc-hero-3d__mark" aria-hidden="true">
          &ldquo;
        </span>
        <Stars count={review.rating} />
        <p className="csc-hero-3d__quote">{review.quote}</p>
        <div className="csc-hero-3d__foot">
          <cite className="csc-hero-3d__name">{review.name}</cite>
          <span className="csc-hero-3d__detail">{review.detail}</span>
        </div>
      </blockquote>
    </div>
  )
})

export default function Hero3DCarousel() {
  const rootRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const slotRefs = useRef<(HTMLDivElement | null)[]>([])

  const [layout, setLayout] = useState(() => layoutForWidth(960))

  const positionRef = useRef(0)
  const tiltRef = useRef(0)
  const targetTiltRef = useRef(0)
  const velocityRef = useRef(0)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef(0)
  const dragStartPositionRef = useRef(0)
  const lastInteractionRef = useRef(Date.now())
  const animationFrameRef = useRef<number | null>(null)
  const reducedMotionRef = useRef(false)
  const pointerFineRef = useRef(false)
  const layoutRef = useRef(layout)

  layoutRef.current = layout

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const sync = () => setLayout(layoutForWidth(node.clientWidth))
    sync()

    const ro = new ResizeObserver(sync)
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  const applyCardStyles = useCallback(() => {
    const pos = positionRef.current
    const currentLayout = layoutRef.current

    PARENT_REVIEWS.forEach((_, index) => {
      const slot = slotRefs.current[index]
      if (!slot) return

      const offset = wrappedOffset(index, pos)
      const { transform, opacity, zIndex, rotateY, visible, isSide, isCenter } =
        computeCardStyle(offset, currentLayout)

      slot.style.transform = transform
      slot.style.opacity = String(opacity)
      slot.style.zIndex = String(zIndex)
      slot.style.visibility = visible ? 'visible' : 'hidden'
      slot.style.pointerEvents = isCenter ? 'auto' : 'none'
      slot.style.setProperty('--card-yaw', String(rotateY))

      const card = slot.querySelector<HTMLElement>('.csc-hero-3d__card')
      if (card) {
        card.dataset.active = isCenter ? 'true' : 'false'
        card.dataset.side = isSide ? 'true' : 'false'
      }
    })
  }, [])

  useEffect(() => {
    applyCardStyles()
  }, [layout, applyCardStyles])

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    pointerFineRef.current = window.matchMedia('(pointer: fine)').matches

    const handleMouseMove = (e: MouseEvent) => {
      if (!viewportRef.current || isDraggingRef.current || !pointerFineRef.current) return

      lastInteractionRef.current = Date.now()
      const rect = viewportRef.current.getBoundingClientRect()
      const normalizedY = (e.clientY - rect.top) / rect.height - 0.5
      targetTiltRef.current = -normalizedY * 10
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current && !reducedMotionRef.current) {
        if (Math.abs(velocityRef.current) > 0.001) {
          positionRef.current += velocityRef.current
          velocityRef.current *= 0.9
        } else if (Date.now() - lastInteractionRef.current > 3200) {
          positionRef.current += 0.0025
        } else {
          const nearest = Math.round(positionRef.current)
          positionRef.current += (nearest - positionRef.current) * 0.12
        }
      }

      tiltRef.current += (targetTiltRef.current - tiltRef.current) * 0.1

      if (stageRef.current) {
        stageRef.current.style.transform = `rotateX(${tiltRef.current}deg)`
      }

      applyCardStyles()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    applyCardStyles()
    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [applyCardStyles])

  const setDragging = useCallback((dragging: boolean) => {
    isDraggingRef.current = dragging
    slotRefs.current.forEach((slot) => {
      slot?.classList.toggle('is-dragging', dragging)
    })
  }, [])

  const handleDragStart = useCallback(
    (clientX: number) => {
      lastInteractionRef.current = Date.now()
      setDragging(true)
      velocityRef.current = 0
      dragStartRef.current = clientX
      dragStartPositionRef.current = positionRef.current
    },
    [setDragging]
  )

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return
    lastInteractionRef.current = Date.now()

    const deltaX = clientX - dragStartRef.current
    const next = dragStartPositionRef.current - deltaX * 0.0045
    velocityRef.current = next - positionRef.current
    positionRef.current = next
  }, [])

  const handleDragEnd = useCallback(() => {
    setDragging(false)
    lastInteractionRef.current = Date.now()
  }, [setDragging])

  const goStep = useCallback((direction: 1 | -1) => {
    lastInteractionRef.current = Date.now()
    velocityRef.current = 0
    positionRef.current = Math.round(positionRef.current) + direction
  }, [])

  const viewportH = layout.cardH + 28

  return (
    <div
      ref={rootRef}
      className="csc-hero-3d"
      data-hero-3d
      aria-label="Parent reviews carousel"
    >
      <p className="csc-hero-3d__hint">What parents say · drag or use arrows</p>

      <div
        ref={viewportRef}
        className="csc-hero-3d__viewport"
        style={{ height: viewportH }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div ref={stageRef} className="csc-hero-3d__stage">
          {PARENT_REVIEWS.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              cardW={layout.cardW}
              cardH={layout.cardH}
              slotRef={(el) => {
                slotRefs.current[index] = el
              }}
            />
          ))}
        </div>
      </div>

      <div className="csc-hero-3d__nav-bar">
        <ReviewCarouselArrow
          direction="prev"
          label="Previous review"
          onClick={() => goStep(-1)}
        />
        <ReviewCarouselArrow
          direction="next"
          label="Next review"
          onClick={() => goStep(1)}
        />
      </div>
    </div>
  )
}
