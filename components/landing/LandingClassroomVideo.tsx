'use client'

import { useEffect, useRef } from 'react'

const CLASSROOM_VIDEO = '/videos/classroom-hero.mp4'

export default function LandingClassroomVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('webkit-playsinline', 'true')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      return
    }

    const play = () => {
      void video.play().catch(() => {})
    }

    play()
    video.addEventListener('loadeddata', play)
    video.addEventListener('canplay', play)

    const onVisible = () => {
      if (document.visibilityState === 'visible') play()
    }
    document.addEventListener('visibilitychange', onVisible)

    const unlock = () => {
      play()
      section?.removeEventListener('pointerdown', unlock)
      window.removeEventListener('touchstart', unlock)
    }
    section?.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('touchstart', unlock, { once: true, passive: true })

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) play()
            },
            { threshold: 0.2 }
          )
        : null

    if (observer && section) observer.observe(section)

    return () => {
      video.removeEventListener('loadeddata', play)
      video.removeEventListener('canplay', play)
      document.removeEventListener('visibilitychange', onVisible)
      section?.removeEventListener('pointerdown', unlock)
      window.removeEventListener('touchstart', unlock)
      observer?.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="csc-landing__video-section" aria-labelledby="classroom-video-title">
      <div className="csc-landing__wrap">
        <div className="csc-landing__video-copy">
          <h2 id="classroom-video-title" className="csc-landing__video-title">
            Step inside our classrooms
          </h2>
          <p className="csc-landing__video-lede">
            Small batches, focused attention, real results — see where the work happens.
          </p>
        </div>

        <div className="csc-landing__video-frame">
          <video
            ref={videoRef}
            className="csc-landing__video-player"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Classroom tour at Christ Study Centre"
          >
            <source src={CLASSROOM_VIDEO} type="video/mp4" />
          </video>
          <div className="csc-landing__video-shade" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
