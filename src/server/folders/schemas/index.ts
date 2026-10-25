import { z } from 'zod';

import {
  ALL_EVALUATORS_FOLDER_PATH,
  FOLDER_NAME_MAX_LENGTH,
  FOLDER_PATH_SEPARATOR,
} from '@/server/folders/constants';

const projectId = z.number().int().positive();

export const folderNameSchema = z
  .string()
  .trim()
  .min(1, 'The folder name is required.')
  .max(
    FOLDER_NAME_MAX_LENGTH,
    `The folder name must be ${FOLDER_NAME_MAX_LENGTH} characters or fewer.`,
  )
  .refine(
    (name) => !name.includes(FOLDER_PATH_SEPARATOR),
    `The folder name must not contain "${FOLDER_PATH_SEPARATOR}".`,
  )
  .refine(
    (name) => name !== ALL_EVALUATORS_FOLDER_PATH,
    'This folder name is reserved.',
  );

export const folderPathSchema = z.string().trim().min(1, 'Select a folder.');

export const listFoldersSchema = z.object({ projectId });

export const createFolderSchema = z.object({
  projectId,
  name: folderNameSchema,
  parentPath: folderPathSchema.nullable(),
});

export const folderNameFormSchema = z.object({ name: folderNameSchema });

export const renameFolderSchema = z.object({
  projectId,
  path: folderPathSchema,
  name: folderNameSchema,
});

export const folderTargetSchema = z.object({
  projectId,
  path: folderPathSchema,
});
