import { prisma } from "@/lib/prisma";

export async function POST() {
  const item = await prisma.parkingLocation.findFirst({ where: { type: "TRUCK", reservedByUserId: null } });
  return Response.json({ items: item ? [item] : [] });
}
