import 'server-only';

export const DispositionType = {
  inline: 'inline',
  attachment: 'attachment',
} as const;

export type DispositionType =
  (typeof DispositionType)[keyof typeof DispositionType];

const UNSAFE_HEADER_CHARACTERS = /[^\x20-\x7e]|["\\]/g;

export const contentDisposition = (type: DispositionType, fileName: string) => {
  const asciiName = fileName.replace(UNSAFE_HEADER_CHARACTERS, '_');
  return `${type}; filename="${asciiName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
};
