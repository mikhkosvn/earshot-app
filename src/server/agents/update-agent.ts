import 'server-only';

import { prisma } from '@/lib/prisma';
import { AGENT_TRANSACTION_TIMEOUT_MS } from '@/server/agents/constants/agent-limits';
import { updateAgentSchema } from '@/server/agents/schemas';
import type { AgentDetail } from '@/server/agents/types';
import {
  agentConfigData,
  redactionFieldsOf,
} from '@/server/agents/utils/agent-config-data';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { saveAgentVersion } from '@/server/agents/utils/save-agent-version';
import {
  agentDetailInclude,
  toAgentDetail,
} from '@/server/agents/utils/to-agent-detail';
import { withValidation } from '@/server/common/run-action';
import { encryptSecret } from '@/server/crypto/encrypt-secret';

const webhookSecretData = (secret: string) => {
  const trimmed = secret.trim();
  if (!trimmed) return undefined;
  return encryptSecret(trimmed);
};

const secretLabels = (values: {
  providerApiKey: string;
  webhookSecret: string;
}) => {
  const labels: string[] = [];
  if (values.providerApiKey.trim()) labels.push('API key');
  if (values.webhookSecret.trim()) labels.push('Webhook Secret');
  return labels;
};

export const updateAgent = withValidation(
  updateAgentSchema,
  async ({
    agentId,
    webhookUrl,
    webhookSecret,
    ...values
  }): Promise<AgentDetail> => {
    const { user } = await requireAgentAccess(agentId);
    const current = await prisma.agent.findUniqueOrThrow({
      where: { id: agentId },
      select: { provider: true },
    });
    const redactionFields = redactionFieldsOf(values);

    const agent = await prisma.$transaction(
      async (tx) => {
        await tx.agentRedactionField.deleteMany({ where: { agentId } });
        await tx.agent.update({
          where: { id: agentId },
          data: {
            ...agentConfigData(values, current.provider),
            webhookUrl: webhookUrl.trim() || null,
            webhookSecretEncrypted: webhookSecretData(webhookSecret),
            redactionFields: {
              create: redactionFields.map((field) => ({ field })),
            },
          },
        });
        await saveAgentVersion(tx, {
          agentId,
          userId: user.id,
          extraLabels: secretLabels({
            providerApiKey: values.providerApiKey,
            webhookSecret,
          }),
        });
        return tx.agent.findUniqueOrThrow({
          where: { id: agentId },
          include: agentDetailInclude,
        });
      },
      { timeout: AGENT_TRANSACTION_TIMEOUT_MS },
    );
    return toAgentDetail(agent);
  },
);
