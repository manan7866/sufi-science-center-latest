ALTER TABLE interview_applications ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMP;
ALTER TABLE interview_applications ADD COLUMN IF NOT EXISTS scheduled_time VARCHAR(10);
ALTER TABLE interview_applications ADD COLUMN IF NOT EXISTS video_link VARCHAR(500);