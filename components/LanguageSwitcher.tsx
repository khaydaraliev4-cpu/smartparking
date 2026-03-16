"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

const languages = [
  ["en", "English"],
  ["uz", "O'zbek"],
  ["tr", "Türkçe"],
  ["de", "Deutsch"],
  ["fr", "Français"],
  ["ar", "العربية"]
];

export function LanguageSwitcher({ locale, onChange }: { locale: string; onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => languages.filter(([, name]) => name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="relative">
      <button onClick={() => setOpen((p) => !p)} className="rounded-xl px-2 py-1 hover:bg-white/20">
        {locale.toUpperCase()}
      </button>
      {open && (
        <div className="absolute right-0 top-10 w-48 rounded-2xl glass p-2">
          <div className="mb-2 flex items-center gap-2 rounded-xl bg-white/40 px-2 py-1 dark:bg-slate-900/40">
            <Search size={14} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm outline-none" />
          </div>
          {filtered.map(([code, name]) => (
            <button
              key={code}
              className="block w-full rounded-xl px-2 py-1 text-left hover:bg-white/20"
              onClick={() => {
                onChange(code);
                setOpen(false);
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
