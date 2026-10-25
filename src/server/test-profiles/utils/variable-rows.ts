import 'server-only';

import { TestProfileVariableSide } from '@/generated/prisma/enums';
import type { TestProfileVariableView } from '@/server/test-profiles/types';

const sideRows = (
  side: TestProfileVariableSide,
  variables: TestProfileVariableView[],
) =>
  variables.map((variable, position) => ({
    side,
    key: variable.key,
    value: variable.value,
    position,
  }));

export const toVariableRows = (
  mainAgentVariables: TestProfileVariableView[],
  testingAgentVariables: TestProfileVariableView[],
) => [
  ...sideRows(TestProfileVariableSide.main_agent, mainAgentVariables),
  ...sideRows(TestProfileVariableSide.testing_agent, testingAgentVariables),
];
