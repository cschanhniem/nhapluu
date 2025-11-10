import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { MeditationSession } from '@/types'
import { Trash2, Star } from 'lucide-react'

interface MeditationLoggerProps {
  onAdd: (session: Omit<MeditationSession, 'id'>) => void
  sessions: MeditationSession[]
  onDelete: (id: string) => void
}

export function MeditationLogger({ onAdd, sessions, onDelete }: MeditationLoggerProps) {
  const [duration, setDuration] = useState(25)
  const [type, setType] = useState<MeditationSession['type']>('anapanasati')
  const [notes, setNotes] = useState('')
  const [quality, setQuality] = useState<MeditationSession['quality']>(3)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const session: Omit<MeditationSession, 'id'> = {
      date: new Date().toISOString(),
      duration,
      type,
      notes: notes.trim() || undefined,
      quality
    }

    onAdd(session)

    // Reset form
    setNotes('')
    setQuality(3)
  }

  return (
    <div className="space-y-6">
      {/* Log Form */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Ghi Nhận Buổi Thiền</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Thời gian (phút)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="1"
              max="240"
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Loại thiền
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as MeditationSession['type'])}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="anapanasati">Niệm hơi thở (Ānāpānasati)</option>
              <option value="vipassana">Quán (Vipassanā)</option>
              <option value="walking">Thiền đi</option>
              <option value="other">Khác</option>
            </select>
          </div>

          {/* Quality */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Chất lượng buổi ngồi
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setQuality(level as MeditationSession['quality'])}
                  className={`flex-1 py-2 rounded-md transition-colors ${
                    quality === level
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Star className={`h-4 w-4 mx-auto ${(quality || 3) >= level ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Ghi chú (tùy chọn)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Quan sát, trải nghiệm, tuệ giác..."
              rows={3}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground">
            Lưu Buổi Thiền
          </Button>
        </form>
      </div>

      {/* Sessions History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Lịch Sử Thiền Định</h3>

        {sessions.length === 0 ? (
          <p className="text-muted-foreground text-sm">Chưa có buổi thiền nào được ghi nhận.</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-foreground">
                      {session.type === 'anapanasati' ? 'Niệm hơi thở' :
                       session.type === 'vipassana' ? 'Vipassanā' :
                       session.type === 'walking' ? 'Thiền đi' : 'Khác'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(session.date).toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <button
                    onClick={() => onDelete(session.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-semibold text-primary">{session.duration} phút</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < (session.quality || 0)
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {session.notes && (
                  <p className="text-sm text-muted-foreground bg-muted p-2 rounded-md">
                    {session.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
