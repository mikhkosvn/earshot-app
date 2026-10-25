import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { readFileStream } from '@/server/files/read-file-stream';
import {
  contentDisposition,
  DispositionType,
} from '@/server/files/utils/content-disposition';
import {
  parseRangeHeader,
  RangeResult,
} from '@/server/files/utils/parse-range-header';
import type { ByteRange } from '@/server/files/types';
import { shareTokenSchema } from '@/server/share-links/schemas';
import { findSharedFile } from '@/server/share-links/shared/find-shared-file';

const fileIdSchema = z.uuid();

const dispositionOf = (request: NextRequest) => {
  if (request.nextUrl.searchParams.get('download') === '1') {
    return DispositionType.attachment;
  }
  return DispositionType.inline;
};

const fileHeaders = (
  file: { contentType: string; fileName: string },
  disposition: DispositionType,
) => ({
  'Content-Type': file.contentType,
  'Content-Disposition': contentDisposition(disposition, file.fileName),
  'Accept-Ranges': 'bytes',
  'Cache-Control': 'private, no-store',
});

const fullResponse = async (
  file: { storageKey: string; contentType: string; fileName: string },
  disposition: DispositionType,
) => {
  const { stream, size } = await readFileStream(file);
  return new Response(stream, {
    status: 200,
    headers: {
      ...fileHeaders(file, disposition),
      'Content-Length': String(size),
    },
  });
};

const partialResponse = async (
  file: { storageKey: string; contentType: string; fileName: string },
  disposition: DispositionType,
  range: ByteRange,
) => {
  const { stream, start, end, size } = await readFileStream(file, range);
  return new Response(stream, {
    status: 206,
    headers: {
      ...fileHeaders(file, disposition),
      'Content-Length': String(end - start + 1),
      'Content-Range': `bytes ${start}-${end}/${size}`,
    },
  });
};

export async function GET(
  request: NextRequest,
  context: RouteContext<'/api/share/[token]/files/[fileId]'>,
) {
  const route = await context.params;
  const parsedToken = shareTokenSchema.safeParse(route.token);
  const parsedId = fileIdSchema.safeParse(route.fileId);
  if (!parsedToken.success || !parsedId.success) {
    return new Response(null, { status: 404 });
  }
  const file = await findSharedFile(parsedToken.data, parsedId.data);
  if (!file) return new Response(null, { status: 404 });

  const disposition = dispositionOf(request);
  const parsedRange = parseRangeHeader(
    request.headers.get('range'),
    file.sizeBytes,
  );
  if (parsedRange.kind === RangeResult.unsatisfiable) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${file.sizeBytes}` },
    });
  }
  if (parsedRange.kind === RangeResult.valid) {
    return partialResponse(file, disposition, parsedRange.range);
  }
  return fullResponse(file, disposition);
}
