export const BATCH_GROUPS = [
  {
    title: 'CBSE',
    batches: [
      '12 CBSE', '11 CBSE', '10 CBSE', '9 CBSE', '8 CBSE', '7 CBSE',
      '6 CBSE', '5 CBSE', '4 CBSE', '3 CBSE', '2 CBSE', '1 CBSE',
    ],
  },
  {
    title: 'ICSE',
    batches: [
      '12 ICSE', '11 ICSE', '10 ICSE', '9 ICSE', '8 ICSE', '7 ICSE',
      '6 ICSE', '5 ICSE', '4 ICSE', '3 ICSE', '2 ICSE', '1 ICSE',
    ],
  },
  {
    title: 'STATE',
    batches: [
      '12 State', '11 State', '10 State', '9 State', '8 State', '7 State',
      '6 State', '5 State', '4 State', '3 State', '2 State', '1 State',
    ],
  },
] as const

export const ALL_BATCH_NAMES = BATCH_GROUPS.flatMap((g) => g.batches)

export const DEFAULT_SUBJECTS = [
  'Physics',
  'Chemistry',
  'Maths',
  'Biology',
  'Computer Science',
  'Accountancy',
  'Business',
  'Economics',
  'History',
  'Geography',
  'Social',
  'English',
  'Malayalam',
  'Hindi',
  'All Subjects',
] as const

/** Display label for batch group titles in public UI */
export function batchGroupLabel(title: (typeof BATCH_GROUPS)[number]['title']) {
  if (title === 'STATE') return 'State Syllabus'
  return title
}

export const BATCH_TIME_OPTIONS = [
  { id: 'morning', label: 'Morning', detail: '5:30 AM – 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon', detail: '12:00 PM – 4:00 PM' },
  { id: 'evening', label: 'Evening', detail: '4:00 PM – 8:30 PM' },
] as const

export type BatchTimeOption = (typeof BATCH_TIME_OPTIONS)[number]['id']

export type RegisterView =
  | 'home'
  | 'fees'
  | 'pending'
  | 'recycle'
  | `batch:${string}`
