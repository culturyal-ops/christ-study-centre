# Christ Study Centre - Marketing Site + Admin/Student Portal

A full-stack web application for Christ Study Centre, a tuition center in Pala, Kerala, India. Features a public marketing site and authenticated admin/student portals with attendance tracking, marks management, fees tracking, and timetable management.

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript (strict mode)
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js v5 (Credentials provider)
- **UI:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts
- **Validation:** Zod + react-hook-form
- **Password Hashing:** bcrypt

## Features

### Public Site
- Home page with hero section and CTAs
- About page with mission/vision
- Courses listing by grade
- Contact page with form and location
- SEO-friendly, server-rendered pages

### Admin Portal (`/admin/*`)
- Dashboard with key metrics
- Student management (CRUD)
- Attendance marking interface
- Marks entry and exam management
- Fee tracking and payment recording
- Timetable builder

### Student Portal (`/student/*`)
- Personal dashboard with attendance %
- Attendance history with charts
- Marks view with trends
- Fee status and payment history
- Weekly timetable view

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or use local Prisma Postgres)

### Installation

1. **Clone and install dependencies:**
```bash
cd christ-study-centre
npm install
```

2. **Set up environment variables:**
Copy `.env.example` to `.env` and update values:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/christstudycentre"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this"
ADMIN_SEED_PASSWORD="admin123"
```

3. **Start local database (if using Prisma Postgres):**
```bash
npx prisma dev
```

4. **Push schema to database:**
```bash
npx prisma db push
```

5. **Seed the database:**
```bash
npx prisma db seed
```

6. **Generate Prisma Client:**
```bash
npx prisma generate
```

7. **Run the development server:**
```bash
npm run dev
```

8. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000)

## Login Credentials

After seeding, use these credentials:

**Admin:**
- Username: `admin`
- Password: `admin123` (or value from `ADMIN_SEED_PASSWORD`)

**Students:**
- Username: `CSC2024-001` through `CSC2024-008`
- Password: `student123`

## Project Structure

```
christ-study-centre/
├── app/                      # Next.js app directory
│   ├── (public)/            # Public routes
│   │   ├── page.tsx         # Home page
│   │   ├── about/           
│   │   ├── courses/         
│   │   └── contact/         
│   ├── login/               # Login page
│   ├── admin/               # Admin portal
│   └── student/             # Student portal
├── components/              # React components
│   └── ui/                  # shadcn/ui components
├── lib/                     # Utilities
│   └── prisma.ts           # Prisma client instance
├── prisma/                  # Database
│   ├── schema.prisma       # Data model
│   └── seed.ts             # Seed script
├── auth.ts                  # NextAuth configuration
└── middleware.ts            # Route protection
```

## Data Model

- **User:** Authentication (username/password)
- **Student:** Profile, enrolled subjects, guardian info
- **Subject:** Course subjects
- **ClassSession:** Individual class instances
- **AttendanceRecord:** Attendance per student per session
- **Exam:** Test/exam definitions
- **MarkEntry:** Student scores per exam
- **FeePlan:** Fee schedules
- **Payment:** Payment records
- **TimetableSlot:** Weekly schedule

## Development Workflow

1. Make schema changes in `prisma/schema.prisma`
2. Run `npx prisma db push` to apply changes
3. Run `npx prisma generate` to update Prisma Client
4. Update seed script if needed
5. Test changes locally

## Deployment

### Vercel + Managed Postgres

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` (from Neon/Supabase/Railway)
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
4. Deploy

### Database Setup

Use Neon, Supabase, or Railway for managed Postgres:
- Create database
- Copy connection string to `DATABASE_URL`
- Run `npx prisma db push` to create tables
- Run `npx prisma db seed` to add initial data

## Security Notes

- No public registration - admin creates all accounts
- Role-based access control via middleware
- Passwords hashed with bcrypt
- Session managed via JWT
- Input validation with Zod on all forms

## License

Proprietary - Christ Study Centre

---

**Contact:**
Christ Study Centre
52A, RV Road, Njondimakkal, Pala 686575
Kerala, India

Phone: +91 9747110790, +91 9188650790, +91 9847877507
