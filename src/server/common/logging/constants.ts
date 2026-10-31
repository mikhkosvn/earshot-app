export const EventKind = {
  server_action: 'server_action',
  route_handler: 'route_handler',
  worker_task: 'worker_task',
  background_task: 'background_task',
  call_event: 'call_event',
  job: 'job',
} as const;
export type EventKind = (typeof EventKind)[keyof typeof EventKind];

export const ExternalService = {
  postgres: 'postgres',
  anthropic: 'anthropic',
  call_service: 'call_service',
  pubsub: 'pubsub',
  google_auth: 'google_auth',
  smtp: 'smtp',
  webhook: 'webhook',
  code_runner: 'code_runner',
  file_storage: 'file_storage',
  transcription: 'transcription',
  vapi: 'vapi',
} as const;
export type ExternalService =
  (typeof ExternalService)[keyof typeof ExternalService];

export const TraceHeader = {
  sentry_trace: 'sentry-trace',
  baggage: 'baggage',
  traceparent: 'traceparent',
} as const;
export type TraceHeader = (typeof TraceHeader)[keyof typeof TraceHeader];

export const SERVICE_REQUEST_ID_HEADERS = [
  'x-request-id',
  'request-id',
  'x-cloud-trace-context',
  'x-amzn-requestid',
];

export const STATUS_CODE_OK = 200;
export const STATUS_CODE_SERVER_ERROR = 500;
export const STATUS_CODE_TOO_MANY_REQUESTS = 429;
