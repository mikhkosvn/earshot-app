import { listPublicCallLogs } from '@/server/call-logs/observe/list-public-call-logs';
import { withActionErrors } from '@/server/call-logs/utils/payload/action-error-response';
import { jsonResponse } from '@/server/public-api/json-response';
import { withApiKey } from '@/server/public-api/with-api-key';

export const GET = withApiKey(async (request, { auth }) =>
  withActionErrors(async () =>
    jsonResponse(await listPublicCallLogs({ auth, request })),
  ),
);
