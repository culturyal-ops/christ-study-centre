import ChatMockup from '@/components/ChatMockup'

export default function HeroVisual() {
  return (
    <div className="hero-visual hero-visual--chat whatsapp-mockup">
      <div className="hero-visual-glow" aria-hidden="true" />
      <div className="hero-chat-float">
        <ChatMockup />
      </div>
    </div>
  )
}
