export type ByteRange = {
  start: number;
  end: number;
};

export type SaveFileArgs = {
  projectId: number;
  fileName: string;
  contentType: string;
  data: Uint8Array;
};

export type FileStream = {
  stream: ReadableStream<Uint8Array>;
  start: number;
  end: number;
  size: number;
};
