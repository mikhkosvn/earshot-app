export const WebhookEvent = {
  resultCompleted: 'result.completed',
  resultPreTrigger: 'result.pre_trigger',
  callLogCompleted: 'call_log.completed',
  callLogReevaluated: 'call_log.reevaluated',
  vapiWebhook: 'vapi.webhook',
  retellWebhook: 'retell.webhook',
  elevenlabsWebhook: 'elevenlabs.webhook',
  dailyReport: 'daily.report',
} as const;

export type WebhookEvent = (typeof WebhookEvent)[keyof typeof WebhookEvent];

export const CALL_LOG_WEBHOOK_EVENTS: readonly WebhookEvent[] = [
  WebhookEvent.callLogCompleted,
  WebhookEvent.callLogReevaluated,
];
