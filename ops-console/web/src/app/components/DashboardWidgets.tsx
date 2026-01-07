import React from "react";

const stats = [
  { label: "Total Transactions", value: 128 },
  { label: "Committed", value: 110 },
  { label: "Rolled Back", value: 12 },
  { label: "Pending Approvals", value: 6 },
];

export default function DashboardWidgets() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg bg-zinc-100 dark:bg-zinc-900 p-6 shadow text-center"
        >
          <div className="text-3xl font-bold mb-2">{stat.value}</div>
          <div className="text-zinc-600 dark:text-zinc-300 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
