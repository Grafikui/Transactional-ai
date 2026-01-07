import { TransactionEngine } from '../stateMachine';
import { Transaction, TransactionStep } from '../types';

test('executes and rolls back transaction', async () => {
  let executed = false;
  let compensated = false;

  const step: TransactionStep = {
    id: 'step1',
    type: 'Reversible',
    execute: async () => { executed = true; throw new Error('fail'); },
    compensate: async () => { compensated = true; },
    idempotencyKey: 'test-key',
  };

  const transaction: Transaction = {
    id: 'txn1',
    steps: [step],
    state: 'Pending',
    context: {},
    logs: [],
  };

  const engine = new TransactionEngine(transaction);
  await expect(engine.execute()).rejects.toThrow('fail');
  expect(executed).toBe(true);
  expect(compensated).toBe(true);
  expect(transaction.state).toBe('RolledBack');
});
