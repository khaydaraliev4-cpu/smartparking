"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [locale, setLocale] = useState("en");

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl glass px-4 py-3">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/smartparking-logo.png" alt="SmartParking logo" width={36} height={36} className="rounded-xl" />
        <div>
          <p className="font-semibold tracking-wide">SmartParking</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">Aqlli avtoturargoh</p>
        </div>
      </Link>
      <nav className="hidden gap-4 md:flex">
        {[
          ["Home", "/"],
          ["Dashboard", "/dashboard"],
          ["Truck", "/truck"],
          ["Contact", "/contact"]
        ].map(([label, href]) => (
          <Link key={href} href={href} className="rounded-xl px-3 py-2 hover:bg-white/20">
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <LanguageSwitcher locale={locale} onChange={setLocale} />
        <ThemeToggle />
        <Link href="/login" className="rounded-xl bg-cyan-500 px-3 py-2 text-white">
          Account
        </Link>
      </div>
    </header>
  );
}
