import { delayAttr } from '@/lib/motion'

interface StripItem {
  num: string
  label: string
}

export default function InstitutionalStrip({ items }: { items: StripItem[] }) {
  return (
    <div className="institutional-strip">
      {items.map((item, i) => (
        <div
          key={item.num}
          className="institutional-item fly-card"
          data-scroll-reveal
          {...delayAttr(i)}
        >
          <span className="institutional-num">{item.num}</span>
          <span className="institutional-label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
