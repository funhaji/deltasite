-- Run this in Supabase SQL Editor to create the "images" bucket for file uploads
-- This creates a PUBLIC bucket so uploaded images can be accessed via public URLs

-- Note: Buckets must be created via the Supabase Dashboard Storage section OR via SQL
-- If SQL doesn't work, use Dashboard: Storage → New bucket → name: "images" → Public: Yes

-- Create the bucket (if SQL doesn't work, use Dashboard instead)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
-- ON CONFLICT (id) DO NOTHING;

-- Allow public access to read files from the bucket
CREATE POLICY "Allow public read images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow authenticated users (admin) to upload files
CREATE POLICY "Allow authenticated upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

-- Allow authenticated users (admin) to update/delete files
CREATE POLICY "Allow authenticated update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

CREATE POLICY "Allow authenticated delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');
