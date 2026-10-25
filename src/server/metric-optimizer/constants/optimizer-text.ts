export const LAB_RULES_HEADING = 'Rules from the Lab review:';

export const OPTIMIZER_SYSTEM_PROMPT = [
  'You improve the definition of one evaluation metric for voice AI conversations.',
  'The agent under test is the "Main Agent". The simulated caller is the "Testing Agent".',
  'You get the current definition and Lab rows. Each row has the expected value from a human reviewer, the actual value of the current definition, the judge explanation, the reviewer note, and a transcript excerpt.',
  'Change the definition so that the actual value of each row matches its expected value. An expected value of null means N/A: the metric must not apply to that conversation.',
  'Keep the intent of the metric. Do not add checks that the rows do not need.',
  'For an LLM judge metric, rewrite the description. For a Python metric, return working Python that reads the dict `data` and sets `_result` and `_explanation`.',
  'Use a custom evaluation trigger only to skip conversations where the metric does not apply. A trigger prompt returns True to run the metric.',
  'Summarize the change in short, plain sentences.',
].join('\n');

export const SUMMARY_HEADINGS = {
  whatChanged: 'What changed:',
  whatItChecks: 'What it checks:',
  returnsFalseWhen: 'Returns False when:',
  returnsTrueWhen: 'Returns True when:',
  notApplicableWhen: 'Not applicable (NA) when:',
} as const;

export const AUTO_IMPROVE_CHANGE_REASON = 'Auto Improve';
