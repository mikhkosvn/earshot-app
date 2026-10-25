import { receivePushedCallEvent } from '@/server/call-engine/events/receive-pushed-call-event';

export async function POST(request: Request) {
  const status = await receivePushedCallEvent({
    authorization: request.headers.get('authorization'),
    body: await request.text(),
  });
  return new Response(null, { status });
}
