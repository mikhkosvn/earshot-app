import { AgentProvider } from '@/generated/prisma/enums';

export const AgentProviderLabel: Record<AgentProvider, string> = {
  [AgentProvider.custom]: 'Other',
  [AgentProvider.vapi]: 'VAPI',
  [AgentProvider.retell]: 'Retell',
  [AgentProvider.synthflow]: 'Synthflow',
  [AgentProvider.elevenlabs]: 'ElevenLabs',
  [AgentProvider.bland]: 'Bland AI',
  [AgentProvider.livekit]: 'LiveKit',
  [AgentProvider.pipecat]: 'Pipecat',
  [AgentProvider.koreai]: 'Kore.ai',
  [AgentProvider.agentforce]: 'Agentforce',
  [AgentProvider.genesys]: 'Genesys',
  [AgentProvider.cisco]: 'Webex',
  [AgentProvider.amazon_connect]: 'Amazon',
  [AgentProvider.agora]: 'Agora',
  [AgentProvider.telnyx]: 'Telnyx',
  [AgentProvider.sierra]: 'Sierra',
  [AgentProvider.gemini_cx]: 'Gemini Enterprise CX',
  [AgentProvider.assemblyai]: 'AssemblyAI',
  [AgentProvider.smallest]: 'Smallest AI',
};
