ALTER TABLE public.studio_submissions ADD COLUMN IF NOT EXISTS rejection_reason text;
ALTER TABLE public.studio_submissions ADD COLUMN IF NOT EXISTS moderated_by text;
ALTER TABLE public.studio_submissions DROP CONSTRAINT IF EXISTS studio_submissions_status_check;
ALTER TABLE public.studio_submissions ADD CONSTRAINT studio_submissions_status_check CHECK (status IN ('pending','pending_review','approved','rejected'));
DROP POLICY IF EXISTS "public submit studio entry" ON public.studio_submissions;
CREATE POLICY "public submit studio entry" ON public.studio_submissions FOR INSERT TO anon, authenticated WITH CHECK (kind <> 'creative_dump' AND status = 'pending' AND reviewed_at IS NULL AND rejection_reason IS NULL);