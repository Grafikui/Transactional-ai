import { TransactionEngine } from '../engine/stateMachine';
import { iamAuditTransaction } from './iamAuditor';

export async function runIamAudit() {
  const engine = new TransactionEngine(iamAuditTransaction);
  try {
    await engine.execute();
    return { state: iamAuditTransaction.state, context: iamAuditTransaction.context };
  } catch (err) {
    return { state: iamAuditTransaction.state, error: err, context: iamAuditTransaction.context };
  }
}
