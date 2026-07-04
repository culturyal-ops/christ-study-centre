-- Register portal schema (christ-register port)
-- Run: npx prisma db push   OR apply this against your Neon database

CREATE TABLE IF NOT EXISTS "Batch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groupTitle" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Batch_name_key" ON "Batch"("name");

ALTER TABLE "Student" ALTER COLUMN "userId" DROP NOT NULL;
ALTER TABLE "Student" ALTER COLUMN "guardianPhone" SET DEFAULT '';

ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "batchId" TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "rollNo" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "schoolName" TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "subjectsText" TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "subjectCount" INTEGER;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "contact" TEXT;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "feesStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "feesAmountPaid" DOUBLE PRECISION;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "feesRemaining" DOUBLE PRECISION;
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "feesDatePaid" TIMESTAMP(3);
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "deletedFromBatch" TEXT;

CREATE TABLE IF NOT EXISTS "RegisterMark" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RegisterMark_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "RegisterDocument" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dataUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RegisterDocument_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "PendingAdmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "subjects" TEXT NOT NULL,
    "subjectCount" INTEGER,
    "contact" TEXT NOT NULL,
    "batchName" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PendingAdmission_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Student" DROP CONSTRAINT IF EXISTS "Student_userId_fkey";
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Student" ADD CONSTRAINT "Student_batchId_fkey"
    FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "RegisterMark" ADD CONSTRAINT "RegisterMark_studentId_fkey"
    FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "RegisterDocument" ADD CONSTRAINT "RegisterDocument_studentId_fkey"
    FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
