export const DESCRIPTION_PLACEHOLDER = [
  'This metric evaluates whether the Main Agent initiates the conversation with a greeting.',
  "Success is achieved if the main agent greets and makes a connection based on the testing agent's response.",
  "Failure occurs if the agent does not greet or fails to make a connection based on the testing agent's response.",
].join('\n');

export const DESCRIPTION_HELP =
  'These are the metrics our LLM judges will use to evaluate your call. Be as verbose as possible.';

export const CUSTOM_CODE_HELP =
  'Write your custom evaluation logic in Python. The code will be executed in a Python environment.';

export const AUDIO_HELP =
  "Lets the LLM judge hear tone, pace, silence, and other signals the transcript can't capture.";

export const TRIGGER_PROMPT_PLACEHOLDER =
  'Return true if the testing agent is trying to book an appointment and False otherwise.';

export const TRIGGER_PROMPT_HELP =
  'Specify the custom prompt that determines when this metric should be evaluated';

export const TRIGGER_CODE_HELP =
  'Write Python that reads data and sets _result to True to run the metric or False to skip it, and _explanation to a string.';

export const JUDGE_DEPENDENCY_HELP =
  'These metrics run first and their results are added to the prompt. Insert a reference to use a result at a specific place.';

export const PYTHON_DEPENDENCY_HELP =
  'These metrics run first; copy a key to read their results from the data dictionary.';

export const ROLE_SUBTITLE =
  'Your AI agent is Main Agent and User is Test Agent (Earshot)';

export const ROLE_NOTE =
  'Your AI Agent is Main Agent and User is Test Agent (Earshot).';

export const METRIC_TYPE_INFO =
  'Boolean returns True or False. Rating returns a score from 1 to 5. Enum returns one of the keys that you enter. Numeric returns a number.';

export const EVALUATION_TRIGGER_INFO =
  'Always evaluates the metric on every call. Custom evaluates the metric only when the trigger returns True.';

export const TRANSCRIPT_SOURCE_INFO =
  'The Earshot transcript is the transcript that Earshot makes from the call. The provider transcript is the transcript that your voice provider sends. The project settings select the source.';
