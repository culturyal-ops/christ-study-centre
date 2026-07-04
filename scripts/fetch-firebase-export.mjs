/** Download live christ-register Firebase data → scripts/firebase-export.json */

const BASE = 'https://christ-register-default-rtdb.firebaseio.com'

function toArray(value) {
  if (value == null) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'object') return Object.values(value)
  return []
}

async function fetchJson(path) {
  const res = await fetch(`${BASE}/${path}.json`)
  if (!res.ok) throw new Error(`Firebase ${path}: ${res.status}`)
  return res.json()
}

const studentsData = (await fetchJson('studentsData')) ?? {}
const recycleBin = toArray(await fetchJson('recycleBin'))
const pendingAdmissions = toArray(await fetchJson('pendingAdmissions'))
const customSubjects = toArray(await fetchJson('customSubjects'))

const exportData = {
  studentsData,
  recycleBin,
  pendingAdmissions,
  customSubjects,
}

const studentCount = Object.values(studentsData).reduce(
  (n, arr) => n + toArray(arr).length,
  0
)

await import('node:fs/promises').then((fs) =>
  fs.writeFile(
    new URL('./firebase-export.json', import.meta.url),
    JSON.stringify(exportData, null, 2),
    'utf8'
  )
)

console.log(
  `Saved scripts/firebase-export.json — Students: ${studentCount}, Recycle: ${recycleBin.length}, Pending: ${pendingAdmissions.length}, Subjects: ${customSubjects.length}`
)
