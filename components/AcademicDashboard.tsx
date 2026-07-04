'use client'

const metrics = [
  { num: '01', label: 'Weekly Tests', status: 'Active cycle' },
  { num: '02', label: 'Chapter Tracking', status: 'Syllabus mapped' },
  { num: '03', label: 'Parent Updates', status: 'Monthly reports' },
  { num: '04', label: 'Board Revision', status: 'Exam-focused' },
]

const reports = [
  {
    ref: 'Report · Class X',
    subject: 'Mathematics',
    before: '54%',
    final: '86%',
    gain: '+32%',
  },
  {
    ref: 'Report · Class X',
    subject: 'Science',
    before: '61%',
    final: '88%',
    gain: '+27%',
  },
  {
    ref: 'Report · Class XII',
    subject: 'Physics',
    before: '48%',
    final: '79%',
    gain: '+31%',
  },
]

export default function AcademicDashboard() {
  return (
    <div className="academic-dashboard-wrap">
      <div className="academic-dashboard glass-panel">
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <span className="dashboard-pulse" aria-hidden="true" />
            <div>
              <div className="dashboard-title">Academic Progress</div>
              <div className="dashboard-sub">Christ Study Centre · Live system</div>
            </div>
          </div>
          <span className="dashboard-badge">2026–27</span>
        </div>

        <div className="dashboard-metrics">
          {metrics.map((m) => (
            <div key={m.num} className="dashboard-metric">
              <span className="dashboard-metric-num">{m.num}</span>
              <span className="dashboard-metric-label">{m.label}</span>
              <span className="dashboard-metric-status">{m.status}</span>
            </div>
          ))}
        </div>

        <div className="dashboard-table-wrap">
          <div className="dashboard-table-label">Improvement reports · anonymised</div>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Subject</th>
                <th>Before</th>
                <th>Final</th>
                <th>Gain</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={`${r.ref}-${r.subject}`}>
                  <td>{r.ref}</td>
                  <td>{r.subject}</td>
                  <td>{r.before}</td>
                  <td className="dashboard-final">{r.final}</td>
                  <td className="dashboard-gain">{r.gain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="dashboard-glow dashboard-glow-1" aria-hidden="true" />
      <div className="dashboard-glow dashboard-glow-2" aria-hidden="true" />
    </div>
  )
}
