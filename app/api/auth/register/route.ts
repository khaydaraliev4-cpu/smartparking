import { prisma } from "@/lib/prisma";
import { isStrongPassword } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { sendVerificationCode } from "@/lib/email";
import { randomInt } from "crypto";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, plate, password, confirmPassword, geolocationConsent } = body;

  if (!geolocationConsent) return Response.json({ error: "Geolocation permission is required." }, { status: 400 });
  if (password !== confirmPassword) return Response.json({ error: "Passwords do not match." }, { status: 400 });
  if (!isStrongPassword(password)) return Response.json({ error: "Weak password." }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return Response.json({ error: "Email already used." }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { firstName, lastName, email, licensePlate: plate, passwordHash, geolocationConsent }
  });

  const code = String(randomInt(100000, 999999));
  await prisma.emailVerification.create({
    data: { userId: user.id, code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) }
  });
  await sendVerificationCode(email, code);

  return Response.json({ pendingUserId: user.id });
}
