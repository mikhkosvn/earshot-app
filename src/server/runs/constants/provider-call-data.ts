export const VAPI_API_URL = 'https://api.vapi.ai';
export const VAPI_CALLS_PATH = '/call';
export const VAPI_CALL_LIST_LIMIT = 100;
export const VAPI_REQUEST_TIMEOUT_MS = 15_000;
export const VAPI_WINDOW_BEFORE_START_MS = 120_000;
export const VAPI_WINDOW_AFTER_END_MS = 60_000;
export const VAPI_MAX_MATCH_GAP_MS = 30_000;
export const VAPI_INCOMPLETE_RETRY_COUNT = 3;
export const VAPI_INCOMPLETE_RETRY_DELAY_MS = 5_000;
export const ENGINE_DATA_KEY = 'engine';
export const ENGINE_FROM_NUMBER_KEY = 'from_number';
export const PROVIDER_CALL_DATA_STEP = 'runs.provider_call_data';

export const VapiOperation = {
  list_calls: 'vapi.calls.list',
} as const;

export type VapiOperation = (typeof VapiOperation)[keyof typeof VapiOperation];

export const ProviderCallDataSource = {
  engine: 'engine',
  vapi: 'vapi',
} as const;

export type ProviderCallDataSource =
  (typeof ProviderCallDataSource)[keyof typeof ProviderCallDataSource];

export const ProviderCallDataBranch = {
  not_vapi: 'not_vapi',
  no_api_key: 'no_api_key',
  no_match: 'no_match',
  matched: 'matched',
  matched_incomplete: 'matched_incomplete',
  failed: 'failed',
} as const;

export type ProviderCallDataBranch =
  (typeof ProviderCallDataBranch)[keyof typeof ProviderCallDataBranch];
