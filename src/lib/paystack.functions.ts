import { createServerFn } from "@tanstack/react-start";

export type PlanId = "full" | "deposit" | "upgrade" | "self-paced";
type TrackName = "Graphic Design" | "Video Editing";
type LevelName = "Beginner" | "Intermediate" | "Advanced";

// Server-side source of truth for prices (naira). Never trust a client amount.
const PRICE_CATALOG: Record<
  TrackName,
  Record<LevelName, { full: number; deposit: number; upgrade?: number }>
> = {
  "Graphic Design": {
    Beginner: { full: 50000, deposit: 25000 },
    Intermediate: { full: 75000, deposit: 37500, upgrade: 25000 },
    Advanced: { full: 100000, deposit: 50000, upgrade: 25000 },
  },
  "Video Editing": {
    Beginner: { full: 80000, deposit: 40000 },
    Intermediate: { full: 100000, deposit: 50000, upgrade: 20000 },
    Advanced: { full: 150000, deposit: 75000, upgrade: 50000 },
  },
};

const SELF_PACED: Record<LevelName, { full: number; student: number }> = {
  Beginner: { full: 15000, student: 10500 },
  Intermediate: { full: 30000, student: 21000 },
  Advanced: { full: 45000, student: 31500 },
};

function resolveAmount(input: {
  plan: PlanId;
  track?: TrackName | null;
  level?: LevelName | null;
  is_student_special?: boolean;
}): number {
  const level = input.level;
  if (!level || !SELF_PACED[level]) throw new Error("Please choose a valid level");

  if (input.plan === "self-paced") {
    const row = SELF_PACED[level];
    return input.is_student_special ? row.student : row.full;
  }

  const track = input.track;
  if (!track || !PRICE_CATALOG[track]) throw new Error("Please choose a valid track");
  const row = PRICE_CATALOG[track][level];

  if (input.plan === "full") return row.full;
  if (input.plan === "deposit") return row.deposit;
  if (input.plan === "upgrade") {
    if (!row.upgrade) throw new Error("No upgrade price for this level");
    return row.upgrade;
  }
  throw new Error("Invalid plan");
}

export type CheckoutInput = {
  full_name: string;
  email: string;
  phone?: string;
  track?: TrackName | null;
  level?: LevelName | null;
  plan: PlanId;
  is_student_special?: boolean;
  callback_url?: string;
};

export const startCheckout = createServerFn({ method: "POST" })
  .inputValidator((input: CheckoutInput) => {
    if (!input?.email || !input?.full_name) throw new Error("Name and email are required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) throw new Error("Invalid email");
    if (input.full_name.length > 120 || input.email.length > 200) throw new Error("Input too long");
    if (!["full", "deposit", "upgrade", "self-paced"].includes(input.plan))
      throw new Error("Invalid plan");
    return input;
  })
  .handler(async ({ data }) => {
    const secret = process.env["PAYSTACK_SECRET_KEY"];
    if (!secret) throw new Error("Payment is not configured yet.");

    // Amount is derived server-side from the trusted catalog.
    const amount = resolveAmount(data);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const reference = `hv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const { error } = await supabaseAdmin.from("preorders").insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone ?? null,
      track: data.track ?? null,
      level: data.level ?? null,
      plan: data.plan,
      amount,
      reference,
      is_student_special: data.is_student_special ?? false,
    });
    if (error) throw new Error(error.message);


    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        amount: amount * 100,
        reference,
        callback_url: data.callback_url,
        metadata: { full_name: data.full_name, track: data.track, level: data.level, plan: data.plan },
      }),
    });
    const json = (await res.json()) as {
      status: boolean;
      message: string;
      data?: { authorization_url: string };
    };
    if (!json.status || !json.data) throw new Error(json.message || "Could not start payment");
    return { authorization_url: json.data.authorization_url, reference };
  });

export const verifyPayment = createServerFn({ method: "POST" })
  .inputValidator((input: { reference: string }) => {
    if (!input?.reference) throw new Error("Missing reference");
    return input;
  })
  .handler(async ({ data }) => {
    const secret = process.env["PAYSTACK_SECRET_KEY"];
    if (!secret) throw new Error("Payment is not configured yet.");

    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(data.reference)}`,
      { headers: { Authorization: `Bearer ${secret}` } },
    );
    const json = (await res.json()) as {
      status: boolean;
      data?: { status: string; amount: number; customer?: { email?: string } };
    };
    const paid = Boolean(json.status && json.data?.status === "success");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order } = await supabaseAdmin
      .from("preorders")
      .update({ payment_status: paid ? "paid" : "failed" })
      .eq("reference", data.reference)
      .select("*")
      .maybeSingle();

    if (paid && order) {
      await supabaseAdmin
        .from("students")
        .update({
          payment_status: order.plan === "deposit" ? "part-paid" : "paid",
          amount_paid: order.amount,
          track: order.track,
          level: order.level,
          access_active: true,
          enrolled_at: new Date().toISOString(),
        })
        .eq("email", order.email);
    }

    return { paid, amount: order?.amount ?? 0, email: order?.email ?? null };
  });
