'use client';

import { StarIcon } from 'lucide-react';

import type { PersonalityListItem } from '@/server/personalities/types';

import { personalityTitle } from '../../../_utils/personality-card-text';
import { CardAction } from './card-action';
import { EnabledSwitch } from './enabled-switch';
import { StarMark } from './star-mark';

type PersonalityCardHeaderProps = {
  item: PersonalityListItem;
};

export function PersonalityCardHeader({ item }: PersonalityCardHeaderProps) {
  return (
    <div className="flex items-start gap-2">
      <h2 className="text-base/tight font-semibold">
        {personalityTitle(item)}
      </h2>
      <StarMark starred={item.isStarred} icon={StarIcon} />
      <CardAction item={item} />
      <span className="flex-1" />
      <EnabledSwitch item={item} />
    </div>
  );
}
