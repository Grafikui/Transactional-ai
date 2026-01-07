import { Transaction, TransactionStep, TransactionState } from './types';

export class TransactionEngine {
  private transaction: Transaction;

  constructor(transaction: Transaction) {
    this.transaction = transaction;
  }

  async execute(): Promise<TransactionState> {
    for (const step of this.transaction.steps) {
      // TODO: Check idempotency, policy, and kill switches here
      try {
        await step.execute(this.transaction.context);
        // TODO: Log deterministic output
      } catch (err) {
        if (step.compensate) {
          await this.rollback();
          // After rollback, set state to 'RolledBack' and rethrow
          throw err;
        } else {
          this.transaction.state = 'Halted';
          throw err;
        }
      }
    }
    this.transaction.state = 'Committed';
    return this.transaction.state;
  }

  async rollback(): Promise<void> {
    // Rollback in reverse order for reversible steps
    for (const step of [...this.transaction.steps].reverse()) {
      if (step.compensate) {
        await step.compensate(this.transaction.context);
      }
    }
    this.transaction.state = 'RolledBack';
  }
}
