import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

const plans: Record<string, { amount: number; days: number }> = {
  "1 day": { amount: 20000, days: 1 },
  "1 week": { amount: 100000, days: 7 },
  "1 month": { amount: 400000, days: 30 }
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const plan = String(formData.get("plan"));
  const selected = plans[plan];
  if (!selected) return Response.json({ error: "Unknown plan" }, { status: 400 });

  const token = cookies().get("smartparking_token")?.value;
  const payload = token ? verifyToken(token) : null;
  if (!payload) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const paymentSuccess = true;
  if (!paymentSuccess) return Response.json({ error: "Payment failed" }, { status: 402 });

  await prisma.subscription.create({
    data: {
      userId: payload.sub,
      plan,
      amount: selected.amount,
      provider: "CLICK",
      status: "PAID",
      activeUntil: new Date(Date.now() + selected.days * 86400000)
    }
  });

  return Response.redirect(new URL("/dashboard", request.url));
}
