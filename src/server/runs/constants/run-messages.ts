export const RunMessage = {
  agentMissing: 'The agent does not exist.',
  agentNoPhoneNumber:
    'The agent has no phone number. Add a phone number in the agent settings, or enter one in the Phone Number field.',
  evaluatorMissing: 'A selected evaluator does not exist.',
  noEvaluators: 'Select at least one evaluator.',
  personalityNotEnabled:
    'A selected personality is not enabled for this project.',
  testProfileOtherAgent:
    'A selected test profile does not belong to the agent.',
  mockToolOtherAgent: 'A selected mock tool does not belong to the agent.',
  tooManyRuns:
    'The run has too many calls. Select fewer evaluators, personalities, or test profiles, or a lower number of times to run.',
  callNotAnswered: 'The call was not answered.',
  callFailed: 'The call could not be placed.',
  runTimedOut:
    'The run did not finish in time. The server may have restarted during the call.',
  resultNotCancellable: 'The result has no queued runs to cancel.',
  specInvalidJson: 'The spec is not valid JSON.',
  specInvalid: 'The spec has errors. Fix them and check the spec again.',
} as const;

export type RunMessage = (typeof RunMessage)[keyof typeof RunMessage];
