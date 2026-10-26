import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import {
  AGENT_NAME_MAX_LENGTH,
  AGENT_TRANSACTION_TIMEOUT_MS,
  DUPLICATE_AGENT_NAME_SUFFIX,
} from '@/server/agents/constants/agent-limits';
import { agentIdSchema } from '@/server/agents/schemas';
import type { AgentOption } from '@/server/agents/types';
import { createAgentRecord } from '@/server/agents/utils/create-agent-record';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { readFileBytes } from '@/server/files/read-file-bytes';
import { saveFile } from '@/server/files/save-file';

const copyName = (name: string) =>
  `${name.slice(0, AGENT_NAME_MAX_LENGTH - DUPLICATE_AGENT_NAME_SUFFIX.length)}${DUPLICATE_AGENT_NAME_SUFFIX}`;

const toJsonInput = (value: Prisma.JsonValue | null) => {
  if (value === null) return Prisma.DbNull;
  return value;
};

const copyKnowledgeFiles = async (
  projectId: number,
  files: { storageKey: string; fileName: string; contentType: string }[],
) => {
  const copies: string[] = [];
  for (const file of files) {
    const data = await readFileBytes(file);
    const copy = await saveFile({
      projectId,
      fileName: file.fileName,
      contentType: file.contentType,
      data,
    });
    copies.push(copy.id);
  }
  return copies;
};

export const duplicateAgent = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<AgentOption> => {
    const { user } = await requireAgentAccess(agentId);
    const source = await prisma.agent.findUniqueOrThrow({
      where: { id: agentId },
      include: {
        redactionFields: { select: { field: true } },
        mockTools: { include: { mappings: true } },
        dynamicVariables: true,
        knowledgeBaseConnectors: true,
        knowledgeBaseFiles: { include: { file: true } },
      },
    });
    addEventFields({
      project: { id: source.projectId },
      agent: {
        id: agentId,
        provider: source.provider,
        knowledge_file_count: source.knowledgeBaseFiles.length,
        mock_tool_count: source.mockTools.length,
        dynamic_variable_count: source.dynamicVariables.length,
      },
    });
    const copiedFileIds = await copyKnowledgeFiles(
      source.projectId,
      source.knowledgeBaseFiles.map((row) => row.file),
    );

    return prisma.$transaction(
      async (tx) => {
        const agent = await createAgentRecord(tx, {
          projectId: source.projectId,
          userId: user.id,
          redactionFields: source.redactionFields.map((row) => row.field),
          data: {
            name: copyName(source.name),
            description: source.description,
            language: source.language,
            phoneNumber: source.phoneNumber,
            inbound: source.inbound,
            agentSpeaksFirst: source.agentSpeaksFirst,
            provider: source.provider,
            providerAgentId: source.providerAgentId,
            providerApiKeyEncrypted: source.providerApiKeyEncrypted,
            providerPublicKeyEncrypted: source.providerPublicKeyEncrypted,
            providerConfig: toJsonInput(source.providerConfig),
            autoImportCalls: source.autoImportCalls,
            autoSyncPrompt: source.autoSyncPrompt,
            autoDialOutbound: source.autoDialOutbound,
            sendPostConversationMetadata: source.sendPostConversationMetadata,
            webhookUrl: source.webhookUrl,
            webhookSecretEncrypted: source.webhookSecretEncrypted,
            mockToolsEnabled: source.mockToolsEnabled,
            mockTools: {
              create: source.mockTools.map((tool) => ({
                name: tool.name,
                description: tool.description,
                mappings: {
                  create: tool.mappings.map((mapping) => ({
                    position: mapping.position,
                    input: mapping.input as Prisma.InputJsonValue,
                    output: mapping.output as Prisma.InputJsonValue,
                    responseStatusCode: mapping.responseStatusCode,
                    responseHeaders: toJsonInput(mapping.responseHeaders),
                    responseDelaySeconds: mapping.responseDelaySeconds,
                  })),
                },
              })),
            },
            dynamicVariables: {
              create: source.dynamicVariables.map((variable) => ({
                name: variable.name,
                description: variable.description,
              })),
            },
            knowledgeBaseConnectors: {
              create: source.knowledgeBaseConnectors.map((connector) => ({
                name: connector.name,
                type: connector.type,
                syncEnabled: connector.syncEnabled,
                syncIntervalDays: connector.syncIntervalDays,
                credentialsEncrypted: connector.credentialsEncrypted,
                query: connector.query,
                url: connector.url,
              })),
            },
            knowledgeBaseFiles: {
              create: copiedFileIds.map((fileId) => ({ fileId })),
            },
          },
        });
        addEventFields({ agent: { copy_id: agent.id } });
        return { id: agent.id, name: agent.name };
      },
      { timeout: AGENT_TRANSACTION_TIMEOUT_MS },
    );
  },
);
