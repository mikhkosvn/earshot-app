export const DEFAULT_MOCK_TOOL_MAPPINGS_JSON = JSON.stringify(
  [{ input: {}, output: {} }],
  null,
  2,
);

export const MOCK_TOOL_MAPPINGS_HELP =
  'Each mapping should have an "input" and "output" object. Add an optional "response" with "status_code" (200-299 except 204/205, or 400-599), "headers" and "delay_seconds" (up to 300) to simulate a failing or slow tool.';
