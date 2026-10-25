import { ALL_EVALUATORS_FOLDER_PATH } from '@/server/folders/constants';

export const createFolderParam = (folder: string) => {
  if (folder === ALL_EVALUATORS_FOLDER_PATH) return null;
  return folder;
};
