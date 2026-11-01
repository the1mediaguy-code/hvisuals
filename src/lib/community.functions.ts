import { createServerFn } from "@tanstack/react-start";

const SITE = "https://hvisuals.lovable.app";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Source = "focal_waitlist" | "creative_resources" | "creative_dump_updates" | "training_updates";
const SOURCES: Source[] = ["focal_waitlist", "creative_resources", "creative_dump_updates", "training_updates"];

function cleanEmail(v: unknown) {
  const e = String(v ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(e) || e.length > 254) throw new Error("Please enter a valid email");
  return e;
}
function cleanText(v: unknown, max: number) { return String(v ?? "").trim().slice(0, max); }

export const subscribe = createServerFn({ method: "POST" })
  .inputValidator((input: { source: Source; name?: string; email: string }) => {
    if (!SOURCES.includes(input?.source)) throw new Error("Invalid form");
    return { source: input.source, name: cleanText(input.name, 200) || null, email: cleanEmail(input.email) };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("audience_signups").insert(data);
    const duplicate = error?.code === "23505";
    if (error && !duplicate) throw new Error("We couldn't save your details. Please try again.");
    if (data.source === "training_updates" && !duplicate) {
      const { sendEmail, notifyOwner } = await import("@/services/emailService");
      const name = data.name ?? "there";
      await settleEmails([
        sendEmail({ to: data.email, subject: "You're in — H-Visuals Training Updates", text: `Hey ${name},\n\nYou're now on the H-Visuals training list. You'll hear from us first when new free sessions drop — and when paid events open up, you'll get early access before anyone else.\n\nStay creative.\n— Emmanuel, H-Visuals` }),
        notifyOwner("New training signup", `Name: ${data.name ?? "—"}\nEmail: ${data.email}\nTime: ${new Date().toISOString()}`),
      ]);
    }
    return { ok: true };
  });

// Email delivery must never break a user-facing flow; failures are logged server-side only.
async function settleEmails(jobs: Promise<unknown>[]) {
  const results = await Promise.allSettled(jobs);
  results.forEach(r => { if (r.status === "rejected") console.error("Email job failed", r.reason); else if ((r.value as { sent?: boolean })?.sent === false) console.error("Email not delivered", (r.value as { error?: string }).error); });
}

type Verdict = { approved: boolean; reason: string };

async function moderate(title: string, content: string): Promise<Verdict | null> {
  const words = content.split(/\s+/).filter(Boolean).length;
  if (words < 150) {
    return { approved: false, reason: `Your piece is currently ${words} word${words === 1 ? "" : "s"} — we ask for at least 150 so readers get a fully developed thought. Try expanding your main idea with a concrete example, what you noticed, or why it matters to you.${content ? "" : " If you shared only a draft link, please paste the text into the Written Content box as well."}` };
  }
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return null;
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low" },
        instructions: "You moderate The Creative Dump, an open writing platform for creatives (reviews, criticism, process writing, reflections, creative industry commentary). Approve only if ALL pass: (1) relevance — creative writing or creative-industry commentary, not spam, promotion or off-topic; (2) basic quality — coherent, readable, has a point of view; (3) safety — no hate speech, harassment, explicit content, or obvious plagiarism signals. If rejecting, write the reason directly to the author in 2–3 warm, specific, constructive sentences naming exactly what to fix. If approving, reason is a one-line note.",
        input: [{ role: "user", content: `Title: ${title}\n\n${content}` }],
        text: { format: { type: "json_schema", name: "verdict", strict: true, schema: { type: "object", additionalProperties: false, required: ["approved", "reason"], properties: { approved: { type: "boolean" }, reason: { type: "string" } } } } },
      }),
    });
    if (!res.ok || !res.body) { console.error(`Moderation failed [${res.status}]: ${await res.text()}`); return null; }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "", out = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n"); buf = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try { const ev = JSON.parse(payload); if (ev.type === "response.output_text.delta") out += ev.delta; } catch { /* ignore */ }
      }
    }
    const v = JSON.parse(out) as Verdict;
    return typeof v.approved === "boolean" ? v : null;
  } catch (e) { console.error("Moderation error", e); return null; }
}

export const submitCreativeDump = createServerFn({ method: "POST" })
  .inputValidator((input: { name: string; email: string; title: string; content?: string; draft?: string }) => {
    const name = cleanText(input?.name, 200), title = cleanText(input?.title, 200);
    if (!name || !title) throw new Error("Name and title are required");
    const draft = cleanText(input.draft, 1000);
    if (draft && !/^https?:\/\//i.test(draft)) throw new Error("Draft link must start with http");
    return { name, title, email: cleanEmail(input.email), content: cleanText(input.content, 12000), draft };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin.from("studio_submissions")
      .insert({ kind: "creative_dump", name: data.name, email: data.email, status: "pending_review", details: { title: data.title, content: data.content, draft: data.draft } })
      .select("id").single();
    if (error || !row) throw new Error("Your submission wasn't saved. Please try again.");

    const verdict = await moderate(data.title, data.content);
    const { sendEmail, notifyOwner } = await import("@/services/emailService");
    if (!verdict) {
      await settleEmails([notifyOwner("Creative Dump: needs manual review", `AI moderation was unavailable.\n\nTitle: ${data.title}\nFrom: ${data.name} <${data.email}>\n\n${data.content || data.draft}`)]);
      return { status: "pending_review" as const, reason: null };
    }
    const status = verdict.approved ? "approved" : "rejected";
    await supabaseAdmin.from("studio_submissions").update({ status, rejection_reason: verdict.approved ? null : verdict.reason, reviewed_at: new Date().toISOString(), moderated_by: "ai" }).eq("id", row.id);
    const link = `${SITE}/infovibes#piece-${row.id}`;
    await settleEmails([
      verdict.approved
        ? sendEmail({ to: data.email, subject: "Your piece is live on The Creative Dump 🎉", text: `Hey ${data.name},\n\nYour piece "${data.title}" has been reviewed and is now live on The Creative Dump. Thank you for contributing.\n\nRead it here: ${link}\n\n— The H-Visuals Team` })
        : sendEmail({ to: data.email, subject: "Your Creative Dump submission — needs a little work", text: `Hey ${data.name},\n\nThanks for submitting "${data.title}" to The Creative Dump.\n\nAfter review, we weren't able to publish it this time. Here's why:\n\n${verdict.reason}\n\nYou're welcome to revise and resubmit anytime. We want to see your work here.\n\n— The H-Visuals Team` }),
      notifyOwner(`Creative Dump: ${status}`, `Title: ${data.title}\nFrom: ${data.name} <${data.email}>\nDecision: ${status}\nNote: ${verdict.reason}\n${verdict.approved ? link : ""}`),
    ]);
    return { status, reason: verdict.approved ? null : verdict.reason };
  });

async function sign(payload: string) {
  const secret = process.env["SUBMISSIONS_LINK_SECRET"];
  if (!secret) throw new Error("Not configured");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)));
  return btoa(String.fromCharCode(...sig)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Email lookup without login: we email a signed, 24h link instead of showing results to whoever types an address.
export const requestSubmissionsLink = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string }) => ({ email: cleanEmail(input?.email) }))
  .handler(async ({ data }) => {
    const exp = Date.now() + 24 * 3600 * 1000;
    const payload = btoa(JSON.stringify({ e: data.email, x: exp })).replace(/=+$/, "");
    const token = `${payload}.${await sign(payload)}`;
    const { sendEmail } = await import("@/services/emailService");
    await settleEmails([sendEmail({ to: data.email, subject: "Your Creative Dump submissions", text: `Here's your private link to see all your Creative Dump submissions and their status (valid for 24 hours):\n\n${SITE}/my-submissions?token=${encodeURIComponent(token)}\n\nIf you didn't ask for this, you can ignore this email.\n\n— The H-Visuals Team` })]);
    return { ok: true };
  });

export const getMySubmissions = createServerFn({ method: "POST" })
  .inputValidator((input: { token: string }) => ({ token: cleanText(input?.token, 2000) }))
  .handler(async ({ data }) => {
    const [payload, sig] = data.token.split(".");
    if (!payload || !sig || (await sign(payload)) !== sig) throw new Error("This link is invalid.");
    const { e, x } = JSON.parse(atob(payload)) as { e: string; x: number };
    if (Date.now() > x) throw new Error("This link has expired. Request a new one.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin.from("studio_submissions").select("id,details,status,rejection_reason,created_at").eq("kind", "creative_dump").eq("email", e).order("created_at", { ascending: false });
    return { email: e, submissions: (rows ?? []).map(r => ({ id: r.id, title: String((r.details as any)?.title ?? "Untitled"), status: r.status, reason: r.rejection_reason, created_at: r.created_at })) };
  });
