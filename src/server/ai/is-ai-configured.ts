import 'server-only';

export const isAiConfigured = () => Boolean(process.env.ANTHROPIC_API_KEY);
