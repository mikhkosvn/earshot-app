import { CreateMode } from '../_constants/create-mode';

export const isCreateMode = (value: unknown): value is CreateMode =>
  Object.values<unknown>(CreateMode).includes(value);
