# NhapLuu App v4.0 - Improvement Plan

> Kế hoạch phát triển từ Founder NhapLuu
> Ngày: 2026-01-18
> Phiên bản: v4.0 "Insight Release"

## Tầm nhìn v4.0

Biến NhapLuu thành **nền tảng thực hành Phật giáo toàn diện nhất** với:
- Dashboard analytics trực quan với charts
- Sutta Library nâng cao với parallel text (Pāli/Việt/English)
- Meditation analytics và insights
- Guided meditation audio
- Cải thiện hiệu suất và trải nghiệm

---

## Phase 1: Dashboard Analytics (Priority: High)

### 1.1 Practice Statistics Cards
- [ ] Tổng thời gian thiền (giờ/phút)
- [ ] Streak hiện tại và dài nhất
- [ ] Số ngày giữ giới
- [ ] Điểm tích lũy (gamification)

### 1.2 Charts & Visualizations
- [ ] Install recharts hoặc chart.js
- [ ] Weekly meditation minutes bar chart
- [ ] Monthly practice heatmap (GitHub-style)
- [ ] Precepts observance pie chart
- [ ] Progress trend line chart

### 1.3 Quick Actions
- [ ] Start meditation button
- [ ] Quick check-in
- [ ] Today's sutta recommendation
- [ ] Upcoming Uposatha reminder

---

## Phase 2: Enhanced Sutta Library

### 2.1 Parallel Text Display
- [ ] Side-by-side Pāli + Vietnamese
- [ ] Toggle giữa các ngôn ngữ
- [ ] Highlight từ Pāli khi hover
- [ ] Pāli pronunciation guide

### 2.2 Reading Experience
- [ ] Adjustable font size
- [ ] Reading progress indicator
- [ ] Bookmark specific paragraphs
- [ ] Notes/annotations per sutta
- [ ] Share sutta quotes

### 2.3 Search & Discovery
- [ ] Full-text search với highlighting
- [ ] Filter by theme, collection, difficulty
- [ ] Related suttas suggestions
- [ ] "Continue reading" feature

---

## Phase 3: Meditation Experience

### 3.1 Timer Enhancements
- [ ] Multiple preset durations (5, 10, 15, 20, 30, 45, 60 min)
- [ ] Custom interval bells
- [ ] Preparation countdown (1-3 min)
- [ ] End-of-session summary

### 3.2 Session Quality Tracking
- [ ] Post-session reflection form
- [ ] Quality rating (1-5 stars)
- [ ] Hindrance tracking (5 hindrances)
- [ ] Jhāna factor observation
- [ ] Notes field

### 3.3 Audio Features
- [ ] Background ambient sounds (rain, forest, temple)
- [ ] Volume control
- [ ] Different bell sounds selection
- [ ] Guided breathing introduction

---

## Phase 4: Program Enhancement

### 4.1 90-Day Program Upgrade
- [ ] Daily guidance cards
- [ ] Weekly reflection prompts
- [ ] Milestone celebrations
- [ ] Progress badges
- [ ] Certificate of completion

### 4.2 Custom Programs
- [ ] Create personal practice goals
- [ ] Flexible duration (30, 60, 90 days)
- [ ] Mix different practices
- [ ] Track multiple programs

---

## Phase 5: Performance & Polish

### 5.1 Bundle Optimization
- [ ] Lazy load sutta content on demand
- [ ] Image optimization (WebP)
- [ ] Reduce main bundle < 200KB gzip
- [ ] Code splitting improvements

### 5.2 Offline Experience
- [ ] Cache more suttas offline
- [ ] Offline meditation timer
- [ ] Queue sync when back online
- [ ] Offline indicator in UI

### 5.3 Accessibility
- [ ] ARIA labels for all interactive elements
- [ ] Keyboard navigation
- [ ] Screen reader testing
- [ ] High contrast mode

---

## Implementation Priority

| Task | Priority | Impact | Effort |
|------|----------|--------|--------|
| Dashboard charts | P0 | High | Medium |
| Timer presets | P0 | High | Low |
| Session quality tracking | P1 | High | Medium |
| Parallel sutta text | P1 | Medium | High |
| Ambient sounds | P2 | Medium | Medium |
| Custom programs | P2 | Medium | High |

---

## Technical Implementation

### Charts Library
```bash
npm install recharts
```

### New Components Needed
- `src/components/charts/WeeklyChart.tsx`
- `src/components/charts/HeatmapCalendar.tsx`
- `src/components/charts/ProgressChart.tsx`
- `src/components/practice/SessionSummary.tsx`
- `src/components/practice/QualityRating.tsx`

### Data Structure Updates
```typescript
interface MeditationSession {
  // Existing
  id: string
  date: string
  duration: number
  type: string
  quality: number
  // New in v4
  notes?: string
  hindrances?: string[]
  jhanaFactors?: string[]
  ambientSound?: string
}
```

---

## Immediate Next Steps

1. **Today**: Install recharts, create chart components
2. **Day 2**: Implement Dashboard charts
3. **Day 3**: Add timer presets and quality tracking
4. **Day 4**: Session summary and insights
5. **Day 5**: Testing & polish

---

## Success Metrics

- [ ] Dashboard load time < 1s
- [ ] User engagement increase 20%
- [ ] Average session duration increase
- [ ] Chart rendering < 100ms
- [ ] Lighthouse score > 90

---

*Sādhu! Sādhu! Sādhu!*
*Con đường Bát Chánh Đạo - The Noble Eightfold Path*

— NhapLuu Founder
