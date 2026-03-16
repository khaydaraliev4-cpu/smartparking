"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", plate: "", password: "", confirmPassword: "", geolocationConsent: false });
  const [code, setCode] = useState("");
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-lg space-y-3 rounded-2xl glass p-6">
      <h1 className="text-2xl font-semibold">Register</h1>
      {Object.entries(form).filter(([k]) => !["geolocationConsent"].includes(k)).map(([k, v]) => (
        <input key={k} type={k.includes("password") ? "password" : "text"} placeholder={k} value={String(v)} onChange={(e) => setForm((p) => ({ ...p, [k]: e.target.value }))} className="w-full rounded-xl bg-white/50 p-2 dark:bg-slate-900/40" />
      ))}
      <label className="flex gap-2 text-sm"><input type="checkbox" checked={form.geolocationConsent} onChange={(e) => setForm((p) => ({ ...p, geolocationConsent: e.target.checked }))} /> I consent to geolocation permissions.</label>
      <button
        className="w-full rounded-xl bg-cyan-500 py-2 text-white"
        onClick={async () => {
          const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
          const data = await res.json();
          setPendingUserId(data.pendingUserId);
        }}
      >
        Verify
      </button>
      {pendingUserId && (
        <input
          maxLength={6}
          placeholder="6-digit code"
          className="w-full rounded-xl bg-white/50 p-2 dark:bg-slate-900/40"
          value={code}
          onChange={async (e) => {
            const v = e.target.value.replace(/\D/g, "");
            setCode(v);
            if (v.length === 6) {
              await fetch("/api/auth/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pendingUserId, code: v }) });
              window.location.href = "/dashboard";
            }
          }}
        />
      )}
    </div>
  );
}
