import 'server-only';

import { OAuth2Client } from 'google-auth-library';

import { CallEngineOperation } from '@/server/call-engine/constants';
import { recordStepFailure } from '@/server/common/logging/event-fields';

const BEARER_PREFIX = 'Bearer ';

const authClient = new OAuth2Client();

const readPushConfig = () => {
  const audience = process.env.PUBSUB_PUSH_AUDIENCE;
  const serviceAccount = process.env.PUBSUB_PUSH_SERVICE_ACCOUNT;
  if (!audience || !serviceAccount) {
    throw new Error(
      'PUBSUB_PUSH_AUDIENCE and PUBSUB_PUSH_SERVICE_ACCOUNT must be set.',
    );
  }
  return { audience, serviceAccount };
};

const readTokenEmail = async (idToken: string, audience: string) => {
  try {
    const ticket = await authClient.verifyIdToken({ idToken, audience });
    const payload = ticket.getPayload();
    if (!payload?.email_verified) return null;
    return payload.email ?? null;
  } catch (error) {
    recordStepFailure(CallEngineOperation.verify_push_token, error);
    return null;
  }
};

export const verifyPushToken = async (authorization: string | null) => {
  const { audience, serviceAccount } = readPushConfig();
  if (!authorization?.startsWith(BEARER_PREFIX)) return false;
  const email = await readTokenEmail(
    authorization.slice(BEARER_PREFIX.length),
    audience,
  );
  return email === serviceAccount;
};
