import {
  JUDGE_VARIABLE_CHIPS,
  JUDGE_VARIABLES,
  type MetricVariable,
  PYTHON_VARIABLE_CHIPS,
  PYTHON_VARIABLES,
} from '@/server/metrics/constants/definition/metric-variables';

export interface VariableSet {
  chips: string[];
  variables: MetricVariable[];
  transcriptCode: string;
  hintCodes: [string, string, string];
}

export const JUDGE_VARIABLE_SET: VariableSet = {
  chips: JUDGE_VARIABLE_CHIPS,
  variables: JUDGE_VARIABLES,
  transcriptCode: '{{transcript}}',
  hintCodes: [
    '{{test_profile["field_name"]}}',
    '{{test_profile["Name"]}}',
    '{{test_profile["Existing conditions"]}}',
  ],
};

export const PYTHON_VARIABLE_SET: VariableSet = {
  chips: PYTHON_VARIABLE_CHIPS,
  variables: PYTHON_VARIABLES,
  transcriptCode: 'data["transcript"]',
  hintCodes: [
    'data["test_profile"]["field_name"]',
    'data["test_profile"]["Name"]',
    'data["test_profile"]["Existing conditions"]',
  ],
};
