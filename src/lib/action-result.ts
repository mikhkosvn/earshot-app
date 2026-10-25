export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number };

export const isActionResult = (value: unknown): value is ActionResult<unknown> =>
  typeof value === 'object' && value !== null && 'ok' in value;
