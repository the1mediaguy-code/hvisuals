import { auth, defineMcp } from "@lovable.dev/mcp-js";
import type { AnyToolDefinition } from "@lovable.dev/mcp-js";
import getMyEnrollment from "./tools/get-my-enrollment";
import listMaterials from "./tools/list-materials";
import listMyProgress from "./tools/list-my-progress";
import markMaterialComplete from "./tools/mark-material-complete";

const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "h-visuals-creative-training",
  title: "H-Visuals Creative Training",
  version: "0.1.0",
  instructions:
    "Tools for the H-Visuals Creative Training student portal. Use `get_my_enrollment` for the signed-in student's track, level and access status, `list_materials` to browse published class materials, `list_my_progress` to review their work, and `mark_material_complete` to record a completed material.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMyEnrollment, listMaterials, listMyProgress, markMaterialComplete] as unknown as AnyToolDefinition[],
});
