import { showTransactionState, showReplay } from '../cli';
import { Transaction } from '../../engine/types';
import * as logging from '../../logging';

describe('Ops Console CLI', () => {
  it('prints transaction state and logs', () => {
    const transaction: Transaction = {
      id: 'txn-1',
      steps: [],
      state: 'Committed',
      context: { foo: 'bar' },
      logs: [],
    };
    jest.spyOn(logging, 'getEvents').mockReturnValue([{ event: 'step1' }, { event: 'step2' }]);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    showTransactionState(transaction);
    expect(logSpy).toHaveBeenCalledWith('--- Transaction State ---');
    expect(logSpy).toHaveBeenCalledWith('ID:', 'txn-1');
    expect(logSpy).toHaveBeenCalledWith('State:', 'Committed');
    expect(logSpy).toHaveBeenCalledWith('Context:', JSON.stringify({ foo: 'bar' }, null, 2));
    expect(logSpy).toHaveBeenCalledWith('Logs:');
    expect(logSpy).toHaveBeenCalledWith('  -', JSON.stringify({ event: 'step1' }));
    expect(logSpy).toHaveBeenCalledWith('  -', JSON.stringify({ event: 'step2' }));
    logSpy.mockRestore();
  });

  it('prints transaction replay', () => {
    jest.spyOn(logging, 'getEvents').mockReturnValue([{ event: 'step1' }]);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    showReplay('txn-1');
    expect(logSpy).toHaveBeenCalledWith('--- Transaction Replay ---');
    expect(logSpy).toHaveBeenCalledWith('  -', JSON.stringify({ event: 'step1' }));
    logSpy.mockRestore();
  });
});
