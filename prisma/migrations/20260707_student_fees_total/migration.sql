-- Add total fee field for student fee tracking
ALTER TABLE "Student" ADD COLUMN IF NOT EXISTS "feesTotal" DOUBLE PRECISION;
