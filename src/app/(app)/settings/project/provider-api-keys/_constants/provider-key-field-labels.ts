import { ProviderKeyProvider } from '@/generated/prisma/enums';

export const ProviderKeyFieldLabel: Record<ProviderKeyProvider, string> = {
  [ProviderKeyProvider.vapi]: 'VAPI Private API Key',
  [ProviderKeyProvider.retell]: 'Retell API Key',
  [ProviderKeyProvider.synthflow]: 'Synthflow API Key',
  [ProviderKeyProvider.elevenlabs]: 'ElevenLabs API Key',
  [ProviderKeyProvider.bland]: 'Bland API Key',
  [ProviderKeyProvider.livekit]: 'LiveKit API Key',
  [ProviderKeyProvider.pipecat]: 'Pipecat API Key',
};

export const PROVIDER_KEY_PROVIDERS = Object.values(ProviderKeyProvider);

export const EMPTY_PROVIDER_KEYS: Record<ProviderKeyProvider, string> = {
  [ProviderKeyProvider.vapi]: '',
  [ProviderKeyProvider.retell]: '',
  [ProviderKeyProvider.synthflow]: '',
  [ProviderKeyProvider.elevenlabs]: '',
  [ProviderKeyProvider.bland]: '',
  [ProviderKeyProvider.livekit]: '',
  [ProviderKeyProvider.pipecat]: '',
};
