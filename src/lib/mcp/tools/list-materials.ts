import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_materials",
  title: "List course materials",
  description:
    "List published H-Visuals class materials the signed-in student can access, optionally filtered by track, level or week.",
  inputSchema: {
    track: z.enum(["Graphic Design", "Video Editing"]).optional().describe("Filter by training track."),
    level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional().describe("Filter by level."),
    week: z.number().int().min(1).optional().describe("Filter by week number."),
    limit: z.number().int().min(1).max(100).default(25).describe("Maximum rows to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ track, level, week, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("materials")
      .select("id, title, description, kind, track, level, week, points, external_url, published")
      .eq("published", true)
      .order("week", { ascending: true })
      .limit(limit ?? 25);

    if (track) query = query.eq("track", track);
    if (level) query = query.eq("level", level);
    if (week) query = query.eq("week", week);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { materials: data ?? [] },
    };
  },
});
