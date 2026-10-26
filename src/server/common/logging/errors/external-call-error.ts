import type { ErrorFields } from '../types';

type ExternalCallErrorFields = Omit<ErrorFields, 'type' | 'cause'> &
  Required<Pick<ErrorFields, 'service' | 'operation'>>;

export class ExternalCallError extends Error {
  readonly fields: ExternalCallErrorFields;

  constructor(fields: ExternalCallErrorFields, options?: { cause?: unknown }) {
    super(fields.message, options);
    this.name = 'ExternalCallError';
    this.fields = fields;
  }
}
