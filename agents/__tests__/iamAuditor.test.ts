import { runIamAudit } from '../workflow';

describe('IAM Policy Auditor Reference Agent', () => {
  it('detects policy violations and rolls back', async () => {
    const result = await runIamAudit();
    expect(result.state).toBe('RolledBack');
    expect(result.context.violations.length).toBeGreaterThan(0);
    expect(result.context.applied).toEqual([]);
  });
});
