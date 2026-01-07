import { isAgentExecutionAllowed, setAgentsDisabled, killTransaction, isTransactionKilled } from '../index';

describe('Global Safety Controls', () => {
  afterEach(() => {
    setAgentsDisabled(false);
  });

  it('disables and enables agent execution', () => {
    expect(isAgentExecutionAllowed()).toBe(true);
    setAgentsDisabled(true);
    expect(isAgentExecutionAllowed()).toBe(false);
    setAgentsDisabled(false);
    expect(isAgentExecutionAllowed()).toBe(true);
  });

  it('kills and checks transaction status', () => {
    const txnId = 'txn-123';
    expect(isTransactionKilled(txnId)).toBe(false);
    killTransaction(txnId);
    expect(isTransactionKilled(txnId)).toBe(true);
  });
});
