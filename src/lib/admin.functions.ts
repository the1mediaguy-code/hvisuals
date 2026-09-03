import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function isAdmin(context: { supabase: any; userId: string }) {
  const { data } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId)
    .eq("role", "admin")
    .maybeSingle();
  return Boolean(data);
}

async function assertAdmin(context: { supabase: any; userId: string }) {
  if (!(await isAdmin(context))) throw new Error("Forbidden");
}

/**
 * One-time bootstrap: only works while no admin exists yet, and requires the
 * ADMIN_BOOTSTRAP_TOKEN secret (never stored in source). Existing admins grant
 * further admins with grantAdmin.
 */
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { passcode: string }) => {
    if (!input?.passcode || typeof input.passcode !== "string" || input.passcode.length > 200) {
      throw new Error("Invalid passcode");
    }
    return input;
  })
  .handler(async ({ data, context }) => {
    const token = process.env["ADMIN_BOOTSTRAP_TOKEN"];
    if (!token) throw new Error("Admin bootstrap is not configured");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if ((count ?? 0) > 0) throw new Error("Forbidden");
    if (data.passcode !== token) throw new Error("Forbidden");

    const { error } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: context.userId, role: "admin" }, { onConflict: "user_id,role" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const grantAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { user_id: string }) => {
    if (!/^[0-9a-f-]{36}$/i.test(input?.user_id ?? "")) throw new Error("Invalid user id");
    return input;
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("user_roles")
      .upsert({ user_id: data.user_id, role: "admin" }, { onConflict: "user_id,role" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });


export const getAdminData = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabase } = context;
    const [students, preorders, verifications, materials, notify] = await Promise.all([
      supabase.from("students").select("*").order("created_at", { ascending: false }),
      supabase.from("preorders").select("*").order("created_at", { ascending: false }),
      supabase.from("student_verifications").select("*").order("created_at", { ascending: false }),
      supabase.from("materials").select("*").order("week", { ascending: true }),
      supabase.from("notify_signups").select("*").order("created_at", { ascending: false }),
    ]);
    return {
      students: students.data ?? [],
      preorders: preorders.data ?? [],
      verifications: verifications.data ?? [],
      materials: materials.data ?? [],
      notify: notify.data ?? [],
    };
  });

export const updateStudent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      id: string;
      access_active?: boolean;
      payment_status?: string;
      level?: "Beginner" | "Intermediate" | "Advanced";
      track?: "Graphic Design" | "Video Editing";
    }) => input,
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...patch } = data;
    const { error } = await context.supabase.from("students").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reviewVerification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: "approved" | "rejected"; admin_note?: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("student_verifications")
      .update({ status: data.status, admin_note: data.admin_note ?? null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);

    if (data.status === "approved") {
      const { data: row } = await context.supabase
        .from("student_verifications")
        .select("user_id, to_level")
        .eq("id", data.id)
        .maybeSingle();
      if (row?.to_level) {
        await context.supabase
          .from("students")
          .update({ level: row.to_level, access_active: true })
          .eq("user_id", row.user_id);
      }
    }
    return { ok: true };
  });

export const saveMaterial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      id?: string;
      title: string;
      description?: string | null;
      track?: "Graphic Design" | "Video Editing" | null;
      level: "Beginner" | "Intermediate" | "Advanced";
      week: number;
      kind: string;
      external_url?: string | null;
      file_path?: string | null;
      published: boolean;
    }) => input,
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = data.id
      ? await context.supabase.from("materials").update(data).eq("id", data.id)
      : await context.supabase.from("materials").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteMaterial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("materials").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
