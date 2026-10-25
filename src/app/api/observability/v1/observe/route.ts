import { ingestObservedCall } from '@/server/call-logs/observe/ingest-observed-call';
import { withActionErrors } from '@/server/call-logs/utils/payload/action-error-response';
import { jsonResponse } from '@/server/public-api/json-response';
import { nonFieldErrorResponse } from '@/server/public-api/error-response';
import { withApiKey } from '@/server/public-api/with-api-key';

const readJson = async (request: Request) => {
  try {
    const body: unknown = await request.json();
    return { ok: true as const, body };
  } catch {
    return { ok: false as const };
  }
};

export const POST = withApiKey(async (request, { auth }) =>
  withActionErrors(async () => {
    const parsed = await readJson(request);
    if (!parsed.ok) return nonFieldErrorResponse(['Send a JSON body.']);
    const callLog = await ingestObservedCall({
      auth,
      body: parsed.body,
      origin: new URL(request.url).origin,
    });
    return jsonResponse(callLog, 201);
  }),
);
