import { FOLDER_PATH_SEPARATOR } from '@/server/folders/constants';

export const joinFolderPath = (parentPath: string | null, name: string) => {
  if (!parentPath) return name;
  return `${parentPath}${FOLDER_PATH_SEPARATOR}${name}`;
};

export const folderPathDepth = (path: string | null) => {
  if (!path) return 0;
  return path.split(FOLDER_PATH_SEPARATOR).length;
};

export const isSameOrDescendantFolderPath = (
  path: string,
  ancestorPath: string,
) =>
  path === ancestorPath ||
  path.startsWith(`${ancestorPath}${FOLDER_PATH_SEPARATOR}`);
