import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "mark_material_complete",
  title: "Mark material complete",
  description:
    "Mark a class material as completed for the signed-in student, optionally attaching a submission link.",
  inputSchema: {
    material_id: z.string().uuid().describe("ID of the material (from list_materials)."),
    submission_url: z.string().url().optional().describe("Optional link to the submitted work."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ material_id, submission_url }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const userId = ctx.getUserId()!;

    const { data: existing, error: findError } = await supabase
      .from("student_progress")
      .select("id")
      .eq("user_id", userId)
      .eq("material_id", material_id)
      .maybeSingle();
    if (findError) return { content: [{ type: "text", text: findError.message }], isError: true };

    const payload = {
      completed: true,
      submitted_at: new Date().toISOString(),
      ...(submission_url ? { submission_url } : {}),
    };

    const { data, error } = existing
      ? await supabase.from("student_progress").update(payload).eq("id", existing.id).select().maybeSingle()
      : await supabase
          .from("student_progress")
          .insert({ user_id: userId, material_id, ...payload })
          .select()
          .maybeSingle();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { progress: data },
    };
  },
});
