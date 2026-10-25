export const TelephonyPhoneNumbersActionOperation = {
  listPhoneNumbers: 'telephony_phone_numbers.list_phone_numbers',
  createPhoneNumber: 'telephony_phone_numbers.create_phone_number',
  updatePhoneNumber: 'telephony_phone_numbers.update_phone_number',
  deletePhoneNumber: 'telephony_phone_numbers.delete_phone_number',
} as const;

export type TelephonyPhoneNumbersActionOperation =
  (typeof TelephonyPhoneNumbersActionOperation)[keyof typeof TelephonyPhoneNumbersActionOperation];
