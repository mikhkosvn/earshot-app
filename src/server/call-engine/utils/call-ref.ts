import 'server-only';

import {
  CALL_REF_SEPARATOR,
  type CallRefKind,
} from '@/server/call-engine/constants';

export const formatCallRef = (kind: CallRefKind, id: number | string) =>
  `${kind}${CALL_REF_SEPARATOR}${id}`;
