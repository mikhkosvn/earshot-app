export const AlertStep = {
  fire_notification: 'alerts.fire_notification',
  fire_email: 'alerts.fire_email',
} as const;

export type AlertStep = (typeof AlertStep)[keyof typeof AlertStep];
