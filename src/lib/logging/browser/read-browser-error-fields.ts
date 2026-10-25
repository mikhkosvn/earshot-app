import type { LogFields } from '../types';

const readDigest = (error: Error) => {
  const digest: unknown = Reflect.get(error, 'digest');
  if (typeof digest === 'string') return digest;
  return undefined;
};

export const readBrowserErrorFields = (error: unknown): LogFields => {
  if (!(error instanceof Error)) return { type: typeof error };
  return {
    type: error.name,
    message: error.message,
    digest: readDigest(error),
  };
};
