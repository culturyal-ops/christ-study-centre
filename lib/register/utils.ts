import { Board, PaymentStatus } from '@prisma/client'
import { ALL_BATCH_NAMES } from '@/lib/register/constants'
import type { RegisterView } from '@/lib/register/constants'

export function parseBatchName(batchName: string): { grade: string; board: Board } {
  const parts = batchName.trim().split(/\s+/)
  const grade = parts[0] ?? '1'
  const boardToken = (parts[1] ?? 'CBSE').toUpperCase()

  let board: Board = 'CBSE'
  if (boardToken === 'ICSE') board = 'ICSE'
  else if (boardToken === 'STATE') board = 'SCERT'

  return { grade, board }
}

export function formatFeesStatus(status: string): string {
  switch (status) {
    case 'PAID':
      return 'Paid'
    case 'PARTIAL':
      return 'Partial'
    case 'OVERDUE':
      return 'Overdue'
    default:
      return 'Pending'
  }
}

export function feesStatusClass(status: string): string {
  switch (status) {
    case 'PAID':
      return 'reg-fees--paid'
    case 'PARTIAL':
      return 'reg-fees--partial'
    case 'OVERDUE':
      return 'reg-fees--overdue'
    default:
      return 'reg-fees--pending'
  }
}

export function computeFeesRemaining(
  total: number | null | undefined,
  paid: number | null | undefined
): number | null {
  if (total == null || Number.isNaN(total)) return null
  const paidAmount = paid ?? 0
  return Math.max(0, total - paidAmount)
}

export function deriveFeesStatus(
  total: number | null | undefined,
  paid: number | null | undefined
): PaymentStatus {
  if (total == null || total <= 0 || Number.isNaN(total)) {
    return (paid ?? 0) > 0 ? 'PARTIAL' : 'PENDING'
  }
  const paidAmount = paid ?? 0
  if (paidAmount >= total) return 'PAID'
  if (paidAmount <= 0) return 'PENDING'
  return 'PARTIAL'
}

export const MAX_DOCUMENT_BYTES = 2 * 1024 * 1024

/** Count subjects for a student — matches christ-register total subjects stat. */
export function countStudentSubjects(input: {
  subjectCount?: number | null
  subjectsText?: string | null
}): number {
  if (input.subjectCount != null && input.subjectCount > 0) return input.subjectCount
  const text = (input.subjectsText ?? '').trim()
  const paren = text.match(/^\((\d+)\)$/)
  if (paren) return Number(paren[1])
  if (!text) return 1
  const parts = text.split(',').map((s) => s.trim()).filter(Boolean)
  return parts.length || 1
}

export function resolveRegisterView(
  view?: string,
  batch?: string
): RegisterView | undefined {
  if (batch && ALL_BATCH_NAMES.includes(batch as (typeof ALL_BATCH_NAMES)[number])) {
    return `batch:${batch}`
  }
  if (!view) return undefined
  if (view === 'home' || view === 'fees' || view === 'pending' || view === 'recycle') {
    return view
  }
  if (view.startsWith('batch:')) return view as RegisterView
  if (ALL_BATCH_NAMES.includes(view as (typeof ALL_BATCH_NAMES)[number])) {
    return `batch:${view}`
  }
  return undefined
}
