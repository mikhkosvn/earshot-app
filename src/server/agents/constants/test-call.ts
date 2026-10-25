export const TestConnectionStatus = {
  queued: 'queued',
  dialing: 'dialing',
  in_call: 'in_call',
  passed: 'passed',
  unverified: 'unverified',
  failed: 'failed',
} as const;

export type TestConnectionStatus =
  (typeof TestConnectionStatus)[keyof typeof TestConnectionStatus];

export const TEST_CONNECTION_STATUS_LABEL: Record<
  TestConnectionStatus,
  string
> = {
  [TestConnectionStatus.queued]: 'Waiting for a free call slot',
  [TestConnectionStatus.dialing]: 'Calling your agent',
  [TestConnectionStatus.in_call]: 'Talking to your agent',
  [TestConnectionStatus.passed]: 'Your agent answered and responded',
  [TestConnectionStatus.unverified]: 'Your agent answered but did not speak',
  [TestConnectionStatus.failed]: 'Your agent did not answer',
};

export const TestStepKey = {
  configuration: 'configuration',
  place: 'place',
  answer: 'answer',
} as const;

export type TestStepKey = (typeof TestStepKey)[keyof typeof TestStepKey];

export const TestStepStatus = {
  pending: 'pending',
  running: 'running',
  passed: 'passed',
  failed: 'failed',
} as const;

export type TestStepStatus =
  (typeof TestStepStatus)[keyof typeof TestStepStatus];

export const TestVerdict = {
  all_passed: 'all_passed',
  some_failed: 'some_failed',
  all_failed: 'all_failed',
} as const;

export type TestVerdict = (typeof TestVerdict)[keyof typeof TestVerdict];

export const TEST_CALL_IN_PROGRESS_HEADLINE = 'Testing your connections…';

export const TEST_CALL_MAX_DURATION_SECONDS = 60;

export const TEST_CALL_FIRST_MESSAGE = 'Hello, can you hear me?';

export const TEST_CALL_TRANSCRIPT_PREVIEW_TURNS = 6;
