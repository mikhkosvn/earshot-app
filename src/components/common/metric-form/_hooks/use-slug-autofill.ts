'use client';

import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { MetricDefinitionValues } from '@/server/metrics/types';

import { buildSlug, randomSlugSuffix } from '../_utils/slug';

export const useSlugAutofill = () => {
  const { getValues, setValue } = useFormContext<MetricDefinitionValues>();
  const [isAuto, setIsAuto] = useState(() => !getValues('slug'));
  const suffix = useRef('');

  const fillSlug = (name: string) => {
    if (!isAuto) return;
    if (!suffix.current) suffix.current = randomSlugSuffix();
    setValue('slug', buildSlug(name, suffix.current), {
      shouldDirty: true,
      shouldValidate: getValues('slug') !== '',
    });
  };

  const stopAutofill = () => setIsAuto(false);

  return { fillSlug, stopAutofill };
};
