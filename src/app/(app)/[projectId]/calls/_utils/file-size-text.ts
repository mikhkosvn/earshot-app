const BYTES_PER_MEGABYTE = 1024 * 1024;

export const fileSizeText = (bytes: number) =>
  `${Math.max(1, Math.round(bytes / BYTES_PER_MEGABYTE))}MB`;
