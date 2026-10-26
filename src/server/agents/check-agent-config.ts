import 'server-only';

import { checkAgentConfigSchema } from '@/server/agents/schemas';
import type { ConnectionCheck } from '@/server/agents/types';
import { phoneNumberOf } from '@/server/agents/utils/agent-config-data';
import { checkConnections } from '@/server/agents/utils/check-connections';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const checkAgentConfig = withValidation(
  checkAgentConfigSchema,
  async (values): Promise<ConnectionCheck> => {
    await requireProjectAccess(values.projectId);
    const check = checkConnections({
      provider: values.provider,
      phoneNumber: phoneNumberOf(values),
      providerAgentId: values.providerAgentId.trim() || null,
      apiKeyConfigured: Boolean(values.providerApiKey.trim()),
    });
    addEventFields({
      project: { id: values.projectId },
      agent: { provider: values.provider },
      connection_check: {
        valid: check.valid,
        connection_count: check.connections.length,
        connection_types: check.connections.map((item) => item.type),
      },
    });
    return check;
  },
);
