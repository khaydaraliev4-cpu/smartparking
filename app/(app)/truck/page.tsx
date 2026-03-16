import { ParkingSearch } from "@/components/ParkingSearch";

export default function TruckPage() {
  return (
    <div className="space-y-4">
      <section className="glass rounded-2xl p-5">
        <h2 className="text-2xl font-semibold">Truck Parking</h2>
      </section>
      <ParkingSearch type="truck" />
    </div>
  );
}
