import 'server-only';

import nodemailer, { type Transporter } from 'nodemailer';

import {
  DEVELOPMENT_SMTP_HOST,
  DEVELOPMENT_SMTP_PORT,
  SMTP_TLS_PORT,
} from '@/server/email/constants/smtp-defaults';

const globalForMail = globalThis as unknown as {
  earshotMailTransport: Transporter | undefined;
};

const readSmtpHost = () => {
  const host = process.env.SMTP_HOST;
  if (host) return host;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SMTP_HOST is not set.');
  }
  return DEVELOPMENT_SMTP_HOST;
};

const readSmtpPort = () => {
  const port = Number(process.env.SMTP_PORT);
  if (Number.isInteger(port) && port > 0) return port;
  return DEVELOPMENT_SMTP_PORT;
};

const readSmtpAuth = () => {
  const user = process.env.SMTP_USER;
  if (!user) return undefined;
  return { user, pass: process.env.SMTP_PASSWORD ?? '' };
};

const createMailTransport = () => {
  const port = readSmtpPort();
  return nodemailer.createTransport({
    host: readSmtpHost(),
    port,
    secure: port === SMTP_TLS_PORT,
    auth: readSmtpAuth(),
  });
};

export const getMailTransport = () => {
  if (globalForMail.earshotMailTransport) {
    return globalForMail.earshotMailTransport;
  }
  const transport = createMailTransport();
  globalForMail.earshotMailTransport = transport;
  return transport;
};
