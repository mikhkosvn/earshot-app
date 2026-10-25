import { ScenarioTool } from '@/generated/prisma/enums';

export const ScenarioToolDescription: Record<ScenarioTool, string> = {
  [ScenarioTool.dtmf]:
    'Allows Test Agent to send DTMF tones during the call. Use this when you want to test scenarios where the agent needs to send button presses.',
  [ScenarioTool.receive_dtmf]:
    'Allows Test Agent to receive DTMF tones from the call. Use this when you want to test scenarios where the agent needs to accept button presses from the user.',
  [ScenarioTool.end_call]:
    'Allows Test Agent to end the call at any point during the conversation. Use this when you want the evaluator to have control over call termination.',
  [ScenarioTool.end_call_only_on_transfer]:
    'Allows Test Agent to end the call only when a transfer occurs. This tool can only be used when a transfer happens during the conversation.',
  [ScenarioTool.send_sms_tool_call]:
    'Allows Test Agent to send SMS messages during the call. Use this when you want to test scenarios involving SMS functionality.',
  [ScenarioTool.call_hold]:
    'Allows Test Agent to hold the call (pause speaking) at any point during the conversation. Use this when you want to test scenarios where the agent expects the caller to wait silently.',
};

export const SCENARIO_TOOL_ORDER: ScenarioTool[] = [
  ScenarioTool.dtmf,
  ScenarioTool.receive_dtmf,
  ScenarioTool.end_call,
  ScenarioTool.end_call_only_on_transfer,
  ScenarioTool.send_sms_tool_call,
  ScenarioTool.call_hold,
];

export const DEFAULT_SCENARIO_TOOLS: ScenarioTool[] = [ScenarioTool.end_call];
