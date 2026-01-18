import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

interface WeeklyChartProps {
  sessions: Array<{ date: string; duration: number }>
  checkIns: Array<{ date: Date; duration: number }>
}

export function WeeklyChart({ sessions, checkIns }: WeeklyChartProps) {
  const { t, i18n } = useTranslation()

  const data = useMemo(() => {
    const now = new Date()
    const days: Array<{ name: string; minutes: number; isToday: boolean }> = []

    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      const dateStr = date.toISOString().split('T')[0]

      // Sum meditation sessions for this day
      const sessionMinutes = sessions
        .filter(s => s.date.split('T')[0] === dateStr)
        .reduce((sum, s) => sum + s.duration, 0)

      // Sum check-ins for this day
      const checkInMinutes = checkIns
        .filter(c => new Date(c.date).toISOString().split('T')[0] === dateStr)
        .reduce((sum, c) => sum + c.duration, 0)

      const dayName = date.toLocaleDateString(i18n.language === 'vi' ? 'vi-VN' : 'en-US', {
        weekday: 'short'
      })

      days.push({
        name: dayName,
        minutes: sessionMinutes + checkInMinutes,
        isToday: i === 0
      })
    }

    return days
  }, [sessions, checkIns, i18n.language])

  const totalMinutes = data.reduce((sum, d) => sum + d.minutes, 0)
  const avgMinutes = Math.round(totalMinutes / 7)

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {t('dashboard.weeklyChart.title')}
        </h3>
        <div className="text-sm text-muted-foreground">
          {t('dashboard.weeklyChart.avg')}: <span className="font-medium text-primary">{avgMinutes}</span> {t('dashboard.weeklyChart.minPerDay')}
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
              axisLine={{ className: 'stroke-border' }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="fill-muted-foreground"
              axisLine={{ className: 'stroke-border' }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value) => [`${value ?? 0} ${t('dashboard.weeklyChart.minutes')}`, t('dashboard.weeklyChart.practice')]}
            />
            <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isToday ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.6)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary/60" />
          <span>{t('dashboard.weeklyChart.previous')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>{t('dashboard.weeklyChart.today')}</span>
        </div>
      </div>
    </div>
  )
}
