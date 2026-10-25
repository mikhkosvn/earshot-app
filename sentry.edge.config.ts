import * as Sentry from '@sentry/nextjs';

import { readSentryOptions } from '@/lib/sentry/read-sentry-options';

Sentry.init(readSentryOptions());
