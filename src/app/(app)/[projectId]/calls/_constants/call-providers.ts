import type { LucideIcon } from 'lucide-react';
import {
  AudioLinesIcon,
  BotIcon,
  CableIcon,
  MicIcon,
  PauseIcon,
  RadioTowerIcon,
  WaypointsIcon,
  WorkflowIcon,
} from 'lucide-react';

export const CallProvider = {
  retell: 'retell',
  vapi: 'vapi',
  elevenlabs: 'elevenlabs',
  blandAi: 'bland_ai',
  synthflow: 'synthflow',
  livekit: 'livekit',
  pipecat: 'pipecat',
  custom: 'custom',
} as const;

export type CallProvider = (typeof CallProvider)[keyof typeof CallProvider];

export const CALL_PROVIDER_LABEL: Record<CallProvider, string> = {
  [CallProvider.retell]: 'Retell',
  [CallProvider.vapi]: 'VAPI',
  [CallProvider.elevenlabs]: 'ElevenLabs',
  [CallProvider.blandAi]: 'Bland AI',
  [CallProvider.synthflow]: 'Synthflow',
  [CallProvider.livekit]: 'LiveKit',
  [CallProvider.pipecat]: 'Pipecat',
  [CallProvider.custom]: 'Custom',
};

export const CALL_PROVIDER_EXAMPLE_LABEL: Record<CallProvider, string> = {
  ...CALL_PROVIDER_LABEL,
  [CallProvider.custom]: 'Custom API',
};

export const CALL_PROVIDER_ICON: Record<CallProvider, LucideIcon> = {
  [CallProvider.retell]: AudioLinesIcon,
  [CallProvider.vapi]: MicIcon,
  [CallProvider.elevenlabs]: PauseIcon,
  [CallProvider.blandAi]: RadioTowerIcon,
  [CallProvider.synthflow]: WorkflowIcon,
  [CallProvider.livekit]: WaypointsIcon,
  [CallProvider.pipecat]: BotIcon,
  [CallProvider.custom]: CableIcon,
};

export const CALL_PROVIDERS = Object.values(CallProvider);

export const SnippetLanguage = {
  python: 'python',
} as const;

export type SnippetLanguage =
  (typeof SnippetLanguage)[keyof typeof SnippetLanguage];

export const SNIPPET_LANGUAGE_ITEMS = [
  { value: SnippetLanguage.python, label: 'Python' },
];
