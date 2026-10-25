'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { LANGUAGE_FILTER_ITEMS } from '../../../_constants/filter-items';
import { usePersonalityLanguage } from '../../../_hooks/list/use-personality-language';
import { usePrefetchQuery } from '../../../_hooks/use-prefetch-query';
import { PersonalityService } from '../../../_service';
import { FilterSelect } from './filter-select';

export function LanguageFilter() {
  const [language, setLanguage] = usePersonalityLanguage();
  const projectId = useCurrentProjectId();
  const prefetch = usePrefetchQuery();

  return (
    <FilterSelect
      label="Language"
      items={LANGUAGE_FILTER_ITEMS}
      value={language}
      onChange={(next) => {
        prefetch(
          PersonalityService.getListQuery({ projectId, language: next }),
        );
        void setLanguage(next);
      }}
    />
  );
}
