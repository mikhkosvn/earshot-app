import 'server-only';

export const jsonResponse = (data: unknown, status = 200) =>
  Response.json(data, { status });
