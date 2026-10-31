export const DEFAULT_PAGE_SIZE = 30;
export const MAX_PAGE_SIZE = 500;
export const NON_FIELD_ERRORS_KEY = 'non_field_errors';
export const INVALID_API_KEY_DETAIL = 'Invalid API key.';
export const AUTHENTICATION_REQUIRED_DETAIL = 'Authentication required.';
export const NOT_FOUND_DETAIL = 'Not found.';
export const PROJECT_ID_REQUIRED_DETAIL = 'Send the project_id parameter.';

export const STATUS_CODE_CREATED = 201;
export const STATUS_CODE_NO_CONTENT = 204;
export const STATUS_CODE_NOT_FOUND = 404;

export const HttpMethod = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
} as const;

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

export const RouteOperation = {
  file_download: 'files.download',
  shared_file_download: 'share_links.file_download',
  observe_call: 'observability.observe_call',
  list_call_logs: 'observability.list_call_logs',
  list_agents: 'test_framework.list_agents',
  get_agent: 'test_framework.get_agent',
  create_agent: 'test_framework.create_agent',
  update_agent: 'test_framework.update_agent',
  delete_agent: 'test_framework.delete_agent',
  list_folders: 'test_framework.list_folders',
  create_folder: 'test_framework.create_folder',
  list_scenarios: 'test_framework.list_scenarios',
  get_scenario: 'test_framework.get_scenario',
  create_scenario: 'test_framework.create_scenario',
  delete_scenario: 'test_framework.delete_scenario',
  run_scenarios: 'test_framework.run_scenarios',
  list_test_profiles: 'test_framework.list_test_profiles',
  get_test_profile: 'test_framework.get_test_profile',
  create_test_profile: 'test_framework.create_test_profile',
  delete_test_profile: 'test_framework.delete_test_profile',
  list_metrics: 'test_framework.list_metrics',
  create_metric: 'test_framework.create_metric',
  delete_metric: 'test_framework.delete_metric',
  list_runs_bulk: 'test_framework.list_runs_bulk',
} as const;

export type RouteOperation =
  (typeof RouteOperation)[keyof typeof RouteOperation];

export const TEST_FRAMEWORK_ROUTE_PREFIX = '/api/test_framework/v1';
