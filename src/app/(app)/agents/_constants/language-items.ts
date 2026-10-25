import { Language } from '@/generated/prisma/enums';
import { LanguageLabel } from '@/server/agents/constants/language-labels';

export const LANGUAGE_ITEMS = Object.values(Language).map((language) => ({
  value: language,
  label: LanguageLabel[language],
}));
