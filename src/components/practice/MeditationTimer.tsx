import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, Check } from 'lucide-react'

interface MeditationTimerProps {
  onComplete: (duration: number) => void
}

export function MeditationTimer({ onComplete }: MeditationTimerProps) {
  const [duration, setDuration] = useState(25) // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60) // seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const intervalRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    setTimeLeft(duration * 60)
  }, [duration])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsCompleted(true)
            // Play a gentle bell sound (would need audio file)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(duration * 60)
    setIsCompleted(false)
  }

  const handleComplete = () => {
    onComplete(duration)
    handleReset()
  }

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100

  return (
    <div className="bg-card rounded-lg border border-border p-8">
      <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Đồng Hồ Thiền</h3>

      {/* Duration Selector */}
      {!isRunning && !isCompleted && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Thời gian (phút)
          </label>
          <div className="flex gap-2">
            {[10, 15, 20, 25, 30, 40, 60].map((min) => (
              <button
                key={min}
                onClick={() => setDuration(min)}
                className={`
                  flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors
                  ${duration === min
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }
                `}
              >
                {min}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Timer Display */}
      <div className="relative mb-6">
        <svg className="w-full h-64" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 80}`}
            strokeDashoffset={`${2 * Math.PI * 80 * (1 - progress / 100)}`}
            transform="rotate(-90 100 100)"
            className="text-primary transition-all duration-1000"
          />
          {/* Time text */}
          <text
            x="100"
            y="100"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-4xl font-bold fill-current text-foreground"
          >
            {formatTime(timeLeft)}
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {!isRunning && !isCompleted && (
          <Button onClick={handleStart} className="bg-primary text-primary-foreground">
            <Play className="mr-2 h-4 w-4" />
            Bắt đầu
          </Button>
        )}
        {isRunning && (
          <Button onClick={handlePause} variant="outline">
            <Pause className="mr-2 h-4 w-4" />
            Tạm dừng
          </Button>
        )}
        {(isRunning || timeLeft < duration * 60) && !isCompleted && (
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Đặt lại
          </Button>
        )}
        {isCompleted && (
          <Button onClick={handleComplete} className="bg-primary text-primary-foreground">
            <Check className="mr-2 h-4 w-4" />
            Hoàn thành & Lưu
          </Button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-muted rounded-md">
        <p className="text-sm text-muted-foreground text-center">
          Ngồi thẳng lưng, nhắm mắt, tập trung vào hơi thở tự nhiên.
          <br />
          Khi tâm tán loạn, nhẹ nhàng đưa về hơi thở.
        </p>
      </div>
    </div>
  )
}
