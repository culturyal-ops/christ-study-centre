-- =============================================================================
-- Christ Register: Firebase → PostgreSQL field mapping
-- =============================================================================
--
-- Firebase RTDB paths          →  Postgres tables
-- ─────────────────────────────────────────────────────────────────────────────
-- studentsData/{batchName}[]   →  Student (+ Batch via batchId)
-- recycleBin[]                 →  Student (deletedAt, deletedFromBatch set)
-- pendingAdmissions[]          →  PendingAdmission
-- customSubjects[]             →  Subject
--
-- Student object (Firebase)    →  Student column (Postgres)
-- ─────────────────────────────────────────────────────────────────────────────
-- id                           →  id                    (keep same string id)
-- no                           →  rollNo
-- name                         →  fullName
-- schoolName                   →  schoolName
-- subjects                     →  subjectsText
-- subjectCount                 →  subjectCount
-- contact                      →  contact
-- fees ("Pending"|"Paid"|...)  →  feesStatus (enum UPPERCASE)
-- feesAmountPaid               →  feesAmountPaid
-- feesRemaining                →  feesRemaining
-- feesDatePaid                 →  feesDatePaid
-- marks[].{exam,subject,score,date} → RegisterMark
-- documents[].{title,url,...}  →  RegisterDocument.dataUrl (url field)
--
-- Recycle extra fields:
-- deletedFrom                  →  deletedFromBatch
-- deletedAt                    →  deletedAt
--
-- Batch name "9 State"         →  grade='9', board='SCERT'
-- Batch name "12 CBSE"         →  grade='12', board='CBSE'
-- =============================================================================

-- Step 1: Clear previous register import (keeps User/admin accounts)
BEGIN;

DELETE FROM "RegisterDocument";
DELETE FROM "RegisterMark";
DELETE FROM "PendingAdmission";
DELETE FROM "_StudentSubjects";
DELETE FROM "AttendanceRecord" WHERE "studentId" IN (SELECT id FROM "Student");
DELETE FROM "MarkEntry" WHERE "studentId" IN (SELECT id FROM "Student");
DELETE FROM "Payment" WHERE "studentId" IN (SELECT id FROM "Student");
DELETE FROM "FeePlan" WHERE "studentId" IN (SELECT id FROM "Student");
DELETE FROM "Student";

COMMIT;

-- Step 2: Seed 36 batches (run once; safe to re-run with ON CONFLICT)
-- Generated from lib/register/constants.ts

INSERT INTO "Batch" ("id", "name", "groupTitle", "sortOrder", "createdAt") VALUES
  ('batch_001', '12 CBSE', 'CBSE', 0, NOW()),
  ('batch_002', '11 CBSE', 'CBSE', 1, NOW()),
  ('batch_003', '10 CBSE', 'CBSE', 2, NOW()),
  ('batch_004', '9 CBSE', 'CBSE', 3, NOW()),
  ('batch_005', '8 CBSE', 'CBSE', 4, NOW()),
  ('batch_006', '7 CBSE', 'CBSE', 5, NOW()),
  ('batch_007', '6 CBSE', 'CBSE', 6, NOW()),
  ('batch_008', '5 CBSE', 'CBSE', 7, NOW()),
  ('batch_009', '4 CBSE', 'CBSE', 8, NOW()),
  ('batch_010', '3 CBSE', 'CBSE', 9, NOW()),
  ('batch_011', '2 CBSE', 'CBSE', 10, NOW()),
  ('batch_012', '1 CBSE', 'CBSE', 11, NOW()),
  ('batch_013', '12 ICSE', 'ICSE', 12, NOW()),
  ('batch_014', '11 ICSE', 'ICSE', 13, NOW()),
  ('batch_015', '10 ICSE', 'ICSE', 14, NOW()),
  ('batch_016', '9 ICSE', 'ICSE', 15, NOW()),
  ('batch_017', '8 ICSE', 'ICSE', 16, NOW()),
  ('batch_018', '7 ICSE', 'ICSE', 17, NOW()),
  ('batch_019', '6 ICSE', 'ICSE', 18, NOW()),
  ('batch_020', '5 ICSE', 'ICSE', 19, NOW()),
  ('batch_021', '4 ICSE', 'ICSE', 20, NOW()),
  ('batch_022', '3 ICSE', 'ICSE', 21, NOW()),
  ('batch_023', '2 ICSE', 'ICSE', 22, NOW()),
  ('batch_024', '1 ICSE', 'ICSE', 23, NOW()),
  ('batch_025', '12 State', 'STATE', 24, NOW()),
  ('batch_026', '11 State', 'STATE', 25, NOW()),
  ('batch_027', '10 State', 'STATE', 26, NOW()),
  ('batch_028', '9 State', 'STATE', 27, NOW()),
  ('batch_029', '8 State', 'STATE', 28, NOW()),
  ('batch_030', '7 State', 'STATE', 29, NOW()),
  ('batch_031', '6 State', 'STATE', 30, NOW()),
  ('batch_032', '5 State', 'STATE', 31, NOW()),
  ('batch_033', '4 State', 'STATE', 32, NOW()),
  ('batch_034', '3 State', 'STATE', 33, NOW()),
  ('batch_035', '2 State', 'STATE', 34, NOW()),
  ('batch_036', '1 State', 'STATE', 35, NOW())
ON CONFLICT ("name") DO UPDATE SET
  "groupTitle" = EXCLUDED."groupTitle",
  "sortOrder" = EXCLUDED."sortOrder";

-- Step 3: Default subjects from christ-register
INSERT INTO "Subject" ("id", "name") VALUES
  ('sub_physics', 'Physics'),
  ('sub_chemistry', 'Chemistry'),
  ('sub_maths', 'Maths'),
  ('sub_biology', 'Biology'),
  ('sub_cs', 'Computer Science'),
  ('sub_accountancy', 'Accountancy'),
  ('sub_business', 'Business'),
  ('sub_economics', 'Economics'),
  ('sub_history', 'History'),
  ('sub_geography', 'Geography'),
  ('sub_social', 'Social'),
  ('sub_english', 'English'),
  ('sub_malayalam', 'Malayalam'),
  ('sub_hindi', 'Hindi'),
  ('sub_all', 'All Subjects')
ON CONFLICT ("name") DO NOTHING;

-- Step 4: Example student INSERT (replace with generated SQL from import script)
-- Run: npx ts-node scripts/firebase-import.ts --json firebase-export.json --sql-out prisma/sql/firebase-import-generated.sql

/*
INSERT INTO "Student" (
  "id", "batchId", "rollNo", "fullName", "schoolName", "subjectsText", "subjectCount",
  "grade", "board", "contact", "feesStatus", "feesAmountPaid", "feesRemaining", "feesDatePaid",
  "guardianPhone", "enrollmentDate"
) VALUES (
  'id1',
  (SELECT "id" FROM "Batch" WHERE "name" = '12 CBSE'),
  1,
  'Alan Bygy',
  NULL,
  'Physics, Chemistry, Maths',
  3,
  '12',
  'CBSE',
  '',
  'PENDING',
  NULL,
  NULL,
  NULL,
  '',
  NOW()
);
*/

-- Helper: resolve batch → grade + board (used by import script)
-- '12 CBSE'  → grade '12', board 'CBSE'
-- '9 State'  → grade '9',  board 'SCERT'
-- '10 ICSE'  → grade '10', board 'ICSE'
