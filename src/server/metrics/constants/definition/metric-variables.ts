export interface MetricVariable {
  code: string;
  description: string;
}

export const JUDGE_VARIABLE_CHIPS: string[] = [
  '{{transcript}}',
  '{{transcript_json}}',
  '{{date}}',
  '{{call_end_reason}}',
  '{{agent.description}}',
];

export const PYTHON_VARIABLE_CHIPS: string[] = [
  'data["transcript"]',
  'data["transcript_json"]',
  'data["call_end_reason"]',
  'data["test_profile"]',
];

export const JUDGE_VARIABLES: MetricVariable[] = [
  {
    code: '{{transcript}}',
    description:
      'Full conversation transcript as a string. Resolves to the Earshot transcript, or the provider transcript if that project setting is on',
  },
  {
    code: '{{transcript_json}}',
    description: 'Transcript as a structured list',
  },
  {
    code: '{{date}}',
    description: 'Date of the call in the format YYYY-MM-DD',
  },
  { code: '{{call_end_reason}}', description: 'Call end reason as a string' },
  { code: '{{agent.description}}', description: 'Description of the agent' },
  { code: '{{agent.name}}', description: 'Name of the agent' },
  {
    code: '{{agent.language}}',
    description: "Agent's language code (e.g., en, es, fr)",
  },
  {
    code: '{{agent.inbound}}',
    description: 'Whether agent handles inbound calls (true/false)',
  },
  { code: '{{agent.contact_number}}', description: "Agent's phone number" },
  {
    code: '{{timestamp}}',
    description: "Call's timestamp in ISO 8601 format",
  },
  {
    code: '{{earshot_transcript_json}}',
    description: 'Earshot transcript (Simulation only)',
  },
  { code: '{{metadata}}', description: 'Additional metadata as a dictionary' },
  {
    code: '{{metadata["key"]}}',
    description: 'Access specific metadata values using keys',
  },
  {
    code: '{{dynamic_variables}}',
    description: 'Dynamic variables as a dictionary',
  },
  { code: '{{test_profile}}', description: 'Test profile as a dictionary' },
  {
    code: '{{call_duration}}',
    description: 'Call duration in seconds as an integer',
  },
  {
    code: '{{provider_call_data}}',
    description: 'Provider call data as a dictionary',
  },
  {
    code: '{{evaluator.instructions}}',
    description: "Evaluator's instructions text (Simulation only)",
  },
  {
    code: '{{evaluator.conditional_action_instructions}}',
    description:
      "Evaluator's conditional action instructions; only populated for Conditional Actions evaluators (Simulation only)",
  },
];

export const PYTHON_VARIABLES: MetricVariable[] = [
  {
    code: 'data["transcript"]',
    description: 'Full conversation transcript as a string',
  },
  {
    code: 'data["transcript_json"]',
    description: 'Transcript as a list of turns with role, content, and times',
  },
  {
    code: 'data["call_duration"]',
    description: 'Call duration in seconds',
  },
  {
    code: 'data["call_end_reason"]',
    description: 'Call end reason as a string',
  },
  {
    code: 'data["agent_description"]',
    description: 'Description of the agent',
  },
  {
    code: 'data["date"]',
    description: 'Date of the call in the format YYYY-MM-DD',
  },
  {
    code: 'data["timestamp"]',
    description: "Call's timestamp in ISO 8601 format",
  },
  {
    code: 'data["metadata"]',
    description: 'Additional metadata as a dictionary',
  },
  {
    code: 'data["dynamic_variables"]',
    description: 'Dynamic variables as a dictionary (Observability only)',
  },
  {
    code: 'data["provider_call_data"]',
    description: 'Provider call data as a dictionary',
  },
  {
    code: 'data["test_profile"]',
    description: 'Test profile as a dictionary (Simulation only)',
  },
  {
    code: 'data["latency_data"]',
    description: 'Latency of each Main Agent turn in milliseconds',
  },
  {
    code: 'data["expected_outcome"]',
    description: 'Expected outcome prompt of the evaluator (Simulation only)',
  },
  {
    code: 'data["metrics"]',
    description: 'Results of the metrics in "Uses results from"',
  },
];
