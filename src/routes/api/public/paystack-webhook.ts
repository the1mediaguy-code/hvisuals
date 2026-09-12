import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

export const Route = createFileRoute("/api/public/paystack-webhook")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["PAYSTACK_SECRET_KEY"];
        if (!secret) return new Response("Not configured", { status: 500 });

        const body = await request.text();
        const signature = request.headers.get("x-paystack-signature") ?? "";
        const expected = createHmac("sha512", secret).update(body).digest("hex");
        const sig = Buffer.from(signature);
        const exp = Buffer.from(expected);
        if (sig.length !== exp.length || !timingSafeEqual(sig, exp)) {
          return new Response("Invalid signature", { status: 401 });
        }

        const event = JSON.parse(body) as {
          event: string;
          data?: { reference?: string; status?: string; amount?: number };
        };

        if (event.event === "charge.success" && event.data?.reference) {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data: order } = await supabaseAdmin
            .from("preorders")
            .update({ payment_status: "paid" })
            .eq("reference", event.data.reference)
            .select("*")
            .maybeSingle();

          if (order) {
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
        }

        return new Response("ok");
      },
    },
  },
});
