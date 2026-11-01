'use client';

import {
  AudioLinesIcon,
  GitForkIcon,
  IdCardIcon,
  LanguagesIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { LanguageLabel } from '@/server/agents/constants/language-labels';
import { GenderLabel } from '@/server/personalities/constants/gender-labels';
import type { PersonalityListItem } from '@/server/personalities/types';

import { voiceText } from '../../../_utils/personality-card-text';
import { CardDetailRow } from './card-detail-row';
import { ForkedRow } from './forked-row';
import { PersonalityCardHeader } from './personality-card-header';

interface PersonalityCardProps {
  item: PersonalityListItem;
}

export function PersonalityCard({ item }: PersonalityCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border bg-background p-3">
      <PersonalityCardHeader item={item} />
      <p className="min-h-8 border-b pb-3 text-xs text-muted-foreground">
        {item.description}
      </p>
      <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
        <CardDetailRow icon={IdCardIcon} text={`ID: ${item.id}`} />
        <CardDetailRow
          icon={AudioLinesIcon}
          text={`Voice: ${voiceText(item)}`}
        />
        <CardDetailRow
          icon={LanguagesIcon}
          text={`Language: ${LanguageLabel[item.language]}`}
        />
        <ForkedRow forked={item.forkedFromId !== null} icon={GitForkIcon} />
      </ul>
      <Badge variant="secondary" className="w-fit">
        {GenderLabel[item.gender]}
      </Badge>
    </article>
  );
}
