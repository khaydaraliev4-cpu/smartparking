"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  return (
    <form
      className="mx-auto max-w-md space-y-3 rounded-2xl glass p-6"
      onSubmit={(e) => {
        e.preventDefault();
        fetch("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      }}
    >
      <h1 className="text-2xl font-semibold">Forgot Password</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl bg-white/50 p-2 dark:bg-slate-900/40" />
      <button className="w-full rounded-xl bg-cyan-500 py-2 text-white">Send reset link</button>
    </form>
  );
}
