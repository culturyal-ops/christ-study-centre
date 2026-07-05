/** Public site copy — single source for centre hours */
export const CENTRE_HOURS = {
  days: 'Monday to Saturday',
  daysShort: 'Mon to Sat',
  range: '5:30 AM to 8:30 PM',
  rangeEnDash: '5:30 AM – 8:30 PM',
  closed: 'Sunday: Closed',
} as const

export const CENTRE_HOURS_LINE = `${CENTRE_HOURS.daysShort}, ${CENTRE_HOURS.range}`
export const CENTRE_HOURS_FOOTER = `Pala, Kerala · ${CENTRE_HOURS_LINE}`
export const CENTRE_HOURS_CONTACT =
  `${CENTRE_HOURS.days}: ${CENTRE_HOURS.range.replace(' to ', ' – ')}. ${CENTRE_HOURS.closed}`

/** Owner WhatsApp — international format, no + (matches footer / contact links) */
export const OWNER_WHATSAPP = '919747110790'

export function ownerWhatsAppUrl(text: string) {
  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`
}
