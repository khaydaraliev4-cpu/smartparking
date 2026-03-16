import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  const token = cookies().get("smartparking_token")?.value;
  const payload = token ? verifyToken(token) : null;
  if (!payload) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { locationId } = await request.json();
  await prisma.$transaction([
    prisma.parkingLocation.updateMany({ where: { id: locationId, reservedByUserId: payload.sub }, data: { reservedByUserId: null } }),
    prisma.reservation.updateMany({ where: { userId: payload.sub, parkingLocationId: locationId, releasedAt: null }, data: { releasedAt: new Date() } })
  ]);

  return Response.json({ ok: true, status: "Released" });
}
