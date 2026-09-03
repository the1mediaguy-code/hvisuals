import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_my_enrollment",
  title: "Get my enrollment",
  description:
    "Get the signed-in student's H-Visuals enrollment: track, level, payment status and whether portal access is active.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("students")
      .select("full_name, email, track, level, payment_status, access_active, amount_paid, enrolled_at")
      .eq("user_id", ctx.getUserId()!)
      .maybeSingle();

    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) {
      return { content: [{ type: "text", text: "No enrollment record found for this account yet." }] };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { enrollment: data },
    };
  },
});
