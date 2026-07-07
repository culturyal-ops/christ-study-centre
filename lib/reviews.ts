export type ParentReview = {
  id: string
  quote: string
  name: string
  detail: string
  rating: number
}

export const PARENT_REVIEWS: ParentReview[] = [
  {
    id: 'weekly-tests',
    quote:
      'Weekly tests made a real difference. We know exactly where our son stands before school exams.',
    name: 'Anju Thomas',
    detail: 'Parent · Class 10 CBSE',
    rating: 5,
  },
  {
    id: 'monthly-reports',
    quote:
      'The monthly WhatsApp report sold us — attendance, marks and weak chapters in one message.',
    name: 'Raji Mathew',
    detail: 'Parent · Class 8 ICSE',
    rating: 5,
  },
  {
    id: 'improvement',
    quote:
      'My daughter went from struggling in Maths to scoring in the 80s within one term. Small batches help.',
    name: 'Sunny Joseph',
    detail: 'Parent · Plus Two SCERT',
    rating: 5,
  },
  {
    id: 'timetable',
    quote:
      'Fixed timetable from 5:30 AM batches works for our family. Same hour every day — a routine that sticks.',
    name: 'Deepa Nair',
    detail: 'Parent · Class 6 CBSE',
    rating: 5,
  },
  {
    id: 'teachers',
    quote:
      'Teachers know CBSE patterns and catch repeated mistakes. Corrections happen in class, not at home.',
    name: 'Manu Kurian',
    detail: 'Parent · Class 12 CBSE',
    rating: 5,
  },
  {
    id: 'contact',
    quote:
      'Walk in at Pala or WhatsApp — no call centre. That direct contact is rare and we appreciate it.',
    name: 'Leena Paul',
    detail: 'Parent · Class 9 ICSE',
    rating: 5,
  },
]
