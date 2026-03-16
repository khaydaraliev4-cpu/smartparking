"use client";

import { useState } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <div className="space-y-4">
      <section className="glass rounded-2xl p-5">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <form
          className="mt-3 space-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message }) });
            setMessage("");
          }}
        >
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-xl bg-white/50 p-3 dark:bg-slate-900/40" />
          <button className="rounded-xl bg-cyan-500 px-4 py-2 text-white">Send</button>
        </form>
      </section>
      <section className="glass rounded-2xl p-5">
        <h3 className="text-xl font-semibold">AI Support Chat</h3>
        <div className="mt-2 flex gap-2">
          <input value={chat} onChange={(e) => setChat(e.target.value)} className="flex-1 rounded-xl bg-white/50 p-2 dark:bg-slate-900/40" />
          <button
            className="rounded-xl border px-3"
            onClick={async () => {
              const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: chat }) });
              const data = await res.json();
              setAnswer(data.answer);
            }}
          >
            Ask
          </button>
        </div>
        <p className="mt-3 text-sm">{answer}</p>
      </section>
    </div>
  );
}
