import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_my_progress",
  title: "List my progress",
  description:
    "List the signed-in student's progress records: completed materials, submissions and scores.",
  inputSchema: {
    only_completed: z.boolean().default(false).describe("Return only completed items."),
    limit: z.number().int().min(1).max(100).default(50).describe("Maximum rows to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ only_completed, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("student_progress")
      .select("id, material_id, completed, score, submission_url, submitted_at, materials(title, track, level, week)")
      .eq("user_id", ctx.getUserId()!)
      .order("created_at", { ascending: false })
      .limit(limit ?? 50);

    if (only_completed) query = query.eq("completed", true);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { progress: data ?? [] },
    };
  },
});
