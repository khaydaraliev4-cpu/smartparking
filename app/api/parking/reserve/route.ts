import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function POST(request: Request) {
  const token = cookies().get("smartparking_token")?.value;
  const payload = token ? verifyToken(token) : null;
  if (!payload) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { locationId } = await request.json();

  try {
    const updated = await prisma.parkingLocation.update({
      where: { id: locationId, reservedByUserId: null },
      data: { reservedByUserId: payload.sub }
    });

    await prisma.reservation.create({
      data: { userId: payload.sub, parkingLocationId: updated.id }
    });

    return Response.json({ ok: true, status: "Reserved" });
  } catch {
    return Response.json({ error: "Already reserved." }, { status: 409 });
  }
}
