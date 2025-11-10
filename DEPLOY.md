# 🚀 Hướng Dẫn Deploy NhapLuu

Guide đầy đủ để deploy ứng dụng NhapLuu lên production với GitHub Pages (frontend) và Cloudflare Workers (backend).

## Tổng Quan Architecture

```
┌─────────────────────┐
│   GitHub Pages      │  Frontend (React)
│  cschanhniem.github │  https://cschanhniem.github.io/nhapluu
│     .io/nhapluu     │
└──────────┬──────────┘
           │ HTTPS API calls
           ▼
┌─────────────────────┐
│ Cloudflare Workers  │  Backend (Hono API)
│  nhapluu-backend    │  https://nhapluu-backend.YOUR.workers.dev
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Cloudflare D1     │  Database (SQLite)
│   nhapluu-db        │
└─────────────────────┘
```

## Phần 1: Frontend (GitHub Pages) - ✅ ĐÃ XONG

Frontend đã được setup với GitHub Actions và sẽ tự động deploy khi push code.

### Check Deployment Status

1. Vào https://github.com/cschanhniem/nhapluu
2. Click tab **Actions**
3. Xem workflow "Deploy to GitHub Pages"
4. Nếu thành công (✅ green checkmark), website đã live

### Enable GitHub Pages

Nếu chưa enable:

1. Vào **Settings** > **Pages**
2. Source: **GitHub Actions**
3. Branch: **main**

### Access Frontend

Website sẽ có tại: **https://cschanhniem.github.io/nhapluu**

### Troubleshooting Frontend

```bash
# Build local để check errors
npm run build

# Preview production build
npm run preview
```

## Phần 2: Backend (Cloudflare Workers) - CẦN DEPLOY

### Step-by-Step Deploy Backend

#### 1. Install Wrangler CLI

```bash
npm install -g wrangler

# Hoặc dùng npx (không cần install global)
npx wrangler --version
```

#### 2. Login vào Cloudflare

```bash
npx wrangler login
```

Trình duyệt sẽ mở, đăng nhập vào Cloudflare account (hoặc tạo account free).

#### 3. Vào thư mục backend

```bash
cd backend
npm install
```

#### 4. Tạo D1 Database

```bash
npx wrangler d1 create nhapluu-db
```

Kết quả sẽ là:
```
✅ Successfully created DB 'nhapluu-db'

[[d1_databases]]
binding = "DB"
database_name = "nhapluu-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Quan trọng**: Copy `database_id` và paste vào file `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "nhapluu-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # <-- Paste here
```

#### 5. Run Database Migrations

```bash
npx wrangler d1 execute nhapluu-db --file=schema.sql
```

Kết quả:
```
🌀 Mapping SQL input into an array of statements
🌀 Executing on nhapluu-db (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx):
✅ Executed 10 commands in 0.5s
```

#### 6. Set JWT Secret

```bash
npx wrangler secret put JWT_SECRET
```

Nhập một secret key (hoặc generate bằng):
```bash
# Generate random secret
openssl rand -base64 32
```

#### 7. Test Local

```bash
npm run dev
```

Server local sẽ chạy tại `http://localhost:8787`

Test:
```bash
curl http://localhost:8787
# Response: {"name":"NhapLuu API","version":"1.0.0","status":"ok"...}
```

#### 8. Deploy lên Production

```bash
npm run deploy
```

Kết quả:
```
Total Upload: XX.XX KiB / gzip: XX.XX KiB
Uploaded nhapluu-backend (X.XX sec)
Published nhapluu-backend (X.XX sec)
  https://nhapluu-backend.YOUR_SUBDOMAIN.workers.dev
```

🎉 **Backend đã live!**

Copy URL: `https://nhapluu-backend.YOUR_SUBDOMAIN.workers.dev`

#### 9. Test Production API

```bash
curl https://nhapluu-backend.YOUR_SUBDOMAIN.workers.dev
```

## Phần 3: Kết Nối Frontend với Backend

### 1. Update Frontend Environment

Tạo file `.env.local` trong root directory:

```env
VITE_API_URL=https://nhapluu-backend.YOUR_SUBDOMAIN.workers.dev
```

### 2. Update CORS trong Backend

File `backend/wrangler.toml`:
```toml
[vars]
ALLOWED_ORIGINS = "https://cschanhniem.github.io,http://localhost:5173,http://localhost:5174"
```

Deploy lại backend:
```bash
cd backend
npm run deploy
```

### 3. Tạo API Client trong Frontend

Tạo file `src/lib/api.ts`:

```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export async function registerUser(email: string) {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  return response.json()
}

export async function syncData(token: string, data: any) {
  const response = await fetch(`${API_BASE}/api/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ data, lastSync: Date.now() })
  })
  return response.json()
}
```

### 4. Update useAppState Hook

Thêm sync functionality vào `src/hooks/useAppState.ts`:

```typescript
// Thêm vào useAppState hook
const syncToCloud = async () => {
  const token = localStorage.getItem('auth_token')
  if (!token) return

  try {
    await syncData(token, state)
    console.log('✅ Synced to cloud')
  } catch (error) {
    console.error('❌ Sync failed:', error)
  }
}

// Auto sync mỗi khi state thay đổi
useEffect(() => {
  const timer = setTimeout(() => {
    syncToCloud()
  }, 5000) // Sync sau 5s

  return () => clearTimeout(timer)
}, [state])
```

### 5. Rebuild và Deploy Frontend

```bash
# Build với API URL
npm run build

# Commit và push
git add .
git commit -m "feat: Connect frontend với backend API"
git push origin main
```

GitHub Actions sẽ tự động deploy.

## Phần 4: Custom Domain (Optional)

### Cho Backend (Cloudflare)

1. Vào Cloudflare Dashboard > Workers & Pages
2. Click vào `nhapluu-backend`
3. Settings > Triggers > Custom Domains
4. Add custom domain: `api.nhapluu.com`

### Cho Frontend (GitHub Pages)

1. GitHub Repo > Settings > Pages
2. Custom domain: `nhapluu.com`
3. Add CNAME record trong DNS:
```
CNAME  www  cschanhniem.github.io
```

## Verification Checklist

### ✅ Frontend
- [ ] Website accessible tại https://cschanhniem.github.io/nhapluu
- [ ] No console errors
- [ ] Routes hoạt động (Dashboard, Thiền định, Kinh tạng, etc.)
- [ ] LocalStorage lưu data
- [ ] UI responsive trên mobile

### ✅ Backend
- [ ] API accessible tại https://nhapluu-backend.*.workers.dev
- [ ] Health check: `GET /` trả về status OK
- [ ] Register user thành công
- [ ] Login thành công
- [ ] Create meditation session thành công
- [ ] Sync data thành công

### ✅ Integration
- [ ] Frontend gọi được backend API
- [ ] CORS không bị block
- [ ] Authentication flow hoạt động
- [ ] Data sync giữa local và cloud

## Monitoring & Maintenance

### Cloudflare Dashboard

URL: https://dash.cloudflare.com > Workers & Pages > nhapluu-backend

**Metrics**:
- Requests per second
- Error rate
- CPU time
- Bandwidth

**Alerts**: Setup email alerts khi error rate > 5%

### GitHub Actions

URL: https://github.com/cschanhniem/nhapluu/actions

**Metrics**:
- Build success rate
- Deploy time
- Failed workflows

### Database Size

```bash
npx wrangler d1 execute nhapluu-db --command="SELECT
  (SELECT COUNT(*) FROM users) as users,
  (SELECT COUNT(*) FROM meditation_sessions) as sessions,
  (SELECT COUNT(*) FROM precepts_records) as precepts
"
```

## Costs

### Current Setup (Free Tier)

**Frontend (GitHub Pages)**:
- Cost: **$0/month**
- Bandwidth: Unlimited
- Storage: 1GB

**Backend (Cloudflare Workers)**:
- Cost: **$0/month**
- Requests: 100,000/day
- CPU: 10ms/request
- D1 Storage: 5GB

**Total**: **$0/month** cho ~1,000 users

### If Scaling Needed

**Cloudflare Workers Paid ($5/month)**:
- Unlimited requests
- 30ms CPU/request
- Priority support

## Backup Strategy

### Database Backup (Weekly)

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d)
npx wrangler d1 backup create nhapluu-db --output="backup_$DATE.sql"
```

Setup cron job:
```bash
0 0 * * 0 /path/to/backup.sh  # Every Sunday
```

### Code Backup

GitHub tự động backup code. Đảm bảo:
- Regular commits
- Tagged releases
- Branch protection

## Rollback Plan

### Frontend Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or specific commit
git revert abc123
git push origin main
```

### Backend Rollback

```bash
cd backend

# Rollback to previous deployment
npx wrangler rollback

# Or deploy specific version
git checkout <previous-commit>
npm run deploy
```

## Troubleshooting

### Frontend không load

1. Check GitHub Actions có failed không
2. Check browser console errors
3. Clear cache: Ctrl+Shift+R
4. Verify base path trong vite.config.ts

### Backend không response

1. Check Cloudflare status page
2. View logs: `npx wrangler tail`
3. Test local: `npm run dev`
4. Check CORS settings

### Database errors

1. Verify database ID trong wrangler.toml
2. Re-run migrations: `npx wrangler d1 execute nhapluu-db --file=schema.sql`
3. Check D1 dashboard

### CORS errors

Update ALLOWED_ORIGINS trong wrangler.toml:
```toml
[vars]
ALLOWED_ORIGINS = "https://cschanhniem.github.io,https://yourdomain.com"
```

## Security Checklist

- [x] HTTPS only
- [x] JWT authentication
- [x] CORS protection
- [x] Rate limiting (Cloudflare)
- [x] SQL injection prevention (prepared statements)
- [x] Input validation
- [x] Secrets stored securely
- [ ] Setup monitoring alerts
- [ ] Regular security updates

## Next Steps

1. ✅ Deploy backend lên Cloudflare Workers
2. ✅ Connect frontend với backend API
3. Test toàn bộ flow
4. Invite beta testers
5. Collect feedback
6. Iterate and improve

---

## Quick Command Reference

```bash
# Frontend
npm run dev          # Local development
npm run build        # Production build
git push origin main # Deploy to GitHub Pages

# Backend
cd backend
npm run dev         # Local development
npm run deploy      # Deploy to Cloudflare
npx wrangler tail   # View logs
npx wrangler d1 execute nhapluu-db --command="SQL" # Run SQL

# Database
npx wrangler d1 list                    # List databases
npx wrangler d1 execute nhapluu-db --file=schema.sql  # Run migrations
npx wrangler d1 backup create nhapluu-db  # Create backup
```

---

**Chúc mừng! Ứng dụng NhapLuu của bạn đã sẵn sàng phục vụ hàng nghìn người tu tập!** 🙏

*Sabbe sattā sukhi hontu* ☸️
