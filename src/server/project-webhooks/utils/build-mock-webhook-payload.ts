import 'server-only';

import { WebhookNotification } from '@/generated/prisma/enums';
import { WebhookEvent } from '@/server/project-webhooks/constants/webhook-event';
import type { WebhookPayload } from '@/server/project-webhooks/types';

interface MockWebhook {
  event: WebhookEvent;
  payload: WebhookPayload;
  idempotencyKey?: string;
}

interface ResultOutcome {
  success: boolean;
  isCronjob: boolean;
  errorMessage: string;
}

const MOCK_RESULT_ID = 101;
const MOCK_RUN_ID = 5001;
const MOCK_CALL_LOG_ID = 77;

const mockMetric = (passed: boolean) => ({
  id: 9,
  name: 'Expected Outcome',
  eval_type: 'binary',
  passed,
  explanation: [
    'The main agent confirmed the appointment date and time with the caller.',
  ],
});

const mockResultPayload = (
  now: string,
  { success, isCronjob, errorMessage }: ResultOutcome,
): WebhookPayload => ({
  id: MOCK_RESULT_ID,
  name: 'Webhook test result',
  agent: 1,
  status: 'completed',
  met_expected_outcome_count: Number(success),
  total_expected_outcome_count: 1,
  success_rate: Number(success) * 100,
  run_as_text: false,
  is_cronjob: isCronjob,
  created_at: now,
  runs: {
    [MOCK_RUN_ID]: {
      id: MOCK_RUN_ID,
      scenario: {
        id: 1,
        name: 'Book an appointment',
        personality_name: 'Friendly caller',
        expected_outcome_prompt:
          'The agent books an appointment for next Tuesday at 10 AM.',
      },
      expected_outcome: {},
      success,
      evaluation: { metrics: [mockMetric(success)] },
      transcript_object: [
        {
          role: 'Testing Agent',
          time: '00:00',
          content: 'Hi, I would like to book an appointment.',
          start_time: 0,
          end_time: 2,
        },
        {
          role: 'Main Agent',
          time: '00:02',
          content: 'Sure. Does next Tuesday at 10 AM work for you?',
          start_time: 2,
          end_time: 5,
        },
      ],
      voice_recording: 'https://example.com/recordings/5001.wav',
      timestamp: now,
      executed_at: now,
      error_message: errorMessage,
    },
  },
});

const mockPreTriggerPayload = (now: string): WebhookPayload => ({
  result_id: MOCK_RESULT_ID,
  label: 'Webhook test run',
  agent_id: '1',
  timestamp: now,
  runs: {
    [MOCK_RUN_ID]: {
      id: MOCK_RUN_ID,
      scenario: { id: 1, name: 'Book an appointment' },
      test_profile: {
        id: 2,
        name: 'Returning customer',
        information: { main_agent_variables: { allow_cancellation: true } },
      },
      personality: { id: 3, name: 'Friendly caller' },
      phone_number: '+14155550100',
      outbound_phone_number: null,
    },
  },
});

const mockCallLogPayload = (now: string, success: boolean): WebhookPayload => ({
  id: MOCK_CALL_LOG_ID,
  call_id: 'call_webhook_test_0001',
  agent: 1,
  agent_id: '1',
  duration: '01:10',
  voice_recording_url: 'https://example.com/recordings/call-77.wav',
  status: 'success',
  success,
  is_reviewed: false,
  feedback: '',
  critical_categories: [],
  evaluation: { metrics: [mockMetric(success)] },
  transcript:
    '[0:00] Main Agent: Thanks for calling. How can I help?\n[0:03] Testing Agent: I need to change my booking. My email is jane@example.com.',
  transcript_object: [
    {
      role: 'Main Agent',
      time: '0:00',
      content: 'Thanks for calling. How can I help?',
    },
    {
      role: 'Testing Agent',
      time: '0:03',
      content: 'I need to change my booking. My email is jane@example.com.',
    },
  ],
  call_ended_reason: 'customer-ended-call',
  dropoff_point: '',
  topic: '{}',
  customer_number: '+14155550123',
  user_generated_transcript: null,
  metadata: { crm_id: 'CRM-2001', email: 'jane@example.com' },
  dynamic_variables: { customer_name: 'Jane Doe' },
  timestamp: now,
  created_at: now,
  updated_at: now,
});

const mockDailyReportPayload = (now: string): WebhookPayload => ({
  report_date: now.slice(0, 10),
  total_calls: 42,
  successful_calls: 37,
  failed_calls: 5,
  success_rate: 88.1,
});

const resultMock = (now: string, outcome: ResultOutcome): MockWebhook => ({
  event: WebhookEvent.resultCompleted,
  payload: mockResultPayload(now, outcome),
});

const callLogMock = (
  event: WebhookEvent,
  now: string,
  success: boolean,
): MockWebhook => ({ event, payload: mockCallLogPayload(now, success) });

const SETUP_ERROR = 'The call setup failed.';

export const buildMockWebhookPayload = (
  notification: WebhookNotification,
  now = new Date().toISOString(),
): MockWebhook => {
  switch (notification) {
    case WebhookNotification.result_pre_trigger:
      return {
        event: WebhookEvent.resultPreTrigger,
        payload: mockPreTriggerPayload(now),
        idempotencyKey: `result_pre_trigger:${MOCK_RESULT_ID}`,
      };
    case WebhookNotification.result_success:
      return resultMock(now, {
        success: true,
        isCronjob: false,
        errorMessage: '',
      });
    case WebhookNotification.result_failure:
      return resultMock(now, {
        success: false,
        isCronjob: false,
        errorMessage: '',
      });
    case WebhookNotification.result_error:
      return resultMock(now, {
        success: false,
        isCronjob: false,
        errorMessage: SETUP_ERROR,
      });
    case WebhookNotification.cronjob_success:
      return resultMock(now, {
        success: true,
        isCronjob: true,
        errorMessage: '',
      });
    case WebhookNotification.cronjob_failure:
      return resultMock(now, {
        success: false,
        isCronjob: true,
        errorMessage: '',
      });
    case WebhookNotification.cronjob_error:
      return resultMock(now, {
        success: false,
        isCronjob: true,
        errorMessage: SETUP_ERROR,
      });
    case WebhookNotification.call_log_success:
      return callLogMock(WebhookEvent.callLogCompleted, now, true);
    case WebhookNotification.call_log_failure:
      return callLogMock(WebhookEvent.callLogCompleted, now, false);
    case WebhookNotification.call_log_reevaluated_success:
      return callLogMock(WebhookEvent.callLogReevaluated, now, true);
    case WebhookNotification.call_log_reevaluated_failure:
      return callLogMock(WebhookEvent.callLogReevaluated, now, false);
    case WebhookNotification.daily_report:
      return {
        event: WebhookEvent.dailyReport,
        payload: mockDailyReportPayload(now),
      };
  }
};
