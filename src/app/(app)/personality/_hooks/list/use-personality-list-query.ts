'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { PersonalityService } from '../../_service';
import { usePersonalityLanguage } from './use-personality-language';

export const usePersonalityListQuery = () => {
  const projectId = useCurrentProjectId();
  const [language] = usePersonalityLanguage();
  return useSuspenseQuery(
    PersonalityService.getListQuery({ projectId, language }),
  );
};
