import 'server-only';

import { ActionError } from '@/server/common/run-action';
import {
  NOT_FOUND_DETAIL,
  STATUS_CODE_NOT_FOUND,
} from '@/server/public-api/constants';

export const readRecordId = (value: string) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw new ActionError(NOT_FOUND_DETAIL, STATUS_CODE_NOT_FOUND);
  }
  return id;
};
