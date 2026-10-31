import { z } from 'zod';

import { AgentProvider, Language } from '@/generated/prisma/enums';
import {
  agentBasicsSchema,
  agentConnectionSchema,
} from '@/server/agents/schemas';

const REQUIRED_FIELD_MESSAGE = 'This field is required.';

const agentNameSchema = agentBasicsSchema.shape.name;

const publicAgentFieldsSchema = z.object({
  description: z.string().trim().nullish(),
  inbound: z.boolean().optional(),
  contact_number: agentConnectionSchema.shape.phoneNumber.nullish(),
  assistant_id: agentConnectionSchema.shape.providerAgentId.nullish(),
  assistant_provider: z.enum(AgentProvider).optional(),
  vapi_api_key: agentConnectionSchema.shape.providerApiKey.nullish(),
  auto_sync_prompt_enabled: z.boolean().optional(),
  language: z.enum(Language).optional(),
});

export const createPublicAgentSchema = publicAgentFieldsSchema.extend({
  project: z.number().int().positive().nullish(),
  agent_name: z.string({ error: REQUIRED_FIELD_MESSAGE }).pipe(agentNameSchema),
});

export const updatePublicAgentSchema = publicAgentFieldsSchema.extend({
  agent_name: agentNameSchema.optional(),
  enabled_personalities: z.array(z.number().int().positive()).optional(),
});

export type PublicAgentFields = z.output<typeof publicAgentFieldsSchema>;
export type UpdatePublicAgentValues = z.output<typeof updatePublicAgentSchema>;
