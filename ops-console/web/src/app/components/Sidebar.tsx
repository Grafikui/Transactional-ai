import React from "react";
import Link from "next/link";

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Transactions", href: "/transactions" },
  { name: "Logs", href: "/logs" },
  { name: "Replay", href: "/replay" },
  { name: "Approvals", href: "/approvals" },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-56 bg-zinc-900 text-zinc-100 flex flex-col py-8 px-4 border-r border-zinc-800">
      <div className="mb-8 text-2xl font-bold tracking-tight">Ops Console</div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="rounded px-3 py-2 hover:bg-zinc-800 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto text-xs text-zinc-500 pt-8">MVP Build</div>
    </aside>
  );
}
