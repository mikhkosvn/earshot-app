import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
    return;
  }
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  await import('../sentry.server.config');
  if (process.env.NEXT_PHASE === 'phase-production-build') return;
  const { startWorker } = await import('@/server/worker/start-worker');
  startWorker();
}

export const onRequestError = Sentry.captureRequestError;
