import type {
  EmailNotificationKind,
  EmailSkipReason,
} from '@/server/email/constants/email-notification-kind';

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
};

export type SentEmail = {
  messageId: string;
  accepted: string[];
  rejected: string[];
};

export type NotifyProjectMembersInput = {
  projectId: number;
  kind: EmailNotificationKind;
  subject: string;
  body: string;
};

export type NotifyProjectMembersResult =
  | { sent: true; recipients: string[]; failedRecipients: string[] }
  | { sent: false; skipReason: EmailSkipReason };
