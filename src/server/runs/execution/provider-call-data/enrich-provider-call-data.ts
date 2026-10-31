import 'server-only';

import { AgentProvider } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import type { EndOfCallEvent, PlacedCall } from '@/server/call-engine/types';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { decryptSecret } from '@/server/crypto/decrypt-secret';
import {
  ENGINE_DATA_KEY,
  ENGINE_FROM_NUMBER_KEY,
  PROVIDER_CALL_DATA_STEP,
  ProviderCallDataBranch,
  ProviderCallDataSource,
} from '@/server/runs/constants/provider-call-data';
import { findVapiCall } from '@/server/runs/execution/provider-call-data/find-vapi-call';

interface EnrichProviderCallDataArgs {
  runId: number;
  event: EndOfCallEvent;
  call: PlacedCall;
}

const fromNumberOf = (event: EndOfCallEvent) => {
  const value = event.provider_call_data[ENGINE_FROM_NUMBER_KEY];
  if (typeof value === 'string' && value.trim()) return value;
  return null;
};

const recordBranch = (
  branch: ProviderCallDataBranch,
  source: ProviderCallDataSource,
) => addEventFields({ provider_call_data: { branch, source } });

const matchedBranchOf = (complete: boolean) => {
  if (complete) return ProviderCallDataBranch.matched;
  return ProviderCallDataBranch.matched_incomplete;
};

const loadVapiApiKey = async (runId: number) => {
  const run = await prisma.run.findUniqueOrThrow({
    where: { id: runId },
    select: {
      result: {
        select: {
          agent: { select: { provider: true, providerApiKeyEncrypted: true } },
        },
      },
    },
  });
  const agent = run.result.agent;
  if (agent?.provider !== AgentProvider.vapi) {
    recordBranch(ProviderCallDataBranch.not_vapi, ProviderCallDataSource.engine);
    return null;
  }
  if (!agent.providerApiKeyEncrypted) {
    recordBranch(
      ProviderCallDataBranch.no_api_key,
      ProviderCallDataSource.engine,
    );
    return null;
  }
  return decryptSecret(agent.providerApiKeyEncrypted);
};

const enrich = async ({
  runId,
  event,
  call,
}: EnrichProviderCallDataArgs): Promise<PlacedCall> => {
  const apiKey = await loadVapiApiKey(runId);
  if (!apiKey) return call;
  const found = await findVapiCall(apiKey, {
    startedAt: call.startedAt,
    endedAt: call.endedAt,
    fromNumber: fromNumberOf(event),
  });
  if (!found) {
    recordBranch(ProviderCallDataBranch.no_match, ProviderCallDataSource.engine);
    return call;
  }
  addEventFields({
    provider_call_data: {
      branch: matchedBranchOf(found.complete),
      source: ProviderCallDataSource.vapi,
      vapi_call_id: found.call.id,
      complete: found.complete,
      attempts: found.attempts,
    },
  });
  return {
    ...call,
    providerCallData: {
      ...found.call,
      [ENGINE_DATA_KEY]: event.provider_call_data,
    },
  };
};

export const enrichProviderCallData = async (
  args: EnrichProviderCallDataArgs,
): Promise<PlacedCall> => {
  try {
    return await enrich(args);
  } catch (error) {
    recordStepFailure(PROVIDER_CALL_DATA_STEP, error);
    recordBranch(ProviderCallDataBranch.failed, ProviderCallDataSource.engine);
    return args.call;
  }
};
