import 'server-only';

import pg from 'pg';

type QueryArgs = Parameters<pg.Client['query']>;

const QUERY_TIMEOUT_MESSAGE = 'Query read timeout';

const isQueryTimeout = (error: unknown) =>
  error instanceof Error && error.message === QUERY_TIMEOUT_MESSAGE;

const isPromiseQuery = (args: unknown[]) => {
  const [first] = args;
  if (typeof args.at(-1) === 'function') return false;
  if (typeof first !== 'object' || first === null) return true;
  return !('submit' in first);
};

export class SerialPgClient extends pg.Client {
  constructor(config?: string | pg.ClientConfig) {
    super(config);
    const query = this.query.bind(this) as (...args: QueryArgs) => unknown;
    let tail: Promise<unknown> = Promise.resolve();
    this.query = ((...args: QueryArgs) => {
      if (!isPromiseQuery(args)) return query(...args);
      const result = tail.then(() => query(...args));
      tail = result.catch(() => undefined);
      result.catch((error: unknown) => {
        if (isQueryTimeout(error)) void this.end().catch(() => undefined);
      });
      return result;
    }) as pg.Client['query'];
  }
}
