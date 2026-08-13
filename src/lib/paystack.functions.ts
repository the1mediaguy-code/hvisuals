import { createServerFn } from "@tanstack/react-start";

export type CheckoutInput = {
  full_name: string;
  email: string;
  phone?: string;
  track?: "Graphic Design" | "Video Editing" | null;
  level?: "Beginner" | "Intermediate" | "Advanced" | null;
  plan: string;
  amount: number;
  is_student_special?: boolean;
  callback_url?: string;
};

export const startCheckout = createServerFn({ method: "POST" })
  .inputValidator((input: CheckoutInput) => {
    if (!input.email || !input.full_name) throw new Error("Name and email are required");
    if (!input.amount || input.amount < 100) throw new Error("Invalid amount");
    return input;
  })
  .handler(async ({ data }) => {
    const secret = process.env["PAYSTACK_SECRET_KEY"];
    if (!secret) throw new Error("Payment is not configured yet.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const reference = `hv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const { error } = await supabaseAdmin.from("preorders").insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone ?? null,
      track: data.track ?? null,
      level: data.level ?? null,
      plan: data.plan,
      amount: data.amount,
      reference,
      is_student_special: data.is_student_special ?? false,
    });
    if (error) throw new Error(error.message);

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        amount: data.amount * 100,
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
