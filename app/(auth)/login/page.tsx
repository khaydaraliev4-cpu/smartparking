"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="mx-auto max-w-md space-y-3 rounded-2xl glass p-6"
      onSubmit={(e) => {
        e.preventDefault();
        fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      }}
    >
      <h1 className="text-2xl font-semibold">Login</h1>
      <input className="w-full rounded-xl bg-white/50 p-2 dark:bg-slate-900/40" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="w-full rounded-xl bg-white/50 p-2 dark:bg-slate-900/40" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="w-full rounded-xl bg-cyan-500 py-2 text-white">Log in</button>
      <Link href="/forgot-password" className="text-sm underline">Forgot password?</Link>
    </form>
  );
}
