import { createToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sixDigitCode } from "@/lib/validation";

export async function POST(request: Request) {
  const { pendingUserId, code } = await request.json();
  if (!sixDigitCode(code)) return Response.json({ error: "Code must be 6 digits." }, { status: 400 });

  const verification = await prisma.emailVerification.findFirst({
    where: { userId: pendingUserId, code, usedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" }
  });

  if (!verification) return Response.json({ error: "Invalid code." }, { status: 400 });

  await prisma.$transaction([
    prisma.emailVerification.update({ where: { id: verification.id }, data: { usedAt: new Date() } }),
    prisma.user.update({ where: { id: pendingUserId }, data: { verifiedAt: new Date() } })
  ]);

  const token = createToken(pendingUserId);
  const response = Response.json({ ok: true });
  response.headers.set("Set-Cookie", `smartparking_token=${token}; Path=/; HttpOnly; SameSite=Lax`);
  return response;
}
