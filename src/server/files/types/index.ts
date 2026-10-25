export interface ByteRange {
  start: number;
  end: number;
}

export interface SaveFileArgs {
  projectId: number;
  fileName: string;
  contentType: string;
  data: Uint8Array;
}

export interface FileStream {
  stream: ReadableStream<Uint8Array>;
  start: number;
  end: number;
  size: number;
}
