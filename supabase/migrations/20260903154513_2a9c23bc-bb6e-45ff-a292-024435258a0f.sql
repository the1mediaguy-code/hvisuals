create schema if not exists private;
grant usage on schema private to authenticated, service_role;

create or replace function private.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;
revoke all on function private.has_role(uuid, public.app_role) from public, anon;
grant execute on function private.has_role(uuid, public.app_role) to authenticated, service_role;

-- user_roles
drop policy "own roles readable" on public.user_roles;
create policy "own roles readable" on public.user_roles for select to authenticated
  using ((user_id = auth.uid()) or private.has_role(auth.uid(), 'admin'));
drop policy "admins manage roles" on public.user_roles;
create policy "admins manage roles" on public.user_roles for all to authenticated
  using (private.has_role(auth.uid(), 'admin')) with check (private.has_role(auth.uid(), 'admin'));

-- students
drop policy "students read own" on public.students;
create policy "students read own" on public.students for select to authenticated
  using ((user_id = auth.uid()) or private.has_role(auth.uid(), 'admin'));
drop policy "students update own" on public.students;
create policy "students update own" on public.students for update to authenticated
  using ((user_id = auth.uid()) or private.has_role(auth.uid(), 'admin'))
  with check ((user_id = auth.uid()) or private.has_role(auth.uid(), 'admin'));
drop policy "admins delete students" on public.students;
create policy "admins delete students" on public.students for delete to authenticated
  using (private.has_role(auth.uid(), 'admin'));

-- materials
drop policy "materials readable by members" on public.materials;
create policy "materials readable by members" on public.materials for select to authenticated
  using (published or private.has_role(auth.uid(), 'admin'));
drop policy "admins manage materials" on public.materials;
create policy "admins manage materials" on public.materials for all to authenticated
  using (private.has_role(auth.uid(), 'admin')) with check (private.has_role(auth.uid(), 'admin'));

-- student_progress
drop policy "progress own read" on public.student_progress;
create policy "progress own read" on public.student_progress for select to authenticated
  using ((user_id = auth.uid()) or private.has_role(auth.uid(), 'admin'));
drop policy "progress own update" on public.student_progress;
create policy "progress own update" on public.student_progress for update to authenticated
  using ((user_id = auth.uid()) or private.has_role(auth.uid(), 'admin'))
  with check ((user_id = auth.uid()) or private.has_role(auth.uid(), 'admin'));

-- student_verifications
drop policy "verif own read" on public.student_verifications;
create policy "verif own read" on public.student_verifications for select to authenticated
  using ((user_id = auth.uid()) or private.has_role(auth.uid(), 'admin'));
drop policy "verif admin update" on public.student_verifications;
create policy "verif admin update" on public.student_verifications for update to authenticated
  using (private.has_role(auth.uid(), 'admin')) with check (private.has_role(auth.uid(), 'admin'));

-- preorders
drop policy "preorders read own or admin" on public.preorders;
create policy "preorders read own or admin" on public.preorders for select to authenticated
  using ((user_id = auth.uid()) or private.has_role(auth.uid(), 'admin'));
drop policy "preorders admin update" on public.preorders;
create policy "preorders admin update" on public.preorders for update to authenticated
  using (private.has_role(auth.uid(), 'admin')) with check (private.has_role(auth.uid(), 'admin'));

-- notify_signups
drop policy "notify admin read" on public.notify_signups;
create policy "notify admin read" on public.notify_signups for select to authenticated
  using (private.has_role(auth.uid(), 'admin'));

-- storage
drop policy "materials admin write" on storage.objects;
create policy "materials admin write" on storage.objects for insert to authenticated
  with check ((bucket_id = 'materials') and private.has_role(auth.uid(), 'admin'));
drop policy "materials admin update" on storage.objects;
create policy "materials admin update" on storage.objects for update to authenticated
  using ((bucket_id = 'materials') and private.has_role(auth.uid(), 'admin'));
drop policy "materials admin delete" on storage.objects;
create policy "materials admin delete" on storage.objects for delete to authenticated
  using ((bucket_id = 'materials') and private.has_role(auth.uid(), 'admin'));
drop policy "proofs own read" on storage.objects;
create policy "proofs own read" on storage.objects for select to authenticated
  using ((bucket_id = 'proofs') and (((storage.foldername(name))[1] = (auth.uid())::text) or private.has_role(auth.uid(), 'admin')));

drop function if exists public.has_role(uuid, public.app_role);