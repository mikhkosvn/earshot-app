const SIMPLE_KEY = /^[A-Za-z_][A-Za-z0-9_]*$/;

export const TEST_PROFILE_TOKEN = '{{test_profile}}';

export const OUTCOME_BASE_TOKENS = [
  TEST_PROFILE_TOKEN,
  '{{metadata}}',
  '{{metadata["key"]}}',
  '{{provider_call_details}}',
  '{{evaluator.instructions}}',
];

export const HINT_TOKENS = {
  pattern: '{{test_profile["field_name"]}}',
  first: '{{test_profile["Name"]}}',
  second: '{{test_profile["Existing conditions"]}}',
};

export const profileKeyToken = (key: string) => {
  if (SIMPLE_KEY.test(key)) return `{{test_profile.${key}}}`;
  return `{{test_profile["${key}"]}}`;
};
