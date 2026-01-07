let AGENTS_DISABLED = false;
const killedTransactions = new Set<string>();

export function isAgentExecutionAllowed(): boolean {
  return !AGENTS_DISABLED;
}

export function setAgentsDisabled(disabled: boolean) {
  AGENTS_DISABLED = disabled;
}

export function killTransaction(transactionId: string) {
  killedTransactions.add(transactionId);
}

export function isTransactionKilled(transactionId: string): boolean {
  return killedTransactions.has(transactionId);
}
