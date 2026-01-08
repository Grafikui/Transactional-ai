"use client";
import RecentTransactionsTable from "../components/RecentTransactionsTable";

export default function TransactionsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <p className="text-zinc-600 dark:text-zinc-300">View and inspect all transactional agent runs here. (MVP placeholder)</p>
      <RecentTransactionsTable />
    </div>
  );
}
