import type { EvaluatorsType } from '@/lib/url-generator/types';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { FolderView } from '@/server/folders/types';

export const folderListUrl = (
  folders: FolderView[],
  folderPath: string,
  values: EvaluatorsType['values'] = {},
) => {
  const folder = folders.find((item) => item.path === folderPath);
  if (!folder) return UrlGenerator.evaluators({ values });
  return UrlGenerator.evaluatorFolder({ folderId: folder.id, values });
};
