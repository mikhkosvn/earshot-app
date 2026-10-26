export const StorageOperation = {
  write: 'storage.write',
  size: 'storage.size',
  read_stream: 'storage.read_stream',
  remove: 'storage.remove',
  remove_folder: 'storage.remove_folder',
} as const;

export type StorageOperation =
  (typeof StorageOperation)[keyof typeof StorageOperation];
