// import removed: TransactionStep type no longer exists
import { PolicyContext } from './index';

export async function requireApproval(context: PolicyContext, step: any): Promise<boolean> {
  // Placeholder: In production, this could be a CLI prompt, API call, or UI approval
  // For now, auto-approve if 'autoApprove' is set
  if (context.autoApprove) return true;
  // Simulate manual approval (always approve in MVP)
  return true;
}
