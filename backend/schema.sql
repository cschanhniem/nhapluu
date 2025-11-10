-- NhapLuu Database Schema for Cloudflare D1 (SQLite)

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at INTEGER NOT NULL,
  last_sync INTEGER
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Meditation sessions
CREATE TABLE IF NOT EXISTS meditation_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  duration INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('anapanasati', 'vipassana', 'walking', 'other')),
  quality INTEGER CHECK(quality BETWEEN 1 AND 5),
  notes TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_meditation_user_date ON meditation_sessions(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_meditation_created ON meditation_sessions(created_at DESC);

-- Precepts records
CREATE TABLE IF NOT EXISTS precepts_records (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('five', 'eight')),
  precepts TEXT NOT NULL, -- JSON string: {"1": true, "2": false, ...}
  notes TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_precepts_user_date ON precepts_records(user_id, date DESC);

-- Program progress
CREATE TABLE IF NOT EXISTS program_progress (
  user_id TEXT PRIMARY KEY,
  start_date TEXT NOT NULL,
  current_week INTEGER NOT NULL DEFAULT 1,
  completed_days TEXT NOT NULL, -- JSON array: ["2024-01-01", "2024-01-02", ...]
  milestones TEXT NOT NULL, -- JSON array: [{"week": 1, "completed": false}, ...]
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insight entries
CREATE TABLE IF NOT EXISTS insight_entries (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  contemplation TEXT CHECK(contemplation IN ('anicca', 'dukkha', 'anatta', 'general')),
  tags TEXT, -- JSON array: ["tag1", "tag2", ...]
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_insights_user_date ON insight_entries(user_id, date DESC);

-- Bookmarks
CREATE TABLE IF NOT EXISTS bookmarks (
  user_id TEXT NOT NULL,
  sutta_id TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, sutta_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);

-- Sync metadata
CREATE TABLE IF NOT EXISTS sync_metadata (
  user_id TEXT PRIMARY KEY,
  last_pull INTEGER NOT NULL,
  last_push INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
