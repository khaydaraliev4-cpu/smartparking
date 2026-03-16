"use client";

import { useState } from "react";

type Item = {
  id: string;
  name: string;
  imageUrl: string;
  availableFloor: string;
  availableRow: string;
  availableSpot: string;
  lat: number;
  lng: number;
};

export function ParkingSearch({ type = "car" }: { type?: "car" | "truck" }) {
  const [filters, setFilters] = useState({ country: "", region: "", city: "", name: "" });
  const [items, setItems] = useState<Item[]>([]);

  const load = async (recommend = false) => {
    const path = recommend ? `/api/${type === "truck" ? "truck" : "parking"}/recommend` : `/api/${type === "truck" ? "truck" : "parking"}/search`;
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters)
    });
    const json = await res.json();
    setItems(json.items || []);
  };

  return (
    <section className="space-y-4">
      <div className="glass rounded-2xl p-4">
        <div className="grid gap-2 md:grid-cols-4">
          {Object.keys(filters).map((k) => (
            <input
              key={k}
              className="rounded-xl bg-white/50 p-2 dark:bg-slate-900/40"
              placeholder={k}
              value={filters[k as keyof typeof filters]}
              onChange={(e) => setFilters((p) => ({ ...p, [k]: e.target.value }))}
            />
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => load(false)} className="rounded-xl bg-cyan-500 px-4 py-2 text-white">Search</button>
          <button onClick={() => load(true)} className="rounded-xl border border-cyan-500 px-4 py-2">Recommend nearest</button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="glass rounded-2xl p-4">
            <img src={item.imageUrl} alt={item.name} className="h-36 w-full rounded-xl object-cover" />
            <h4 className="mt-2 text-lg font-semibold">{item.name}</h4>
            <p className="text-sm">Floor: {item.availableFloor}, Row: {item.availableRow}, Spot: {item.availableSpot}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => fetch(`/api/${type === "truck" ? "truck" : "parking"}/reserve`, { method: "POST", body: JSON.stringify({ locationId: item.id }) })}
                className="rounded-xl bg-emerald-500 px-3 py-1 text-white"
              >
                Reserve
              </button>
              <button
                onClick={() => fetch(`/api/${type === "truck" ? "truck" : "parking"}/cancel`, { method: "POST", body: JSON.stringify({ locationId: item.id }) })}
                className="rounded-xl border border-rose-400 px-3 py-1"
              >
                Cancel reservation
              </button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`}
                target="_blank"
                className="rounded-xl border border-indigo-400 px-3 py-1"
              >
                Map
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
