import { ScenarioTool } from '@/generated/prisma/enums';

export const ScenarioToolLabel: Record<ScenarioTool, string> = {
  [ScenarioTool.dtmf]: 'Send DTMF',
  [ScenarioTool.receive_dtmf]: 'Receive DTMF',
  [ScenarioTool.end_call]: 'End Call',
  [ScenarioTool.end_call_only_on_transfer]: 'End Call Only on Transfer',
  [ScenarioTool.send_sms_tool_call]: 'Send SMS',
  [ScenarioTool.call_hold]: 'Call Hold',
};
