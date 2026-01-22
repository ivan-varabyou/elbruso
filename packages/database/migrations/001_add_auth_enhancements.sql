-- Migration: Add country_id to users and create password reset/email tables
-- Date: 2026-01-21

-- 1. Add country_id to users table (default to Russia - id 1)
ALTER TABLE users 
ADD COLUMN country_id INTEGER REFERENCES countries(id) DEFAULT 1;

-- 2. Create password_reset_tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_password_reset_token (token),
  INDEX idx_password_reset_user_id (user_id),
  INDEX idx_password_reset_expires (expires_at)
);

-- 3. Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) NOT NULL UNIQUE,
  subject_en VARCHAR(255) NOT NULL,
  subject_ru VARCHAR(255) NOT NULL,
  body_en TEXT NOT NULL,
  body_ru TEXT NOT NULL,
  variables JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Seed email templates
INSERT INTO email_templates (key, subject_en, subject_ru, body_en, body_ru, variables) VALUES
('welcome', 
 'Welcome to Elbruso!', 
 'Добро пожаловать в Elbruso!',
 '<h1>Welcome {{name}}!</h1><p>Your account has been successfully created.</p>',
 '<h1>Добро пожаловать, {{name}}!</h1><p>Ваш аккаунт успешно создан.</p>',
 '{"name": "string"}'::jsonb),

('password_reset',
 'Reset Your Password',
 'Сброс пароля',
 '<h1>Password Reset</h1><p>Click the link below to reset your password:</p><p><a href="{{link}}">Reset Password</a></p><p>This link expires in 1 hour.</p>',
 '<h1>Сброс пароля</h1><p>Нажмите на ссылку ниже, чтобы сбросить пароль:</p><p><a href="{{link}}">Сбросить пароль</a></p><p>Ссылка действительна 1 час.</p>',
 '{"link": "string"}'::jsonb),

('password_changed',
 'Password Changed',
 'Пароль изменён',
 '<h1>Password Changed</h1><p>Your password has been successfully changed.</p>',
 '<h1>Пароль изменён</h1><p>Ваш пароль успешно изменён.</p>',
 '{}'::jsonb);

COMMENT ON TABLE password_reset_tokens IS 'Tokens for password reset functionality';
COMMENT ON TABLE email_templates IS 'Email templates for notifications';
