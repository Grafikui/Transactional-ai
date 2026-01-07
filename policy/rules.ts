// Example policy rules for extension or enterprise
export const rules = [
  {
    id: 'no-wildcard-iam',
    description: 'IAM policies must not use wildcards',
    check: (step: any) => !step.policy?.includes('*'),
  },
  // Add more rules as needed
];
