import { logEvent, getEvents } from '../index';
import fs from 'fs';
import path from 'path';

describe('Deterministic Logging', () => {
  const txnId = 'test-txn';
  const logFile = path.join(__dirname, '../../../logs', `${txnId}.log.jsonl`);

  afterEach(() => {
    if (fs.existsSync(logFile)) fs.unlinkSync(logFile);
  });

  it('logs and retrieves events deterministically', () => {
    logEvent(txnId, { step: 1, action: 'start' });
    logEvent(txnId, { step: 2, action: 'end' });
    const events = getEvents(txnId);
    expect(events).toEqual([
      { step: 1, action: 'start' },
      { step: 2, action: 'end' },
    ]);
  });
});
