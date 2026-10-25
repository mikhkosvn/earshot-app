import 'server-only';

import type { z } from 'zod';

import { RunMessage } from '@/server/runs/constants/run-messages';
import {
  type TestSuiteSpec,
  testSuiteSpecSchema,
} from '@/server/runs/schemas/test-suite-spec';
import type { SpecIssue } from '@/server/runs/types';

export const SPEC_ROOT_PATH = 'spec';

export type ParsedSpec =
  { ok: true; spec: TestSuiteSpec } | { ok: false; errors: SpecIssue[] };

export const formatSpecPath = (path: PropertyKey[]) => {
  if (path.length === 0) return SPEC_ROOT_PATH;
  return path
    .map((segment, index) => {
      if (typeof segment === 'number') return `[${segment}]`;
      if (index === 0) return String(segment);
      return `.${String(segment)}`;
    })
    .join('');
};

const issuesOf = (error: z.ZodError): SpecIssue[] =>
  error.issues.map((issue) => ({
    path: formatSpecPath(issue.path),
    message: issue.message,
  }));

const readJson = (text: string) => {
  try {
    return { ok: true as const, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false as const };
  }
};

export const parseSpec = (text: string): ParsedSpec => {
  const json = readJson(text);
  if (!json.ok) {
    return {
      ok: false,
      errors: [{ path: SPEC_ROOT_PATH, message: RunMessage.specInvalidJson }],
    };
  }
  const parsed = testSuiteSpecSchema.safeParse(json.value);
  if (!parsed.success) return { ok: false, errors: issuesOf(parsed.error) };
  return { ok: true, spec: parsed.data };
};
