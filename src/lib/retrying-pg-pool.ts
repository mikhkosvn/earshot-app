import 'server-only';

import pg from 'pg';

type ReleaseClient = (release?: Error | boolean) => void;

type ConnectCallback = (
  error: Error | undefined,
  client: pg.PoolClient | undefined,
  done: ReleaseClient,
) => void;

const CONNECT_ATTEMPTS = 3;

const CONNECT_TIMEOUT_MESSAGES = [
  'Connection terminated due to connection timeout',
  'timeout exceeded when trying to connect',
];

const isConnectTimeout = (error: unknown) =>
  error instanceof Error && CONNECT_TIMEOUT_MESSAGES.includes(error.message);

const toError = (error: unknown) => {
  if (error instanceof Error) return error;
  return new Error(String(error));
};

const ignoreRelease: ReleaseClient = () => undefined;

export class RetryingPgPool extends pg.Pool {
  connectWithRetry(attemptsLeft = CONNECT_ATTEMPTS): Promise<pg.PoolClient> {
    return super.connect().catch((error: unknown) => {
      if (attemptsLeft <= 1 || !isConnectTimeout(error)) throw error;
      return this.connectWithRetry(attemptsLeft - 1);
    });
  }

  connect(): Promise<pg.PoolClient>;
  connect(callback: ConnectCallback): void;
  connect(callback?: ConnectCallback): Promise<pg.PoolClient> | undefined {
    const result = this.connectWithRetry();
    if (!callback) return result;
    result.then(
      (client) =>
        callback(undefined, client, (release) => client.release(release)),
      (error: unknown) => callback(toError(error), undefined, ignoreRelease),
    );
    return undefined;
  }
}
