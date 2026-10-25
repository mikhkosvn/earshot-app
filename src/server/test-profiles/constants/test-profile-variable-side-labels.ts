import { TestProfileVariableSide } from '@/generated/prisma/enums';

export const TestProfileVariableSideLabel: Record<
  TestProfileVariableSide,
  string
> = {
  [TestProfileVariableSide.main_agent]: 'Main agent variables',
  [TestProfileVariableSide.testing_agent]: 'Testing agent variables',
};
