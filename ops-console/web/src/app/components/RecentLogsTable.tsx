"use client";
import React from "react";


import { useEffect, useState } from "react";

type Log = {
  id: string;
  txn: string;
  message: string;
  time: string;
};


export function RecentLogsTable() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [search, setSearch] = useState("");
  const [txnFilter, setTxnFilter] = useState("");
  const [selected, setSelected] = useState<Log | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/logs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load logs");
        return res.json();
      })
      .then(setLogs)
      .catch((err) => setError(err.message));
  }, []);

  const filtered = logs.filter((log) => {
    const matchesSearch =
      search === "" ||
      log.id.includes(search) ||
      log.message?.toLowerCase().includes(search.toLowerCase());
    const matchesTxn = txnFilter === "" || log.txn === txnFilter;
    return matchesSearch && matchesTxn;
  });

  const uniqueTxns = Array.from(new Set(logs.map((l) => l.txn).filter(Boolean)));

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Recent Logs</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          Error loading logs: {error}
        </div>
      )}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Log ID or Message"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-48"
        />
        <select
          value={txnFilter}
          onChange={(e) => setTxnFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Transactions</option>
          {uniqueTxns.map((txn) => (
            <option key={txn} value={txn}>{txn}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-zinc-200 dark:bg-zinc-800">
              <th className="px-4 py-2 text-left">Log ID</th>
              <th className="px-4 py-2 text-left">Transaction</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr
                key={log.id}
                className="border-b border-zinc-100 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900"
                onClick={() => setSelected(log)}
              >
                <td className="px-4 py-2 font-mono">{log.id}</td>
                <td className="px-4 py-2 font-mono">{log.txn}</td>
                <td className="px-4 py-2">{log.message}</td>
                <td className="px-4 py-2">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    {selected && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-zinc-900 rounded shadow-lg p-6 w-full max-w-md relative">
          <button
            className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-800"
            onClick={() => setSelected(null)}
          >
            &times;
          </button>
          <h3 className="text-lg font-bold mb-4">Log Details</h3>
          <div className="space-y-2">
            <div><span className="font-semibold">Log ID:</span> <span className="font-mono">{selected.id}</span></div>
            <div><span className="font-semibold">Transaction:</span> <span className="font-mono">{selected.txn}</span></div>
            <div><span className="font-semibold">Message:</span> {selected.message}</div>
            <div><span className="font-semibold">Time:</span> {selected.time}</div>
            {/* Add more fields/details as needed */}
          </div>
        </div>
      </div>
    )}
  </div>
  );
}
