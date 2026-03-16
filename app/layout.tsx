import "./globals.css";
import { ReactNode } from "react";
import { Header } from "@/components/Header";

export const metadata = {
  title: "SmartParking",
  description: "Global premium parking reservation platform"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-8">{children}</main>
      </body>
    </html>
  );
}
