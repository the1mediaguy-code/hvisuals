CREATE POLICY "materials readable by signed in" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'materials');
CREATE POLICY "materials admin write" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'materials' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "materials admin update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'materials' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "materials admin delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'materials' AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "proofs own insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'proofs' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "proofs own read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'proofs' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(),'admin')));