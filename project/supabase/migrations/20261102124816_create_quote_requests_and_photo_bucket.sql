/*
# Quote requests and private photo uploads

1. New Tables
- `quote_requests`: quote enquiries submitted from the website. Stores name, email, phone, property type, required service, suburb/postcode, preferred timeframe, optional message, optional photo path, privacy consent, and submission time.

2. New Storage
- `quote-photos` private bucket for optional property photos (max 5 MB, JPEG/PNG/WebP/HEIC).

3. Security
- RLS enabled on `quote_requests`. Visitors (anon and signed-in) may only INSERT. No SELECT grant or policy, so submissions cannot be read back through the public key.
- Storage: visitors may upload to `quote-photos` only. The bucket is private, so files are not publicly readable.

4. Important Notes
- The public form is intentionally open for inserts; length and format checks are enforced by column constraints.
- Lead review happens in the database dashboard using the service role.
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND email LIKE '%_@_%.__%'),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 6 AND 30),
  property_type text NOT NULL CHECK (property_type IN ('Residential', 'Commercial')),
  service text NOT NULL CHECK (char_length(service) BETWEEN 1 AND 80),
  suburb text NOT NULL CHECK (char_length(suburb) BETWEEN 2 AND 120),
  timeframe text NOT NULL CHECK (char_length(timeframe) BETWEEN 1 AND 80),
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  photo_path text CHECK (photo_path IS NULL OR char_length(photo_path) <= 200),
  consent boolean NOT NULL CHECK (consent = true),
  source text NOT NULL DEFAULT 'website'
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON quote_requests TO anon, authenticated;

DROP POLICY IF EXISTS "public_insert_quote_requests" ON quote_requests;
CREATE POLICY "public_insert_quote_requests" ON quote_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quote-photos',
  'quote-photos',
  false,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

DROP POLICY IF EXISTS "public_upload_quote_photos" ON storage.objects;
CREATE POLICY "public_upload_quote_photos" ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'quote-photos');
