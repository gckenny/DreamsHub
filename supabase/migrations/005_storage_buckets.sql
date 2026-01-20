-- ============================================================================
-- Migration 005: Storage Buckets
-- 檔案儲存設定
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Create storage bucket for swimmer photos
-- ----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'swimmer-photos',
    'swimmer-photos',
    true,  -- Public access for display during marshalling
    5242880,  -- 5MB max
    ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ----------------------------------------------------------------------------
-- Storage RLS Policies
-- ----------------------------------------------------------------------------

-- Allow authenticated users to upload photos
CREATE POLICY "swimmer_photos_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'swimmer-photos'
);

-- Allow public read access (for marshalling display)
CREATE POLICY "swimmer_photos_select"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'swimmer-photos');

-- Allow users to update their own uploads
CREATE POLICY "swimmer_photos_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'swimmer-photos')
WITH CHECK (bucket_id = 'swimmer-photos');

-- Allow users to delete their own uploads
CREATE POLICY "swimmer_photos_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'swimmer-photos');
