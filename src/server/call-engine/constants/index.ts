export const CallDirection = {
  outbound: 'outbound',
  inbound: 'inbound',
} as const;

export type CallDirection = (typeof CallDirection)[keyof typeof CallDirection];

export const TranscriptRole = {
  main_agent: 'main_agent',
  testing_agent: 'testing_agent',
} as const;

export type TranscriptRole =
  (typeof TranscriptRole)[keyof typeof TranscriptRole];

export const TRANSCRIPT_ROLE_LABEL: Record<TranscriptRole, string> = {
  [TranscriptRole.main_agent]: 'Main Agent',
  [TranscriptRole.testing_agent]: 'Testing Agent',
};

export const CallEndedReason = {
  main_agent_ended_call: 'main-agent-ended-call',
  testing_agent_ended_call: 'testing-agent-ended-call',
  max_duration_reached: 'max-duration-reached',
  no_answer: 'no-answer',
  error: 'error',
} as const;

export type CallEndedReason =
  (typeof CallEndedReason)[keyof typeof CallEndedReason];

export const CALL_ENDED_REASON_LABEL: Record<CallEndedReason, string> = {
  [CallEndedReason.main_agent_ended_call]: 'Main agent-ended-call',
  [CallEndedReason.testing_agent_ended_call]: 'Testing agent-ended-call',
  [CallEndedReason.max_duration_reached]: 'Max duration reached',
  [CallEndedReason.no_answer]: 'No answer',
  [CallEndedReason.error]: 'Error',
};

export const CallEngineKind = {
  mock: 'mock',
  http: 'http',
} as const;

export type CallEngineKind =
  (typeof CallEngineKind)[keyof typeof CallEngineKind];

export const CallEventType = {
  end_of_call: 'end_of_call',
} as const;

export type CallEventType = (typeof CallEventType)[keyof typeof CallEventType];

export const CallRefKind = {
  run: 'run',
  test_call: 'test_call',
} as const;

export type CallRefKind = (typeof CallRefKind)[keyof typeof CallRefKind];

export const CALL_REF_SEPARATOR = ':';

export const CALL_SERVICE_CALLS_PATH = '/calls';
export const CALL_SERVICE_TIMEOUT_MS = 10_000;
export const RECORDING_DOWNLOAD_TIMEOUT_MS = 45_000;
export const RECORDING_URL_PROTOCOL = /^https?$/;

export const RECORDING_CONTENT_TYPE = 'audio/wav';
export const RECORDING_SAMPLE_RATE = 8000;
export const RECORDING_CHANNELS = 2;
export const MAIN_CHANNEL_INDEX = 0;
export const TESTING_CHANNEL_INDEX = 1;
export const WAVEFORM_PEAK_COUNT = 1500;
export const WAVEFORM_VERSION = 1;
