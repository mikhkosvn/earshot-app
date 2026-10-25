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

export async function listPhoneNumbersAction(
  args: ListPhoneNumbersInput,
): Promise<PhoneNumberRow[]> {
  return listPhoneNumbers(args);
}

export async function createPhoneNumberAction(
  args: CreatePhoneNumberInput,
): Promise<ActionResult<PhoneNumberRow>> {
  return runAction(() => createPhoneNumber(args));
}

export async function updatePhoneNumberAction(
  args: UpdatePhoneNumberInput,
): Promise<ActionResult<PhoneNumberRow>> {
  return runAction(() => updatePhoneNumber(args));
}

export async function deletePhoneNumberAction(
  args: DeletePhoneNumberInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => deletePhoneNumber(args));
}
