const DEVELOPMENT_TRACES_SAMPLE_RATE = 1;
const PRODUCTION_TRACES_SAMPLE_RATE = 0.1;

const readTracesSampleRate = () => {
  const configured = Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE);
  if (process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE && configured >= 0) {
    return configured;
  }
  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_TRACES_SAMPLE_RATE;
  }
  return DEVELOPMENT_TRACES_SAMPLE_RATE;
};

export const readSentryOptions = () => ({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_APP_VERSION,
  tracesSampleRate: readTracesSampleRate(),
  sendDefaultPii: false,
  enableLogs: true,
});
