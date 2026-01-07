"use client";
import React from "react";


import { useEffect, useState } from "react";

type Transaction = {
  id: string;
  agent: string;
  state: string;
  started: string;
};

export default function RecentTransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions);
  }, []);
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-zinc-200 dark:bg-zinc-800">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Agent</th>
              <th className="px-4 py-2 text-left">State</th>
              <th className="px-4 py-2 text-left">Started</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="px-4 py-2 font-mono">{txn.id}</td>
                <td className="px-4 py-2">{txn.agent}</td>
                <td className="px-4 py-2">{txn.state}</td>
                <td className="px-4 py-2">{txn.started}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
