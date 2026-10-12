// Server-only: import from server function handlers, never from components.
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const FROM = "H-Visuals <onboarding@resend.dev>";

export type EmailResult = { sent: boolean; error?: string };

export async function sendEmail(opts: { to: string; subject: string; text: string; replyTo?: string }): Promise<EmailResult> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const resendKey = process.env["RESEND_API_KEY"];
  if (!lovableKey || !resendKey) return { sent: false, error: "Email is not configured" };
  try {
    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": resendKey },
      body: JSON.stringify({ from: FROM, to: [opts.to], subject: opts.subject, text: opts.text, ...(opts.replyTo ? { reply_to: opts.replyTo } : {}) }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend send failed [${res.status}]: ${body}`);
      return { sent: false, error: `[${res.status}] ${body}` };
    }
    return { sent: true };
  } catch (e) {
    console.error("Resend send error", e);
    return { sent: false, error: "Network error" };
  }
}

export function notifyOwner(subject: string, text: string) {
  const to = process.env["ADMIN_NOTIFY_EMAIL"];
  if (!to) { console.warn("ADMIN_NOTIFY_EMAIL not set; skipping owner notification"); return Promise.resolve({ sent: false, error: "No owner email" }); }
  return sendEmail({ to, subject, text });
}
