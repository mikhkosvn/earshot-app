import { AgentProvider } from '@/generated/prisma/enums';
import { AgentProviderLabel } from '@/server/agents/constants/agent-provider-labels';

export const PROVIDER_LIST_LABEL: Record<AgentProvider, string> = {
  ...AgentProviderLabel,
  [AgentProvider.custom]: 'Other (Webhook)',
};

export const PROVIDER_TILE_LABEL: Record<AgentProvider, string> = {
  ...AgentProviderLabel,
  [AgentProvider.gemini_cx]: 'Gemini CX',
};

export const PROVIDER_MONOGRAM: Record<AgentProvider, string> = {
  [AgentProvider.custom]: '',
  [AgentProvider.vapi]: 'VA',
  [AgentProvider.retell]: 'RE',
  [AgentProvider.synthflow]: 'SF',
  [AgentProvider.elevenlabs]: 'II',
  [AgentProvider.bland]: 'BL',
  [AgentProvider.livekit]: 'LK',
  [AgentProvider.pipecat]: 'PC',
  [AgentProvider.koreai]: 'KO',
  [AgentProvider.agentforce]: 'AF',
  [AgentProvider.genesys]: 'GE',
  [AgentProvider.cisco]: 'WX',
  [AgentProvider.amazon_connect]: 'AM',
  [AgentProvider.agora]: 'AG',
  [AgentProvider.telnyx]: 'TX',
  [AgentProvider.sierra]: 'SI',
  [AgentProvider.gemini_cx]: 'GX',
  [AgentProvider.assemblyai]: 'AA',
  [AgentProvider.smallest]: 'SM',
};

export const WIZARD_COLLAPSED_TILE_COUNT = 7;

export const SETTINGS_COLLAPSED_TILE_COUNT = 5;
