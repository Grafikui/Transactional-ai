import { TransactionStep } from '../engine/types';

export interface PolicyContext {
  user: string;
  permissions: string[];
  blastRadius: number;
  [key: string]: any;
}

export function evaluatePolicy(context: PolicyContext, step: TransactionStep): boolean {
  // Example: Only allow steps if user has 'execute' permission and blast radius is safe
  if (!context.permissions.includes('execute')) return false;
  if (context.blastRadius > 5) return false;
  // Add more rules as needed
  return true;
}
