# NhapLuu Backend Architecture

> Cloudflare Workers + D1 - Serverless, không cần maintain, zero-config scaling

## Tại Sao Cloudflare?

### Ưu Điểm
- **Serverless 100%**: Không cần quản lý server
- **D1 SQLite**: Database đơn giản, không cần migration phức tạp
- **Free tier rộng rãi**:
  - 100,000 requests/day
  - 5GB storage
  - Đủ cho hàng nghìn users
- **Edge computing**: Deploy toàn cầu tự động
- **Zero maintenance**: Cloudflare lo hết
- **TypeScript support**: Code như frontend

### So Với Các Lựa Chọn Khác

| Feature | Cloudflare Workers | Supabase | Firebase | Railway |
|---------|-------------------|----------|----------|---------|
| Setup | ⭐⭐⭐⭐⭐ Rất đơn giản | ⭐⭐⭐ Trung bình | ⭐⭐⭐ Trung bình | ⭐⭐⭐⭐ Đơn giản |
| Maintenance | ⭐⭐⭐⭐⭐ Zero | ⭐⭐⭐ Cần update | ⭐⭐⭐ Cần config | ⭐⭐ Cần monitor |
| Free Tier | ⭐⭐⭐⭐⭐ 100k req/day | ⭐⭐⭐ 50k users | ⭐⭐⭐ Spark plan | ⭐⭐ $5/month |
| Scaling | ⭐⭐⭐⭐⭐ Auto | ⭐⭐⭐⭐ Auto | ⭐⭐⭐⭐ Auto | ⭐⭐⭐ Manual |
| Database | D1 (SQLite) | PostgreSQL | Firestore | PostgreSQL |
| Migration | ⭐⭐⭐⭐⭐ Minimal | ⭐⭐ Complex | ⭐⭐⭐ Medium | ⭐⭐ Complex |

## Architecture Overview

```
┌─────────────┐
│   Frontend  │ (GitHub Pages)
│  React + TS │ https://cschanhniem.github.io/nhapluu
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────┐
│ Cloudflare Workers  │ (Edge Functions)
│  API Endpoints      │ https://nhapluu.yourdomain.workers.dev
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Cloudflare D1     │ (Serverless SQLite)
│   User Data Sync    │
└─────────────────────┘
```

## Database Schema (D1 SQLite)

### Table: users
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  created_at INTEGER NOT NULL,
  last_sync INTEGER
);
```

### Table: meditation_sessions
```sql
CREATE TABLE meditation_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  duration INTEGER NOT NULL,
  type TEXT NOT NULL,
  quality INTEGER,
  notes TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_user_date ON meditation_sessions(user_id, date DESC);
```

### Table: precepts_records
```sql
CREATE TABLE precepts_records (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  type TEXT NOT NULL,
  precepts TEXT NOT NULL, -- JSON string
  notes TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_precepts_user ON precepts_records(user_id, date DESC);
```

### Table: program_progress
```sql
CREATE TABLE program_progress (
  user_id TEXT PRIMARY KEY,
  start_date TEXT NOT NULL,
  current_week INTEGER NOT NULL,
  completed_days TEXT NOT NULL, -- JSON array
  milestones TEXT NOT NULL, -- JSON array
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Table: insight_entries
```sql
CREATE TABLE insight_entries (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  contemplation TEXT,
  tags TEXT, -- JSON array
  created_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_insights_user ON insight_entries(user_id, date DESC);
```

### Table: bookmarks
```sql
CREATE TABLE bookmarks (
  user_id TEXT NOT NULL,
  sutta_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, sutta_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Meditation
```
GET    /api/meditations
POST   /api/meditations
DELETE /api/meditations/:id
GET    /api/meditations/stats
```

### Precepts
```
GET  /api/precepts
POST /api/precepts
```

### Program
```
GET  /api/program
POST /api/program/start
POST /api/program/mark-day
```

### Insights
```
GET    /api/insights
POST   /api/insights
DELETE /api/insights/:id
```

### Bookmarks
```
GET    /api/bookmarks
POST   /api/bookmarks/:suttaId
DELETE /api/bookmarks/:suttaId
```

### Sync
```
POST /api/sync/pull  -- Get all data from server
POST /api/sync/push  -- Push local data to server
POST /api/sync/merge -- Smart merge (conflict resolution)
```

## Implementation Steps

### Phase 1: Setup Cloudflare (10 phút)

```bash
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Create new Worker project
cd nhapluu-app
mkdir backend
cd backend
npm init -y
npm install -D wrangler

# 4. Create wrangler.toml
wrangler init

# 5. Create D1 database
wrangler d1 create nhapluu-db
```

### Phase 2: Setup Database (5 phút)

```bash
# Create schema.sql with tables above
wrangler d1 execute nhapluu-db --file=schema.sql

# Test query
wrangler d1 execute nhapluu-db --command="SELECT * FROM users"
```

### Phase 3: Create API (30 phút)

Project structure:
```
backend/
├── src/
│   ├── index.ts          # Main worker entry
│   ├── router.ts         # Route definitions
│   ├── auth/
│   │   ├── jwt.ts        # Simple JWT
│   │   └── middleware.ts
│   ├── handlers/
│   │   ├── meditations.ts
│   │   ├── precepts.ts
│   │   ├── program.ts
│   │   └── sync.ts
│   └── db/
│       └── queries.ts    # SQL queries
├── schema.sql
├── wrangler.toml
└── package.json
```

### Phase 4: Deploy (2 phút)

```bash
# Deploy to Cloudflare
wrangler deploy

# Your API will be live at:
# https://nhapluu-backend.yourdomain.workers.dev
```

### Phase 5: Update Frontend (20 phút)

```typescript
// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_URL

export async function syncData() {
  const localData = getLocalData()
  const response = await fetch(`${API_BASE}/api/sync/push`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(localData)
  })
  return response.json()
}
```

## Authentication Strategy

### Simple JWT (Không Cần Third-Party)

```typescript
// backend/src/auth/jwt.ts
export async function generateToken(userId: string) {
  const payload = {
    sub: userId,
    iat: Date.now(),
    exp: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
  }

  return btoa(JSON.stringify(payload)) + '.' +
         await sign(payload, env.JWT_SECRET)
}
```

**Hoặc sử dụng email magic link** (không cần password):
1. User nhập email
2. Server gửi link có token
3. Click link → auto login
4. Token lưu trong localStorage

## Sync Strategy

### Pull-First Approach
1. User mở app
2. Check có internet?
3. Có → Pull data từ server
4. Merge với local data (last_modified wins)
5. Display merged data

### Push on Change
1. User thực hiện action (log meditation, etc.)
2. Save to local immediately
3. Queue for sync
4. Push to server when có internet

### Conflict Resolution
```typescript
function mergeData(local: Item, remote: Item): Item {
  // Simple: Last write wins
  if (local.updated_at > remote.updated_at) {
    return local
  }
  return remote
}
```

## Environment Variables

```bash
# .env.local (Frontend)
VITE_API_URL=https://nhapluu-backend.yourdomain.workers.dev

# wrangler.toml (Backend)
[[d1_databases]]
binding = "DB"
database_name = "nhapluu-db"
database_id = "your-database-id"

[vars]
JWT_SECRET = "your-secret-key-generate-with-openssl"
```

## Cost Estimate

### Free Tier (Đủ Cho 1000+ Users)
- **Requests**: 100,000/day = 3M/month
- **D1 Reads**: 5M rows/day
- **D1 Writes**: 100k rows/day
- **Storage**: 5GB

### Paid (Nếu Scale Lớn)
- **$5/month**: Unlimited requests
- **Storage**: $0.75/GB/month

**Chi phí thực tế cho 10,000 users**: ~$0-10/month

## Migration Path

### Từ LocalStorage → Cloud
1. User click "Đồng bộ hóa"
2. Tạo account (email)
3. Push tất cả local data lên server
4. Từ giờ auto-sync

### Export/Import (Backup)
```typescript
// Export to JSON
function exportData() {
  const data = getAllLocalData()
  const blob = new Blob([JSON.stringify(data, null, 2)])
  downloadFile(blob, 'nhapluu-backup.json')
}

// Import from JSON
function importData(file: File) {
  // Read JSON
  // Merge with existing data
  // Save to local + push to server
}
```

## Security

### Simple But Effective
1. **HTTPS Only**: Cloudflare tự động
2. **JWT Token**: HttpOnly cookies
3. **Rate Limiting**: Cloudflare built-in
4. **CORS**: Chỉ allow domain của mình
5. **Input Validation**: Zod schema

### Private Data
- Tất cả data của user chỉ user đó xem được
- Server không log sensitive info
- D1 encrypted at rest

## Monitoring

### Cloudflare Dashboard
- Request count
- Error rate
- Response time
- Database queries

### Alerts
- Email khi error rate > 5%
- Slack webhook cho critical errors

## Next Steps

1. ✅ **Đã xong**: Frontend deployed lên GitHub Pages
2. **Tiếp theo**: Setup Cloudflare Workers
3. **Sau đó**: Implement API endpoints
4. **Cuối cùng**: Connect frontend với backend

## Quick Start Commands

```bash
# 1. Setup backend
cd nhapluu-app
mkdir backend && cd backend
npm init -y
npm install -D wrangler
wrangler login
wrangler d1 create nhapluu-db

# 2. Deploy
wrangler deploy

# 3. Update frontend
cd ..
echo "VITE_API_URL=https://nhapluu-backend.yourdomain.workers.dev" > .env.local
npm run build

# 4. Done!
```

---

**Tổng thời gian setup**: < 1 giờ
**Tổng chi phí**: $0/month (free tier)
**Maintenance**: 0 giờ/tháng

*Đơn giản, nhanh, không đau đầu* ☸️
