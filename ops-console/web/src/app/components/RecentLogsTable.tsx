"use client";
import React from "react";


import { useEffect, useState } from "react";

type Log = {
  id: string;
  txn: string;
  message: string;
  time: string;
};

export default function RecentLogsTable() {
  const [logs, setLogs] = useState<Log[]>([]);
  useEffect(() => {
    fetch("/api/logs")
      .then((res) => res.json())
      .then(setLogs);
  }, []);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Recent Logs</h2>
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
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="px-4 py-2 font-mono">{log.id}</td>
                <td className="px-4 py-2 font-mono">{log.txn}</td>
                <td className="px-4 py-2">{log.message}</td>
                <td className="px-4 py-2">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
