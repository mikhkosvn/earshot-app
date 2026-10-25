import { downloadRecording } from '@/server/call-engine/events/download-recording';
import { handleCallEvent } from '@/server/call-engine/events/handle-call-event';
import { readPushedCallEvent } from '@/server/call-engine/events/read-pushed-call-event';
import { verifyPushToken } from '@/server/call-engine/events/verify-push-token';

const emptyResponse = (status: number) => new Response(null, { status });

export async function POST(request: Request) {
  try {
    const verified = await verifyPushToken(
      request.headers.get('authorization'),
    );
    if (!verified) return emptyResponse(401);
    const event = readPushedCallEvent(await request.text());
    if (!event) return emptyResponse(400);
    await handleCallEvent(event, downloadRecording);
    return emptyResponse(204);
  } catch (error) {
    console.error('[call-engine] The pushed event failed.', error);
    return emptyResponse(500);
  }
}
