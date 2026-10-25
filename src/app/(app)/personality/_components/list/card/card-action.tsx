'use client';

import type { PersonalityListItem } from '@/server/personalities/types';

import { EditPersonalityLink } from './edit-personality-link';
import { ForkButton } from './fork-button';

type CardActionProps = {
  item: PersonalityListItem;
};

export function CardAction({ item }: CardActionProps) {
  if (item.isGlobal) return <ForkButton personalityId={item.id} />;
  return <EditPersonalityLink personalityId={item.id} name={item.name} />;
}
