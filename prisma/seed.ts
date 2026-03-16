import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.parkingLocation.createMany({
    data: [
      {
        type: "CAR",
        name: "Skyline Central Parking",
        country: "Uzbekistan",
        region: "Tashkent",
        city: "Tashkent",
        imageUrl: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop",
        availableFloor: "2",
        availableRow: "B",
        availableSpot: "17",
        lat: 41.3111,
        lng: 69.2797
      },
      {
        type: "TRUCK",
        name: "Highway Truck Hub",
        country: "Uzbekistan",
        region: "Samarkand",
        city: "Samarkand",
        imageUrl: "https://images.unsplash.com/photo-1616432437348-0cac44553f7b?q=80&w=1200&auto=format&fit=crop",
        availableFloor: "Ground",
        availableRow: "T1",
        availableSpot: "05",
        lat: 39.6542,
        lng: 66.9597
      }
    ],
    skipDuplicates: true
  });
}

main().finally(() => prisma.$disconnect());
