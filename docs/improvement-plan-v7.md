# NhapLuu v7 Improvement Plan: Reflection & History Release

## Mục tiêu
Thêm tính năng ghi chép tuệ giác (Insight Journal) để người dùng có thể theo dõi hành trình tu tập của mình.

## Các tính năng

### P1 - Insight Journal (Nhật Ký Tuệ Giác)
- [x] Trang Insight Journal `/nhat-ky`
- [x] Form thêm entry với title, content, contemplation type (anicca/dukkha/anatta/general)
- [x] Danh sách các entries với search và filter
- [x] Chi tiết entry với delete và expand/collapse
- [x] Tags support cho entries
- [x] i18n cho Journal (vi/en)
- [x] Link from Dashboard Quick Actions
- [x] Stats cho contemplation types

### P2 - Meditation History (Lịch Sử Thiền Tập)
- [x] Tab "Log" trong trang Practice đã có sẵn với MeditationLogger
- [x] Danh sách sessions với delete
- [x] Chi tiết session với quality và notes

## Technical Notes
- InsightEntry type đã có trong types/index.ts
- MeditationSession type đã có sẵn
- Sử dụng useAppState để quản lý data (addInsightEntry, deleteInsightEntry)
- Route `/nhat-ky` với lazy loading
