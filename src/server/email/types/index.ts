import type {
  EmailNotificationKind,
  EmailSkipReason,
} from '@/server/email/constants/email-notification-kind';

export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
}

export interface SentEmail {
  messageId: string;
  accepted: string[];
  rejected: string[];
}

export interface NotifyProjectMembersInput {
  projectId: number;
  kind: EmailNotificationKind;
  subject: string;
  body: string;
}

export type NotifyProjectMembersResult =
  | { sent: true; recipients: string[]; failedRecipients: string[] }
  | { sent: false; skipReason: EmailSkipReason };
