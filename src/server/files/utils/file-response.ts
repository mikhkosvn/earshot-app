import 'server-only';

import type { NextRequest } from 'next/server';

import { readFileStream } from '@/server/files/read-file-stream';
import type { ByteRange } from '@/server/files/types';
import {
  contentDisposition,
  DispositionType,
} from '@/server/files/utils/content-disposition';
import {
  parseRangeHeader,
  RangeResult,
} from '@/server/files/utils/parse-range-header';

interface ServedFile {
  storageKey: string;
  contentType: string;
  fileName: string;
  sizeBytes: number;
}

export const dispositionOf = (request: NextRequest) => {
  if (request.nextUrl.searchParams.get('download') === '1') {
    return DispositionType.attachment;
  }
  return DispositionType.inline;
};

export const fileHeaders = (
  file: { contentType: string; fileName: string },
  disposition: DispositionType,
) => ({
  'Content-Type': file.contentType,
  'Content-Disposition': contentDisposition(disposition, file.fileName),
  'Accept-Ranges': 'bytes',
  'Cache-Control': 'private, no-store',
});

export const fullResponse = async (
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

export const partialResponse = async (
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

export const fileResponse = (request: NextRequest, file: ServedFile) => {
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
};
