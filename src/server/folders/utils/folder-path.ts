import 'server-only';

import { FOLDER_PATH_SEPARATOR } from '@/server/folders/constants';

export const joinFolderPath = (parentPath: string | null, name: string) => {
  if (!parentPath) return name;
  return `${parentPath}${FOLDER_PATH_SEPARATOR}${name}`;
};

export const folderPathSegments = (path: string) =>
  path.split(FOLDER_PATH_SEPARATOR);

export const folderName = (path: string) =>
  folderPathSegments(path).at(-1) ?? path;

export const parentFolderPath = (path: string) => {
  const segments = folderPathSegments(path);
  if (segments.length < 2) return null;
  return segments.slice(0, -1).join(FOLDER_PATH_SEPARATOR);
};

export const descendantPathPrefix = (path: string) =>
  `${path}${FOLDER_PATH_SEPARATOR}`;

export const isSameOrDescendantPath = (path: string, ancestorPath: string) =>
  path === ancestorPath || path.startsWith(descendantPathPrefix(ancestorPath));
