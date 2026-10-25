'use client';

import { Language } from '@/generated/prisma/enums';
import { LanguageLabel } from '@/server/agents/constants/language-labels';

import { OptionIdLabel } from '../option-id-label';
import { OptionSelect } from '../option-select';

const LANGUAGE_ITEMS = Object.values(Language).map((language) => ({
  value: language,
  label: <OptionIdLabel id={language} label={LanguageLabel[language]} />,
}));

interface LanguageSelectProps {
  id?: string;
  value: Language;
  onValueChange: (language: Language) => void;
}

export function LanguageSelect({
  id,
  value,
  onValueChange,
}: LanguageSelectProps) {
  return (
    <OptionSelect
      id={id}
      items={LANGUAGE_ITEMS}
      value={value}
      onValueChange={(next) => {
        if (next === null) return;
        onValueChange(next);
      }}
      placeholder="Select language"
    />
  );
}
