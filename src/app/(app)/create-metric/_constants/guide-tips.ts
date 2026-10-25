export interface GuideTip {
  title: string;
  text: string;
  examples: readonly { label?: string; text: string }[];
}

export const GUIDE_TIPS: readonly GuideTip[] = [
  {
    title: '1. Define Roles Clearly',
    text: 'Your prompt should reference your AI Agent as Main Agent and the other party as Testing Agent.',
    examples: [
      {
        text: 'Ex: This metric passes if the main agent asks for date of birth from the testing agent',
      },
    ],
  },
  {
    title: '2. Explicitly Define Success Criteria',
    text: 'Your metric text should mention what classifies as success or failure explicitly.',
    examples: [
      {
        text: 'This metric fails if the Main Agent is unable to book an appointment for the testing agent',
      },
    ],
  },
  {
    title: '3. Add Trigger',
    text: 'If you need the metric to only run in certain cases, add a prompt based trigger.',
    examples: [
      {
        label: 'Metric prompt',
        text: 'This metric fails if the Main Agent is unable to book an appointment for the testing agent',
      },
      {
        label: 'Trigger',
        text: 'Only when the testing agent is looking to book an appointment',
      },
    ],
  },
  {
    title: '4. Utilize Variables',
    text: 'Reference the available variables in your prompt to provide specific, structured data to the LLM judge. Click the buttons in the main form to copy them.',
    examples: [],
  },
];
