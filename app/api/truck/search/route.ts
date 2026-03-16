import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { country, region, city, name } = await request.json();
  const items = await prisma.parkingLocation.findMany({
    where: {
      type: "TRUCK",
      reservedByUserId: null,
      country: { contains: country || "", mode: "insensitive" },
      region: { contains: region || "", mode: "insensitive" },
      city: { contains: city || "", mode: "insensitive" },
      name: { contains: name || "", mode: "insensitive" }
    },
    take: 30
  });
  return Response.json({ items });
}
