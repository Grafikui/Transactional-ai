// Simple in-memory store for MVP

export const transactions = [
  { id: "txn-001", agent: "IAM Auditor", state: "Committed", started: "2026-01-07 10:12" },
  { id: "txn-002", agent: "IAM Auditor", state: "Rolled Back", started: "2026-01-07 09:55" },
  { id: "txn-003", agent: "IAM Auditor", state: "Pending", started: "2026-01-07 09:30" },
];

export const logs = [
  { id: "log-001", txn: "txn-001", message: "Policy check passed", time: "10:12:01" },
  { id: "log-002", txn: "txn-002", message: "Rollback triggered", time: "09:55:42" },
  { id: "log-003", txn: "txn-003", message: "Approval required", time: "09:30:15" },
];
