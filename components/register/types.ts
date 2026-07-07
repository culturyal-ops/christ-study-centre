import type { PaymentStatus } from '@prisma/client'

export type RegisterMark = {
  id: string
  exam: string
  subject: string
  score: string
  date: string | Date
}

export type RegisterDocument = {
  id: string
  title: string
  dataUrl: string
  uploadedAt: string | Date
}

export type RegisterStudent = {
  id: string
  rollNo: number
  fullName: string
  schoolName: string | null
  subjectsText: string | null
  subjectCount: number | null
  contact: string | null
  feesStatus: PaymentStatus
  feesTotal: number | null
  feesAmountPaid: number | null
  feesRemaining: number | null
  feesDatePaid: string | Date | null
  deletedFromBatch?: string | null
  batch: { name: string } | null
  user?: { id: string; username: string } | null
  registerMarks: RegisterMark[]
  registerDocuments: RegisterDocument[]
}

export type BatchInfo = {
  id: string
  name: string
  groupTitle: string
  studentCount: number
}

export type ChartBatch = {
  name: string
  count: number
}

export type Bootstrap = {
  batches: BatchInfo[]
  stats: {
    totalStudents: number
    pendingCount: number
    recycleCount: number
    feesReceived: number
    feesPending: number
    totalSubjects: number
  }
  chartData: ChartBatch[]
  subjects: string[]
}

export type PendingAdmissionRow = {
  id: string
  name: string
  schoolName: string
  subjects: string
  subjectCount: number | null
  contact: string
  batchName: string
  submittedAt: string | Date
}

export type StudentForm = {
  batchName: string
  rollNo: number
  fullName: string
  schoolName: string
  subjectsText: string
  subjectCount: string
  contact: string
  username: string
  password: string
  feesTotal: string
  feesAmountPaid: string
  feesDatePaid: string
}
