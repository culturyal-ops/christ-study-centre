'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartBatch } from '@/components/register/types'

type Props = {
  data: ChartBatch[]
}

export default function RegisterChart({ data }: Props) {
  if (data.length === 0) {
    return <div className="register-chart register-chart--empty">No batch data yet</div>
  }

  return (
    <div className="register-chart">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
          <XAxis
            dataKey="name"
            tick={{ fill: 'rgba(248,250,252,0.65)', fontSize: 11 }}
            angle={-35}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: 'rgba(248,250,252,0.65)', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              background: '#111827',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 10,
              color: '#f8fafc',
            }}
          />
          <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
