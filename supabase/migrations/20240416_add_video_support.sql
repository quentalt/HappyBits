-- Add video_url column to articles
ALTER TABLE public.articles
ADD COLUMN video_url text;