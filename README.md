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
- **Neon** account (free cloud Postgres) — https://console.neon.tech

### Installation

1. **Clone and install dependencies:**
```bash
cd christ-study-centre
npm install
```

2. **Create Neon database (cloud — no local Postgres):**
   - Go to [console.neon.tech](https://console.neon.tech) → **New project**
   - Name it `christ-study-centre`
   - **Connection details** → copy the **Prisma** connection string

3. **Set up `.env`:**
```bash
DATABASE_URL="postgresql://...@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="http://localhost:3005"
NEXTAUTH_SECRET="your-long-random-secret"
ADMIN_SEED_PASSWORD="admin123"
```

4. **Push schema to Neon:**
```bash
npx prisma db push
```

5. **Seed batches, owner login, sample students:**
```bash
npx prisma db seed
```

6. **Run the dev server:**
```bash
npm run dev
```

7. **Open:**
   - Site: http://localhost:3005
   - Owner register: http://localhost:3005/admin/register (login: `owner` / `4511` after seed)

## Login Credentials

After seeding, use these credentials:

**Owner (full register):**
- Username: `owner`
- Password: `4511`

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
