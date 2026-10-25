'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { PersonalityService } from '../../_service';
import { usePersonalityId } from './use-personality-id';

export const usePersonalityDetail = () => {
  const personalityId = usePersonalityId();
  const { data } = useSuspenseQuery(
    PersonalityService.getPersonalityQuery({ personalityId }),
  );
  return data;
};
