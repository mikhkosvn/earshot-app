import type { TestStep } from '@/server/agents/types';

import { TestStepIcon } from './test-step-icon';

type TestStepRowProps = {
  step: TestStep;
};

export function TestStepRow({ step }: TestStepRowProps) {
  return (
    <li className="flex items-center gap-1.5">
      <TestStepIcon status={step.status} />
      {step.label}
    </li>
  );
}
