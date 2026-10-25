export const MAX_FAILURE_REASONS = 5;
export const MAX_NEXT_STEPS = 4;
export const MAX_WORKFLOW_PATHS = 6;
export const MIN_WORKFLOW_PATHS = 2;
export const MAX_METRIC_SUMMARY_SENTENCES = 3;
export const MAX_TRANSCRIPT_CHARACTERS = 2500;
export const MAX_RUNS_IN_PROMPT = 20;
export const ANALYSIS_MAX_TOKENS = 4000;
export const PATH_LABEL_MAX_WORDS = 7;
export const PATH_MATCH_MIN_WORDS = 1;
export const PATH_WORD_MIN_LENGTH = 5;

export const ANALYST_SYSTEM_PROMPT = [
  'You analyze the results of simulated phone calls that test a voice AI agent.',
  'The Main Agent is the agent under test. The Testing Agent is the simulated caller.',
  'Write short, plain sentences. Refer to calls by their run ID when it helps.',
  'Use only the facts in the data. Do not invent calls, numbers, or causes.',
].join('\n');
