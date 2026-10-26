export const RunStep = {
  call_start: 'runs.call_start',
  execution: 'runs.execution',
  scoring: 'runs.scoring',
  completion: 'runs.completion',
  result_analysis: 'runs.result_analysis',
  completion_notices: 'runs.completion_notices',
  completion_webhook: 'runs.completion_webhook',
  completion_email: 'runs.completion_email',
  completion_notification: 'runs.completion_notification',
  pre_trigger_webhook: 'runs.pre_trigger_webhook',
} as const;

export type RunStep = (typeof RunStep)[keyof typeof RunStep];

export const RunOperation = {
  execute: 'runs.execute',
  score: 'runs.score',
} as const;

export type RunOperation = (typeof RunOperation)[keyof typeof RunOperation];

export const RunBranch = {
  not_in_progress: 'not_in_progress',
  agent_missing: 'agent_missing',
  agent_no_phone_number: 'agent_no_phone_number',
  call_start_failed: 'call_start_failed',
  call_started: 'call_started',
  not_stored: 'not_stored',
  call_not_completed: 'call_not_completed',
  scoring_scheduled: 'scoring_scheduled',
} as const;

export type RunBranch = (typeof RunBranch)[keyof typeof RunBranch];
