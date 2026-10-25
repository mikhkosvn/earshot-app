import * as Sentry from '@sentry/nextjs';

import { readSentryOptions } from '@/lib/sentry/read-sentry-options';
import { readServerTraceTargets } from '@/lib/sentry/read-server-trace-targets';

Sentry.init({
  ...readSentryOptions(),
  tracePropagationTargets: readServerTraceTargets(),
});
