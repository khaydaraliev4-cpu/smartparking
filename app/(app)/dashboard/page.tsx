import { ParkingSearch } from "@/components/ParkingSearch";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <section className="glass rounded-2xl p-5">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p>Profile, subscription status, and quick actions.</p>
      </section>
      <ParkingSearch type="car" />
      <section className="grid gap-3 md:grid-cols-3">
        {[
          ["1 day", "20,000 so’m"],
          ["1 week", "100,000 so’m"],
          ["1 month", "400,000 so’m"]
        ].map(([plan, amount]) => (
          <form key={plan} action="/api/subscriptions/buy" method="post" className="glass rounded-2xl p-4">
            <h3 className="font-semibold">{plan}</h3>
            <p>{amount}</p>
            <input type="hidden" name="plan" value={plan} />
            <button className="mt-3 rounded-xl bg-cyan-500 px-4 py-2 text-white">Buy</button>
          </form>
        ))}
      </section>
    </div>
  );
}
