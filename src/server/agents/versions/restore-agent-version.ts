import 'server-only';

import { z } from 'zod';

import {
  AgentProvider,
  Language,
  RedactionField,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { AGENT_TRANSACTION_TIMEOUT_MS } from '@/server/agents/constants/agent-limits';
import { agentVersionIdSchema } from '@/server/agents/schemas';
import { agentAccessWhere } from '@/server/agents/utils/require-agent-access';
import { saveAgentVersion } from '@/server/agents/utils/save-agent-version';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';

const restorableSnapshotSchema = z.object({
  name: z.string(),
  description: z.string(),
  language: z.enum(Language),
  provider: z.enum(AgentProvider),
  phoneNumber: z.string().nullable(),
  inbound: z.boolean(),
  providerAgentId: z.string().nullable(),
  providerConfig: z.record(z.string(), z.string()),
  autoImportCalls: z.boolean(),
  autoSyncPrompt: z.boolean(),
  sendPostConversationMetadata: z.boolean(),
  redactionFields: z.array(z.enum(RedactionField)),
  webhookUrl: z.string().nullable(),
  mockToolsEnabled: z.boolean(),
});

export const restoreAgentVersion = withValidation(
  agentVersionIdSchema,
  async ({ agentVersionId }) => {
    const { user } = await requireUser();
    const version = await prisma.agentVersion.findUniqueOrThrow({
      where: { id: agentVersionId, agent: agentAccessWhere(user.id) },
      select: { agentId: true, version: true, snapshot: true },
    });
    const { redactionFields, ...snapshot } = restorableSnapshotSchema.parse(
      version.snapshot,
    );

    return prisma.$transaction(
      async (tx) => {
        await tx.agentRedactionField.deleteMany({
          where: { agentId: version.agentId },
        });
        await tx.agent.update({
          where: { id: version.agentId },
          data: {
            ...snapshot,
            redactionFields: {
              create: redactionFields.map((field) => ({ field })),
            },
          },
        });
        return saveAgentVersion(tx, {
          agentId: version.agentId,
          userId: user.id,
          changeReason: `Restored from v${version.version}`,
        });
      },
      { timeout: AGENT_TRANSACTION_TIMEOUT_MS },
    );
  },
);
