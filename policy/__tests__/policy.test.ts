import { evaluatePolicy, PolicyContext } from '../index';
import { TransactionStep } from '../../engine/types';

test('policy evaluation passes for safe step', () => {
  const context: PolicyContext = {
    user: 'alice',
    permissions: ['execute'],
    blastRadius: 1,
  };
  const step: TransactionStep = {
    id: 'step1',
    type: 'Pure',
    execute: async () => {},
    idempotencyKey: 'test',
  };
  expect(evaluatePolicy(context, step)).toBe(true);
});

test('policy evaluation fails for missing permission', () => {
  const context: PolicyContext = {
    user: 'bob',
    permissions: [],
    blastRadius: 1,
  };
  const step: TransactionStep = {
    id: 'step2',
    type: 'Pure',
    execute: async () => {},
    idempotencyKey: 'test',
  };
  expect(evaluatePolicy(context, step)).toBe(false);
});

test('policy evaluation fails for high blast radius', () => {
  const context: PolicyContext = {
    user: 'carol',
    permissions: ['execute'],
    blastRadius: 10,
  };
  const step: TransactionStep = {
    id: 'step3',
    type: 'Pure',
    execute: async () => {},
    idempotencyKey: 'test',
  };
  expect(evaluatePolicy(context, step)).toBe(false);
});
