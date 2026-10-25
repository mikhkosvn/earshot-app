import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { storedJsonObjectSchema } from '@/server/agents/schemas';
import type { MockToolMappingValue } from '@/server/agents/types';

interface MappingRow {
  input: Prisma.JsonValue;
  output: Prisma.JsonValue;
  responseStatusCode: number | null;
  responseHeaders: Prisma.JsonValue | null;
  responseDelaySeconds: number | null;
}

const FAILURE_STATUS_MIN = 400;

const toHeaders = (value: Prisma.JsonValue | null) => {
  const entries = Object.entries(storedJsonObjectSchema.parse(value)).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string',
  );
  if (entries.length === 0) return undefined;
  return Object.fromEntries(entries);
};

const toResponse = (row: MappingRow) => {
  const headers = toHeaders(row.responseHeaders);
  const response = {
    ...(row.responseStatusCode !== null && {
      status_code: row.responseStatusCode,
    }),
    ...(headers && { headers }),
    ...(row.responseDelaySeconds !== null && {
      delay_seconds: row.responseDelaySeconds,
    }),
  };
  if (Object.keys(response).length === 0) return undefined;
  return response;
};

export const toMappingValue = (row: MappingRow): MockToolMappingValue => {
  const response = toResponse(row);
  return {
    input: storedJsonObjectSchema.parse(row.input),
    output: storedJsonObjectSchema.parse(row.output),
    ...(response && { response }),
  };
};

const headersInput = (headers: Record<string, string> | undefined) => {
  if (!headers) return Prisma.DbNull;
  return headers;
};

export const toMappingRows = (mappings: MockToolMappingValue[]) =>
  mappings.map((mapping, position) => ({
    position,
    input: mapping.input as Prisma.InputJsonObject,
    output: mapping.output as Prisma.InputJsonObject,
    responseStatusCode: mapping.response?.status_code ?? null,
    responseHeaders: headersInput(mapping.response?.headers),
    responseDelaySeconds: mapping.response?.delay_seconds ?? null,
  }));

export const countFailures = (rows: { responseStatusCode: number | null }[]) =>
  rows.filter(
    (row) =>
      row.responseStatusCode !== null &&
      row.responseStatusCode >= FAILURE_STATUS_MIN,
  ).length;
