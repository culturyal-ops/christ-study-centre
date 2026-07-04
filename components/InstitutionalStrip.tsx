import { delayAttr } from '@/lib/motion'

interface StripItem {
  num: string
  label: string
}

export default function InstitutionalStrip({ items }: { items: StripItem[] }) {
  return (
    <div className="csc-strip">
      <div className="site-container csc-strip__inner">
        {items.map((item, i) => (
          <div
            key={item.num}
            className="csc-strip__item"
            data-scroll-reveal
            {...delayAttr(i)}
          >
            <span className="csc-strip__num">{item.num}</span>
            <span className="csc-strip__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
