import {
  ApiKeyLevel,
  ApiKeyLevelLabel,
} from '@/server/api-keys/constants/api-key-level';

export const API_KEY_LEVEL_ITEMS = Object.values(ApiKeyLevel).map((value) => ({
  value,
  label: ApiKeyLevelLabel[value],
}));
