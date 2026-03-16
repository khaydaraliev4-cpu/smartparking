import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl glass p-8 md:p-12">
        <div className="absolute left-4 top-4 animate-float text-sm brand-sweep">Made by Xayrullo Fazliddinov.</div>
        <h1 className="max-w-3xl text-4xl font-bold md:text-6xl brand-sweep">Aqlli avtoturargoh: parking reimagined for modern cities and highways.</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700 dark:text-slate-200">
          SmartParking lets drivers and fleet operators discover, reserve, and navigate to available spaces with anti-double booking and smart location intelligence.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/register" className="rounded-2xl bg-cyan-500 px-5 py-3 text-white">Register</Link>
          <Link href="/login" className="rounded-2xl border border-cyan-400 px-5 py-3">Login</Link>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {["Global search", "Truck-ready", "Smart subscriptions"].map((f) => (
          <div key={f} className="glass rounded-2xl p-5">
            <h3 className="text-xl font-semibold">{f}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Premium flow with polished motion, intuitive controls, and secure backend logic.</p>
          </div>
        ))}
      </section>
    </div>
  );
}
