export type CourseProgramme = {
  id: string
  title: string
  grades: string
  gradeOptions: string[]
  boards: string[]
  subjects: string[]
  features: string[]
}

export type SpecialProgramme = {
  id: string
  idx: string
  title: string
  desc: string
}

export const courseProgrammes: CourseProgramme[] = [
  {
    id: 'foundation',
    title: 'Foundation',
    grades: 'Grades III to V',
    gradeOptions: ['Grade III', 'Grade IV', 'Grade V'],
    boards: ['CBSE', 'ICSE', 'SCERT'],
    subjects: ['Mathematics', 'English', 'Malayalam', 'Social Studies', 'Science'],
    features: [
      'Core reading and reasoning fundamentals',
      'Activity-based learning',
      'Regular assessments with feedback',
      'Monthly parent updates',
    ],
  },
  {
    id: 'high-school',
    title: 'High School',
    grades: 'Grades VIII to X',
    gradeOptions: ['Grade VIII', 'Grade IX', 'Grade X'],
    boards: ['CBSE', 'ICSE', 'SCERT'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Malayalam'],
    features: [
      'Board exam-focused preparation',
      'Conceptual clarity over rote learning',
      'Mock exams with performance analysis',
      'Weekly doubt clearing',
    ],
  },
  {
    id: 'plus-one',
    title: 'Plus One',
    grades: 'Grade XI',
    gradeOptions: ['Grade XI (Plus One)'],
    boards: ['CBSE', 'SCERT'],
    subjects: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'Computer Science',
      'Accountancy',
    ],
    features: [
      'Stream-specific coaching',
      'Entrance exam orientation',
      'Regular practice tests',
      'Career counseling support',
    ],
  },
  {
    id: 'plus-two',
    title: 'Plus Two',
    grades: 'Grade XII',
    gradeOptions: ['Grade XII (Plus Two)'],
    boards: ['CBSE', 'SCERT'],
    subjects: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'Computer Science',
      'Accountancy',
    ],
    features: [
      'Board-exam intensive prep',
      'Previous year paper practice',
      'Intensive revision drills',
      'Entrance coaching integration',
    ],
  },
]

export const specialProgrammes: SpecialProgramme[] = [
  {
    id: 'one-on-one',
    idx: '01',
    title: 'One-on-One Tutoring',
    desc: 'Focused individual attention on specific subjects or chapters.',
  },
  {
    id: 'vacation',
    idx: '02',
    title: 'Vacation Batches',
    desc: 'Intensive revision during school holidays. Get ahead or catch up.',
  },
  {
    id: 'online',
    idx: '03',
    title: 'Online Sessions',
    desc: 'Live from home. Same teacher, same material, same rigour.',
  },
  {
    id: 'doubt',
    idx: '04',
    title: 'Doubt Clearing',
    desc: 'Dedicated sessions for specific problems or concepts in depth.',
  },
]
