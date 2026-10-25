import { ProviderKeyProvider } from '@/generated/prisma/enums';

export const ProviderKeyProviderLabel: Record<ProviderKeyProvider, string> = {
  [ProviderKeyProvider.vapi]: 'VAPI',
  [ProviderKeyProvider.retell]: 'Retell',
  [ProviderKeyProvider.synthflow]: 'Synthflow',
  [ProviderKeyProvider.elevenlabs]: 'ElevenLabs',
  [ProviderKeyProvider.bland]: 'Bland',
  [ProviderKeyProvider.livekit]: 'LiveKit',
  [ProviderKeyProvider.pipecat]: 'Pipecat',
};
