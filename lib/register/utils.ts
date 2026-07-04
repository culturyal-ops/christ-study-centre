import { Board } from '@prisma/client'

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

export const MAX_DOCUMENT_BYTES = 2 * 1024 * 1024
