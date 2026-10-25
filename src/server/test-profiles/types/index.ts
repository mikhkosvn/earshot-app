import type { z } from 'zod';

import type {
  createTestProfileSchema,
  listTestProfilesSchema,
  testProfileFieldsSchema,
  testProfileIdSchema,
  testProfileVariableSchema,
  updateTestProfileSchema,
} from '@/server/test-profiles/schemas';

export type TestProfileVariableInput = z.input<
  typeof testProfileVariableSchema
>;
export type TestProfileFieldsValues = z.input<typeof testProfileFieldsSchema>;
export type TestProfileFieldsOutput = z.output<typeof testProfileFieldsSchema>;
export type CreateTestProfileInput = z.input<typeof createTestProfileSchema>;
export type UpdateTestProfileInput = z.input<typeof updateTestProfileSchema>;
export type TestProfileIdInput = z.input<typeof testProfileIdSchema>;
export type ListTestProfilesInput = z.input<typeof listTestProfilesSchema>;

export type TestProfileVariableView = {
  key: string;
  value: string;
};

export type TestProfileView = {
  id: number;
  name: string;
  agentId: number;
  agentName: string;
  isDefault: boolean;
  mainAgentVariables: TestProfileVariableView[];
  testingAgentVariables: TestProfileVariableView[];
  evaluatorCount: number;
  createdAt: Date;
  createdByName: string | null;
  updatedAt: Date;
  updatedByName: string | null;
};
