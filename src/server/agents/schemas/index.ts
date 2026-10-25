import { z } from 'zod';

import {
  AgentProvider,
  KnowledgeConnectorType,
  Language,
  RedactionField,
} from '@/generated/prisma/enums';
import {
  AGENT_NAME_MAX_LENGTH,
  KNOWLEDGE_FILE_EXTENSIONS,
  KNOWLEDGE_FILE_MAX_BYTES,
  MOCK_TOOL_MAX_DELAY_SECONDS,
  MOCK_TOOL_NAME_PATTERN,
} from '@/server/agents/constants/agent-limits';

const idSchema = z.number().int().positive();

const PHONE_PATTERN = /^\+[1-9]\d{6,14}$/;

export const normalizePhoneNumber = (value: string) =>
  value.replace(/[\s().-]/g, '');

export const agentIdSchema = z.object({ agentId: idSchema });

export const projectIdSchema = z.object({ projectId: idSchema });

export const listAgentsSchema = z.object({
  projectId: idSchema,
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1).max(100),
  search: z.string().trim().max(255),
});

export const agentBasicsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Enter an agent name.')
    .max(
      AGENT_NAME_MAX_LENGTH,
      'The agent name must have 255 or fewer characters.',
    ),
  language: z.enum(Language),
  description: z
    .string()
    .trim()
    .min(1, 'Enter a description of your AI Agent.'),
});

export const agentConnectionSchema = z.object({
  provider: z.enum(AgentProvider),
  telephonyEnabled: z.boolean(),
  phoneNumber: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === '' || PHONE_PATTERN.test(normalizePhoneNumber(value)),
      'Enter the phone number in international format, for example +15717416284.',
    ),
  inbound: z.boolean(),
  providerAgentId: z.string().trim().max(255),
  providerApiKey: z.string().trim().max(2000),
  providerConfig: z.record(z.string(), z.string().trim().max(2000)),
  autoImportCalls: z.boolean(),
  autoSyncPrompt: z.boolean(),
  sendPostConversationMetadata: z.boolean(),
  redactionEnabled: z.boolean(),
  redactionFields: z.array(z.enum(RedactionField)),
});

export const agentConfigSchema = agentBasicsSchema.extend(
  agentConnectionSchema.shape,
);

export const createAgentSchema = agentConfigSchema.extend({
  projectId: idSchema,
});

export const checkAgentConfigSchema = createAgentSchema;

export const agentWebhookSchema = z.object({
  webhookUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || z.url().safeParse(value).success,
      'Enter a valid URL.',
    ),
  webhookSecret: z.string().trim().max(2000),
});

export const agentSettingsSchema = agentConfigSchema.extend(
  agentWebhookSchema.shape,
);

export const updateAgentSchema = agentSettingsSchema.extend({
  agentId: idSchema,
});

export const deleteAgentSchema = z.object({
  agentId: idSchema,
  deleteRelated: z.boolean(),
});

export const setMockToolsEnabledSchema = z.object({
  agentId: idSchema,
  enabled: z.boolean(),
});

const hasAllowedExtension = (fileName: string) =>
  KNOWLEDGE_FILE_EXTENSIONS.some((extension) =>
    fileName.toLowerCase().endsWith(extension),
  );

export const uploadKnowledgeFileSchema = z.object({
  agentId: idSchema,
  file: z
    .instanceof(File)
    .refine(
      (file) => hasAllowedExtension(file.name),
      'Use a PDF, TXT, JSON, MD, CSV, or XML file.',
    )
    .refine(
      (file) => file.size <= KNOWLEDGE_FILE_MAX_BYTES,
      'The file must be 10 MB or smaller.',
    ),
});

export const knowledgeFileIdSchema = z.object({ knowledgeFileId: idSchema });

export const knowledgeConnectorFormSchema = z
  .object({
    name: z.string().trim().min(1, 'Enter a connector name.').max(255),
    syncEnabled: z.boolean(),
    syncIntervalDays: z
      .number({ error: 'Enter a number of days.' })
      .int('Enter a whole number of days.')
      .min(1, 'Enter 1 or a larger number.'),
    type: z.enum(KnowledgeConnectorType),
    serviceAccountJson: z.string().trim(),
    query: z.string().trim(),
    url: z.string().trim(),
  })
  .superRefine((values, context) => {
    if (values.type === KnowledgeConnectorType.website_scraper) {
      if (!z.url().safeParse(values.url).success) {
        context.addIssue({
          code: 'custom',
          path: ['url'],
          message: 'Enter a valid website URL.',
        });
      }
      return;
    }
    if (!values.serviceAccountJson) {
      context.addIssue({
        code: 'custom',
        path: ['serviceAccountJson'],
        message: 'Paste the service account JSON.',
      });
    }
    if (!values.query) {
      context.addIssue({
        code: 'custom',
        path: ['query'],
        message: 'Enter a query.',
      });
    }
  });

export const createKnowledgeConnectorSchema = z.object({
  agentId: idSchema,
  connector: knowledgeConnectorFormSchema,
});

export const knowledgeConnectorIdSchema = z.object({
  knowledgeConnectorId: idSchema,
});

const isAllowedStatusCode = (code: number) =>
  (code >= 200 && code <= 299 && code !== 204 && code !== 205) ||
  (code >= 400 && code <= 599);

export const mockToolMappingSchema = z.object({
  input: z.record(z.string(), z.unknown()),
  output: z.record(z.string(), z.unknown()),
  response: z
    .object({
      status_code: z
        .number()
        .int()
        .refine(isAllowedStatusCode, {
          message:
            'Use a status code from 200 to 299 except 204 and 205, or from 400 to 599.',
        })
        .optional(),
      headers: z.record(z.string(), z.string()).optional(),
      delay_seconds: z
        .number()
        .min(0)
        .max(MOCK_TOOL_MAX_DELAY_SECONDS)
        .optional(),
    })
    .optional(),
});

export const mockToolMappingsSchema = z.array(mockToolMappingSchema);

export const mockToolNameSchema = z
  .string()
  .trim()
  .regex(
    MOCK_TOOL_NAME_PATTERN,
    'Use letters, digits, underscores, and hyphens only, under 64 characters.',
  );

export const mockToolValuesSchema = z.object({
  name: mockToolNameSchema,
  description: z.string().trim().max(2000),
  mappings: mockToolMappingsSchema,
});

export const createMockToolSchema = mockToolValuesSchema.extend({
  agentId: idSchema,
});

export const updateMockToolSchema = mockToolValuesSchema.extend({
  mockToolId: idSchema,
});

export const mockToolIdSchema = z.object({ mockToolId: idSchema });

export const dynamicVariableValuesSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Enter a variable name.')
    .max(255, 'The name must have 255 or fewer characters.'),
  description: z.string().trim().min(1, 'Enter a description.'),
});

export const addDynamicVariablesSchema = z.object({
  agentId: idSchema,
  variables: z.array(dynamicVariableValuesSchema).min(1),
});

export const updateDynamicVariableSchema = dynamicVariableValuesSchema.extend({
  dynamicVariableId: idSchema,
});

export const dynamicVariableIdSchema = z.object({
  dynamicVariableId: idSchema,
});

export const renameAgentVersionSchema = z.object({
  agentVersionId: idSchema,
  name: z.string().trim().max(255),
});

export const agentVersionIdSchema = z.object({ agentVersionId: idSchema });
