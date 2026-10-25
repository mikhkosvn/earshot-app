export const TEST_PROFILE_HELP =
  'Test profile is the information you expect Test Agent to know. Example the name, date of birth etc.';

export const FIRST_MESSAGE_HELP =
  'Enter the first message to be said by Test Agent. If empty, Test Agent will wait to receive a message';

export const INSTRUCTIONS_HELP =
  'This is the instructions that the AI evaluator will use. More detailed instructions will result in a more accurate evaluation';

export const INSTRUCTIONS_PLACEHOLDER = `<scenario>
- You are calling a customer support agent to return an order.
- Begin by being slightly unsure about your exact order name.
- When asked about your name and order id, at first give incorrect order id.
- Correct it after agent denies request.
- Be ready to provide other information when requested.
</scenario>`;

export const INSTRUCTIONS_GUIDE =
  'Refer to the Test Agent in first person like "You are". Do not provide exact steps like when AI Agent says "xyz", do this. Keep all information separate in information block.';

export const EXPECTED_OUTCOME_PLACEHOLDER = `- The Main Agent asks for Name and Date of Birth
- The Main Agent attempts to get correct date of birth again
- After successful verification, the Main agent informs testing agent that return request is accepted.`;

export const EXPECTED_OUTCOME_GUIDE =
  'AI agent is "Main Agent" and User is "Testing Agent".';

export const MAX_DURATION_HELP =
  "Optional: Override project's max call duration (10-3600 seconds)";

export const MAX_DURATION_PLACEHOLDER = 'Leave empty to use project default';

export const AGENT_HELP = 'Select the agent to test with this evaluator';

export const FOLDER_HELP = 'Select the folder to save the evaluator';

export const PERSONALITY_HELP = 'Tone of the conversation for the Test Agent.';

export const LANGUAGE_HELP = 'Select the language of the conversation';

export const TAGS_HELP = 'Press Enter to add a tag';

export const METRICS_HELP = 'Select metrics to evaluate the conversation';

export const TOOLS_HELP = 'Select which tools to enable for this evaluator';
