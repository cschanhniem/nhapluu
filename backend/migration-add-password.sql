-- Migration: Add password_hash column to users table
-- Run this on existing database

-- Add password_hash column (default empty string for existing users)
ALTER TABLE users ADD COLUMN password_hash TEXT NOT NULL DEFAULT '';
