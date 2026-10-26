'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { createPhoneNumber } from '@/server/telephony-phone-numbers/create-phone-number';
import { deletePhoneNumber } from '@/server/telephony-phone-numbers/delete-phone-number';
import { listPhoneNumbers } from '@/server/telephony-phone-numbers/list-phone-numbers';
import type {
  CreatePhoneNumberInput,
  DeletePhoneNumberInput,
  ListPhoneNumbersInput,
  PhoneNumberRow,
  UpdatePhoneNumberInput,
} from '@/server/telephony-phone-numbers/types';
import { updatePhoneNumber } from '@/server/telephony-phone-numbers/update-phone-number';
import { TelephonyPhoneNumbersActionOperation } from '@/server/telephony-phone-numbers/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listPhoneNumbersAction(
  args: ListPhoneNumbersInput,
): Promise<PhoneNumberRow[]> {
  return withActionEvent(
    TelephonyPhoneNumbersActionOperation.listPhoneNumbers,
    () => listPhoneNumbers(args),
  );
}

export async function createPhoneNumberAction(
  args: CreatePhoneNumberInput,
): Promise<ActionResult<PhoneNumberRow>> {
  return withActionEvent(
    TelephonyPhoneNumbersActionOperation.createPhoneNumber,
    () => runAction(() => createPhoneNumber(args)),
  );
}

export async function updatePhoneNumberAction(
  args: UpdatePhoneNumberInput,
): Promise<ActionResult<PhoneNumberRow>> {
  return withActionEvent(
    TelephonyPhoneNumbersActionOperation.updatePhoneNumber,
    () => runAction(() => updatePhoneNumber(args)),
  );
}

export async function deletePhoneNumberAction(
  args: DeletePhoneNumberInput,
): Promise<ActionResult<{ id: number }>> {
  return withActionEvent(
    TelephonyPhoneNumbersActionOperation.deletePhoneNumber,
    () => runAction(() => deletePhoneNumber(args)),
  );
}
