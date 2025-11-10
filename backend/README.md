# NhapLuu Backend - Cloudflare Workers + D1

Backend serverless cho ứng dụng NhapLuu, sử dụng Cloudflare Workers và D1 Database.

## Prerequisites

- Node.js 20+
- Tài khoản Cloudflare (Free tier)
- Wrangler CLI

## Setup Nhanh (< 10 phút)

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Login vào Cloudflare

```bash
npx wrangler login
```

Trình duyệt sẽ mở, đăng nhập vào Cloudflare account của bạn.

### 3. Tạo D1 Database

```bash
npx wrangler d1 create nhapluu-db
```

Bạn sẽ nhận được output như này:
```
[[d1_databases]]
binding = "DB"
database_name = "nhapluu-db"
database_id = "xxxx-xxxx-xxxx-xxxx"
```

**Quan trọng**: Copy `database_id` và paste vào file `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "nhapluu-db"
database_id = "paste-your-database-id-here"
```

### 4. Chạy Database Migrations

```bash
npx wrangler d1 execute nhapluu-db --file=schema.sql
```

Verify database đã được tạo:

```bash
npx wrangler d1 execute nhapluu-db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

### 5. Set JWT Secret

```bash
npx wrangler secret put JWT_SECRET
```

Nhập một secret key bất kỳ (hoặc generate bằng `openssl rand -base64 32`).

### 6. Test Local

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:8787`

Test API:
```bash
curl http://localhost:8787
# Kết quả: {"name":"NhapLuu API","version":"1.0.0","status":"ok"...}
```

### 7. Deploy lên Production

```bash
npm run deploy
```

🎉 Backend của bạn đã live tại: `https://nhapluu-backend.YOUR_SUBDOMAIN.workers.dev`

## API Endpoints

### Health Check
```bash
GET /
GET /api/health
```

### Authentication
```bash
POST /api/auth/register
Body: { "email": "user@example.com" }

POST /api/auth/login
Body: { "email": "user@example.com" }
```

### Meditation Sessions
```bash
GET  /api/meditations
POST /api/meditations
Headers: Authorization: Bearer <token>
Body: {
  "date": "2024-11-10T10:00:00.000Z",
  "duration": 25,
  "type": "anapanasati",
  "quality": 4,
  "notes": "Tâm an tịnh"
}
```

### Sync Data
```bash
POST /api/sync
Headers: Authorization: Bearer <token>
Body: {
  "data": {
    "meditationSessions": [...],
    "preceptsRecords": [...],
    "programProgress": {...}
  },
  "lastSync": 1699612800000
}
```

## Database Schema

Xem file `schema.sql` để biết chi tiết cấu trúc database.

Tables:
- `users` - User accounts
- `meditation_sessions` - Meditation logs
- `precepts_records` - Precepts tracking
- `program_progress` - 90-day program
- `insight_entries` - Insight journal
- `bookmarks` - Saved suttas
- `sync_metadata` - Sync timestamps

## Development

### Local Development

```bash
npm run dev
```

Wrangler sẽ start local server với D1 database emulation.

### Database Commands

```bash
# Execute SQL query
npx wrangler d1 execute nhapluu-db --command="SELECT * FROM users LIMIT 10"

# Execute SQL file
npx wrangler d1 execute nhapluu-db --file=query.sql

# View all tables
npx wrangler d1 execute nhapluu-db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

### Logs

```bash
# View deployment logs
npx wrangler tail
```

## Environment Variables

### Local (.dev.vars)
```env
JWT_SECRET=your-dev-secret
```

### Production (Secrets)
```bash
npx wrangler secret put JWT_SECRET
npx wrangler secret list
```

### Public Variables (wrangler.toml)
```toml
[vars]
ALLOWED_ORIGINS = "https://cschanhniem.github.io,http://localhost:5173"
```

## Testing

### Manual API Testing

```bash
# Register new user
curl -X POST https://nhapluu-backend.YOUR_SUBDOMAIN.workers.dev/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Response: {"success":true,"user":{...},"token":"..."}

# Login
curl -X POST https://nhapluu-backend.YOUR_SUBDOMAIN.workers.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Create meditation session
curl -X POST https://nhapluu-backend.YOUR_SUBDOMAIN.workers.dev/api/meditations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "date": "2024-11-10T10:00:00.000Z",
    "duration": 25,
    "type": "anapanasati",
    "quality": 4
  }'

# Get all sessions
curl https://nhapluu-backend.YOUR_SUBDOMAIN.workers.dev/api/meditations \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### Database not found
```bash
# Check if database exists
npx wrangler d1 list

# Recreate if needed
npx wrangler d1 create nhapluu-db
npx wrangler d1 execute nhapluu-db --file=schema.sql
```

### CORS errors
Thêm origin của bạn vào `ALLOWED_ORIGINS` trong `wrangler.toml`:
```toml
[vars]
ALLOWED_ORIGINS = "https://yourdomain.com,http://localhost:5173"
```

### Authentication errors
Check JWT_SECRET đã được set:
```bash
npx wrangler secret list
```

## Monitoring

### Cloudflare Dashboard
1. Vào https://dash.cloudflare.com
2. Chọn Workers & Pages
3. Click vào `nhapluu-backend`
4. Xem metrics: Requests, Errors, CPU time

### Analytics
- Request count per day
- Error rate
- Response time
- Geographic distribution

## Scaling

### Free Tier Limits
- 100,000 requests/day
- 10ms CPU time/request
- 5GB D1 storage
- Đủ cho ~1,000 active users

### Paid Plan ($5/month)
- Unlimited requests
- 30ms CPU time
- More D1 storage

## Security

- ✅ HTTPS only
- ✅ CORS protection
- ✅ JWT authentication
- ✅ Rate limiting (Cloudflare built-in)
- ✅ Input validation
- ✅ SQL injection protection (prepared statements)

## Backup

### Export Database

```bash
# Get all data from a table
npx wrangler d1 execute nhapluu-db --command="SELECT * FROM users" --json > users_backup.json

# Full backup script
npx wrangler d1 export nhapluu-db --output=backup.sql
```

### Restore

```bash
npx wrangler d1 execute nhapluu-db --file=backup.sql
```

## Cost Estimation

### Scenario: 1,000 active users
- Requests: ~50,000/day (well under free tier)
- Storage: ~500MB
- Cost: **$0/month**

### Scenario: 10,000 active users
- Requests: ~500,000/day
- Storage: ~5GB
- Cost: **$5-10/month**

## Next Steps

1. ✅ Deploy backend lên Cloudflare
2. Update frontend để connect với API
3. Test sync functionality
4. Monitor usage trong Cloudflare Dashboard

## Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [D1 Database Docs](https://developers.cloudflare.com/d1/)
- [Hono Framework](https://hono.dev/)

---

*May this backend serve the Dhamma well* ☸️
