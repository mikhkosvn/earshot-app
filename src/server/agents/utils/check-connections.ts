import 'server-only';

import type { AgentProvider } from '@/generated/prisma/enums';
import {
  CONNECTION_CHECK_FAILED_MESSAGE,
  ConnectionType,
  PROVIDER_CONNECTION_BLOCKED_REASON,
} from '@/server/agents/constants/connection-type';
import { CREDENTIAL_CHECK_PROVIDERS } from '@/server/agents/constants/provider-integrations';
import type {
  ConnectionCheck,
  ConnectionCheckItem,
} from '@/server/agents/types';

type ConnectionCheckArgs = {
  provider: AgentProvider;
  phoneNumber: string | null;
  providerAgentId: string | null;
  apiKeyConfigured: boolean;
};

const telephonyConnection = (
  phoneNumber: string | null,
): ConnectionCheckItem[] => {
  if (!phoneNumber) return [];
  return [
    {
      type: ConnectionType.telephony,
      target: phoneNumber,
      testable: true,
      blockedReason: null,
    },
  ];
};

const providerConnection = (
  args: ConnectionCheckArgs,
): ConnectionCheckItem[] => {
  if (!CREDENTIAL_CHECK_PROVIDERS.includes(args.provider)) return [];
  if (!args.providerAgentId || !args.apiKeyConfigured) return [];
  return [
    {
      type: ConnectionType.provider,
      target: args.providerAgentId,
      testable: false,
      blockedReason: PROVIDER_CONNECTION_BLOCKED_REASON,
    },
  ];
};

const failureMessage = (connections: ConnectionCheckItem[]) => {
  if (connections.length > 0) return null;
  return CONNECTION_CHECK_FAILED_MESSAGE;
};

export const checkConnections = (
  args: ConnectionCheckArgs,
): ConnectionCheck => {
  const connections = [
    ...telephonyConnection(args.phoneNumber),
    ...providerConnection(args),
  ];
  return {
    valid: connections.length > 0,
    message: failureMessage(connections),
    connections,
  };
};
