import { getEvents } from '../logging';
import { Transaction } from '../engine/types';

export function showTransactionState(transaction: Transaction) {
  console.log('--- Transaction State ---');
  console.log('ID:', transaction.id);
  console.log('State:', transaction.state);
  console.log('Context:', JSON.stringify(transaction.context, null, 2));
  console.log('Logs:');
  const events = getEvents(transaction.id);
  for (const event of events) {
    console.log('  -', JSON.stringify(event));
  }
}

export function showReplay(transactionId: string) {
  const events = getEvents(transactionId);
  console.log('--- Transaction Replay ---');
  for (const event of events) {
    console.log('  -', JSON.stringify(event));
  }
}
