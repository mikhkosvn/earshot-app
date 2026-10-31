import { ScenarioTool } from '@/generated/prisma/enums';

export const ScenarioToolDbValue = {
  [ScenarioTool.dtmf]: 'VAPI_TOOL_DTMF',
  [ScenarioTool.receive_dtmf]: 'RECEIVE_DTMF',
  [ScenarioTool.end_call]: 'VAPI_TOOL_END_CALL',
  [ScenarioTool.end_call_only_on_transfer]:
    'VAPI_TOOL_END_CALL_ONLY_ON_TRANSFER',
  [ScenarioTool.send_sms_tool_call]: 'SEND_SMS_TOOL_CALL',
  [ScenarioTool.call_hold]: 'CALL_HOLD',
} as const satisfies Record<ScenarioTool, string>;

export type ScenarioToolDbValue =
  (typeof ScenarioToolDbValue)[keyof typeof ScenarioToolDbValue];

export const ScenarioField = {
  agent: 'agent',
  personality: 'personality',
  metrics: 'metrics',
  tool_ids: 'tool_ids',
  test_profile: 'test_profile',
  folder_path: 'folder_path',
} as const;

export type ScenarioField = (typeof ScenarioField)[keyof typeof ScenarioField];
