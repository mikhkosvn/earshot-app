export const DEFAULT_PAGE_SIZE = 30;
export const MAX_PAGE_SIZE = 500;
export const NON_FIELD_ERRORS_KEY = 'non_field_errors';
export const INVALID_API_KEY_DETAIL = 'Invalid API key.';
export const AUTHENTICATION_REQUIRED_DETAIL = 'Authentication required.';

export const HttpMethod = {
  get: 'GET',
  post: 'POST',
} as const;

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

export const RouteOperation = {
  file_download: 'files.download',
  shared_file_download: 'share_links.file_download',
  observe_call: 'observability.observe_call',
  list_call_logs: 'observability.list_call_logs',
} as const;

export type RouteOperation =
  (typeof RouteOperation)[keyof typeof RouteOperation];
