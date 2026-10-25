import 'server-only';

const EMAIL_ADDRESS_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const EMAIL_ADDRESS_PLACEHOLDER = '[email]';

export const redactEmailAddresses = (text: string) =>
  text.replace(EMAIL_ADDRESS_PATTERN, EMAIL_ADDRESS_PLACEHOLDER);
