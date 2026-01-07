import { getEvents } from './index';

export async function replayTransaction(transactionId: string) {
  const events = getEvents(transactionId);
  // For MVP, just return the events; in production, replay logic would re-execute deterministically
  return events;
}
