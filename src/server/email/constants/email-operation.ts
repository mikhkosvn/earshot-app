export const EmailOperation = {
  send_mail: 'smtp.send_mail',
} as const;

export type EmailOperation =
  (typeof EmailOperation)[keyof typeof EmailOperation];

export const EmailStep = {
  send: 'email.send',
} as const;

export type EmailStep = (typeof EmailStep)[keyof typeof EmailStep];
