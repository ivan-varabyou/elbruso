-- Add is_approved column to users table
-- This column tracks whether a user has been approved by an administrator

ALTER TABLE users ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT false;

-- Set existing active users as approved
UPDATE users SET is_approved = true WHERE is_active = true;

-- Add comment
COMMENT ON COLUMN users.is_approved IS 'Whether the user has been approved by an administrator';
