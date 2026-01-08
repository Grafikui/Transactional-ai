
"use client";
import DashboardWidgets from "./components/DashboardWidgets";
import RecentTransactionsTable from "./components/RecentTransactionsTable";
import { RecentLogsTable } from "./components/RecentLogsTable";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Ops Console Dashboard</h1>
      <DashboardWidgets />
      <RecentTransactionsTable />
      <RecentLogsTable />
    </div>
  );
}
