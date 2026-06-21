import { PrismaClient, Board, AttendanceStatus, PaymentStatus } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import bcryptjs from 'bcryptjs'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaNeon(pool as any)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'admin123'
  const hashedAdminPassword = await bcryptjs.hash(adminPassword, 10)

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: hashedAdminPassword,
      role: 'ADMIN',
    },
  })
  console.log('✓ Admin user created')

  // Create subjects
  const subjects = await Promise.all([
    prisma.subject.upsert({
      where: { name: 'Mathematics' },
      update: {},
      create: { name: 'Mathematics' },
    }),
    prisma.subject.upsert({
      where: { name: 'Physics' },
      update: {},
      create: { name: 'Physics' },
    }),
    prisma.subject.upsert({
      where: { name: 'Chemistry' },
      update: {},
      create: { name: 'Chemistry' },
    }),
    prisma.subject.upsert({
      where: { name: 'Biology' },
      update: {},
      create: { name: 'Biology' },
    }),
    prisma.subject.upsert({
      where: { name: 'Computer Science' },
      update: {},
      create: { name: 'Computer Science' },
    }),
    prisma.subject.upsert({
      where: { name: 'Accountancy' },
      update: {},
      create: { name: 'Accountancy' },
    }),
    prisma.subject.upsert({
      where: { name: 'English' },
      update: {},
      create: { name: 'English' },
    }),
    prisma.subject.upsert({
      where: { name: 'Malayalam' },
      update: {},
      create: { name: 'Malayalam' },
    }),
    prisma.subject.upsert({
      where: { name: 'Social Studies' },
      update: {},
      create: { name: 'Social Studies' },
    }),
  ])
  console.log('✓ Subjects created')

  // Create sample students
  const studentPassword = await bcryptjs.hash('student123', 10)

  const studentsData = [
    {
      username: 'CSC2024-001',
      fullName: 'Rahul Mathew',
      grade: '6',
      board: Board.CBSE,
      guardianName: 'Mathew George',
      guardianPhone: '9876543210',
      subjects: ['Mathematics', 'English', 'Social Studies'],
    },
    {
      username: 'CSC2024-002',
      fullName: 'Priya Thomas',
      grade: '6',
      board: Board.CBSE,
      guardianName: 'Thomas Joseph',
      guardianPhone: '9876543211',
      subjects: ['Mathematics', 'English', 'Malayalam'],
    },
    {
      username: 'CSC2024-003',
      fullName: 'Anu Varghese',
      grade: '9',
      board: Board.ICSE,
      guardianName: 'Varghese Philip',
      guardianPhone: '9876543212',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
    },
    {
      username: 'CSC2024-004',
      fullName: 'Arjun Kumar',
      grade: '9',
      board: Board.CBSE,
      guardianName: 'Kumar Nair',
      guardianPhone: '9876543213',
      subjects: ['Mathematics', 'Biology', 'Social Studies'],
    },
    {
      username: 'CSC2024-005',
      fullName: 'Sneha Paul',
      grade: 'Plus 1',
      board: Board.SCERT,
      guardianName: 'Paul Samuel',
      guardianPhone: '9876543214',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    },
    {
      username: 'CSC2024-006',
      fullName: 'Kiran Menon',
      grade: 'Plus 1',
      board: Board.CBSE,
      guardianName: 'Menon Krishnan',
      guardianPhone: '9876543215',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    },
    {
      username: 'CSC2024-007',
      fullName: 'Meera John',
      grade: 'Plus 2',
      board: Board.CBSE,
      guardianName: 'John Mathew',
      guardianPhone: '9876543216',
      subjects: ['Accountancy', 'English', 'Mathematics'],
    },
    {
      username: 'CSC2024-008',
      fullName: 'Aditya Raj',
      grade: 'Plus 2',
      board: Board.SCERT,
      guardianName: 'Raj Kumar',
      guardianPhone: '9876543217',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    },
  ]

  const students = []
  for (const data of studentsData) {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        passwordHash: studentPassword,
        role: 'STUDENT',
      },
    })

    const student = await prisma.student.create({
      data: {
        userId: user.id,
        fullName: data.fullName,
        grade: data.grade,
        board: data.board,
        guardianName: data.guardianName,
        guardianPhone: data.guardianPhone,
        enrolledSubjects: {
          connect: subjects
            .filter((s) => data.subjects.includes(s.name))
            .map((s) => ({ id: s.id })),
        },
      },
    })
    students.push(student)
  }
  console.log('✓ Students created')

  // Create class sessions for the last 2 weeks
  const today = new Date()
  const sessions = []

  for (let i = 14; i >= 0; i--) {
    const sessionDate = new Date(today)
    sessionDate.setDate(today.getDate() - i)

    // Skip Sundays
    if (sessionDate.getDay() === 0) continue

    // Create 2-3 sessions per day for different grades
    const sessionsPerDay = [
      { subjectName: 'Mathematics', grade: '9' },
      { subjectName: 'Physics', grade: 'Plus 1' },
      { subjectName: 'English', grade: '6' },
    ]

    for (const sessionData of sessionsPerDay) {
      const subject = subjects.find((s) => s.name === sessionData.subjectName)
      if (!subject) continue

      const session = await prisma.classSession.create({
        data: {
          subjectId: subject.id,
          date: sessionDate,
          grade: sessionData.grade,
        },
      })
      sessions.push(session)

      // Mark attendance for enrolled students
      const enrolledStudents = students.filter((s) => s.grade === sessionData.grade)
      for (const student of enrolledStudents) {
        const randomStatus = Math.random()
        let status: AttendanceStatus = AttendanceStatus.PRESENT
        if (randomStatus < 0.1) status = AttendanceStatus.ABSENT
        else if (randomStatus < 0.15) status = AttendanceStatus.LATE

        await prisma.attendanceRecord.create({
          data: {
            studentId: student.id,
            sessionId: session.id,
            status,
          },
        })
      }
    }
  }
  console.log('✓ Class sessions and attendance created')

  // Create exams
  const exam1 = await prisma.exam.create({
    data: {
      name: 'Monthly Test - May',
      subjectId: subjects.find((s) => s.name === 'Mathematics')!.id,
      grade: '9',
      date: new Date(2024, 4, 15),
      maxMarks: 100,
    },
  })

  const exam2 = await prisma.exam.create({
    data: {
      name: 'Unit Test 2',
      subjectId: subjects.find((s) => s.name === 'Physics')!.id,
      grade: 'Plus 1',
      date: new Date(2024, 5, 10),
      maxMarks: 50,
    },
  })
  console.log('✓ Exams created')

  // Create mark entries
  for (const student of students.filter((s) => s.grade === '9')) {
    await prisma.markEntry.create({
      data: {
        studentId: student.id,
        examId: exam1.id,
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        remarks: 'Good performance',
      },
    })
  }

  for (const student of students.filter((s) => s.grade === 'Plus 1')) {
    await prisma.markEntry.create({
      data: {
        studentId: student.id,
        examId: exam2.id,
        score: Math.floor(Math.random() * 15) + 35, // 35-50
      },
    })
  }
  console.log('✓ Mark entries created')

  // Create fee plans and payments
  for (const student of students) {
    // Term 1 fee - paid
    const feePlan1 = await prisma.feePlan.create({
      data: {
        studentId: student.id,
        amount: 5000,
        dueDate: new Date(2024, 3, 1),
        description: 'Term 1 Tuition Fee',
        status: PaymentStatus.PAID,
      },
    })

    await prisma.payment.create({
      data: {
        studentId: student.id,
        feePlanId: feePlan1.id,
        amountPaid: 5000,
        method: 'UPI',
        paidOn: new Date(2024, 3, 5),
      },
    })

    // Term 2 fee - some paid, some pending
    const isPaid = Math.random() > 0.4
    await prisma.feePlan.create({
      data: {
        studentId: student.id,
        amount: 5000,
        dueDate: new Date(2024, 6, 1),
        description: 'Term 2 Tuition Fee',
        status: isPaid ? PaymentStatus.PAID : PaymentStatus.PENDING,
      },
    })
  }
  console.log('✓ Fee plans and payments created')

  // Create timetable for Grade 9
  const grade9Timetable = [
    { day: 1, start: '16:00', end: '17:00', subject: 'Mathematics', teacher: 'Mr. Rajan' },
    { day: 1, start: '17:00', end: '18:00', subject: 'Physics', teacher: 'Ms. Lakshmi' },
    { day: 2, start: '16:00', end: '17:00', subject: 'Chemistry', teacher: 'Mr. Thomas' },
    { day: 2, start: '17:00', end: '18:00', subject: 'English', teacher: 'Ms. Mary' },
    { day: 3, start: '16:00', end: '17:00', subject: 'Mathematics', teacher: 'Mr. Rajan' },
    { day: 4, start: '16:00', end: '17:00', subject: 'Biology', teacher: 'Ms. Sheela' },
    { day: 4, start: '17:00', end: '18:00', subject: 'Social Studies', teacher: 'Mr. Kumar' },
    { day: 5, start: '16:00', end: '17:00', subject: 'Physics', teacher: 'Ms. Lakshmi' },
    { day: 6, start: '16:00', end: '17:00', subject: 'Chemistry', teacher: 'Mr. Thomas' },
  ]

  for (const slot of grade9Timetable) {
    const subject = subjects.find((s) => s.name === slot.subject)
    if (subject) {
      await prisma.timetableSlot.create({
        data: {
          grade: '9',
          dayOfWeek: slot.day,
          startTime: slot.start,
          endTime: slot.end,
          subjectId: subject.id,
          teacherName: slot.teacher,
        },
      })
    }
  }

  // Create timetable for Plus 1
  const plus1Timetable = [
    { day: 1, start: '16:00', end: '17:00', subject: 'Physics', teacher: 'Ms. Lakshmi' },
    { day: 1, start: '17:00', end: '18:00', subject: 'Chemistry', teacher: 'Mr. Thomas' },
    { day: 2, start: '16:00', end: '17:00', subject: 'Mathematics', teacher: 'Mr. Rajan' },
    { day: 3, start: '16:00', end: '17:00', subject: 'Computer Science', teacher: 'Mr. Anil' },
    { day: 3, start: '17:00', end: '18:00', subject: 'Physics', teacher: 'Ms. Lakshmi' },
    { day: 4, start: '16:00', end: '17:00', subject: 'Biology', teacher: 'Ms. Sheela' },
    { day: 5, start: '16:00', end: '17:00', subject: 'Mathematics', teacher: 'Mr. Rajan' },
    { day: 5, start: '17:00', end: '18:00', subject: 'Chemistry', teacher: 'Mr. Thomas' },
    { day: 6, start: '16:00', end: '17:00', subject: 'Physics', teacher: 'Ms. Lakshmi' },
  ]

  for (const slot of plus1Timetable) {
    const subject = subjects.find((s) => s.name === slot.subject)
    if (subject) {
      await prisma.timetableSlot.create({
        data: {
          grade: 'Plus 1',
          dayOfWeek: slot.day,
          startTime: slot.start,
          endTime: slot.end,
          subjectId: subject.id,
          teacherName: slot.teacher,
        },
      })
    }
  }
  console.log('✓ Timetable created')

  console.log('✅ Seeding completed successfully!')
  console.log(`\n📝 Login credentials:`)
  console.log(`   Admin: username='admin', password='${adminPassword}'`)
  console.log(`   Student: username='CSC2024-001' (or any student), password='student123'`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
