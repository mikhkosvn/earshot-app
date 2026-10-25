export const TestCallOfferKind = {
  saved: 'saved',
  connections: 'connections',
} as const;

export type TestCallOfferKind =
  (typeof TestCallOfferKind)[keyof typeof TestCallOfferKind];

export const TEST_CALL_OFFER_TITLE: Record<TestCallOfferKind, string> = {
  [TestCallOfferKind.saved]: 'Saved — want to place a test call?',
  [TestCallOfferKind.connections]: 'Connections look good — place a test call?',
};

export const TEST_CALL_OFFER_CLOSE_LABEL: Record<TestCallOfferKind, string> = {
  [TestCallOfferKind.saved]: 'Continue',
  [TestCallOfferKind.connections]: 'Done',
};

export const TEST_CALL_INTRO =
  'A test call reaches your agent to confirm it answers and speaks. Each connection is a separate call, so pick only the ones you want to check.';
