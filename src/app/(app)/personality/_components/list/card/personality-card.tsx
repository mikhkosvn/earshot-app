'use client';

import {
  AudioLinesIcon,
  GaugeIcon,
  GitForkIcon,
  IdCardIcon,
  RadioIcon,
  SpeechIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { GenderLabel } from '@/server/personalities/constants/gender-labels';
import type { PersonalityListItem } from '@/server/personalities/types';

import {
  accentText,
  backgroundNoiseText,
  interruptionText,
  speedText,
} from '../../../_utils/personality-card-text';
import { CardDetailRow } from './card-detail-row';
import { ForkedRow } from './forked-row';
import { PersonalityCardHeader } from './personality-card-header';

type PersonalityCardProps = {
  item: PersonalityListItem;
};

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
          icon={GaugeIcon}
          text={`Speaking Speed: ${speedText(item.speed)}`}
        />
        <CardDetailRow
          icon={RadioIcon}
          text={`Interruption: ${interruptionText(item)}`}
        />
        <CardDetailRow
          icon={AudioLinesIcon}
          text={`Background Noise: ${backgroundNoiseText(item.backgroundNoise)}`}
        />
        <CardDetailRow
          icon={SpeechIcon}
          text={`Accent: ${accentText(item.accent)}`}
        />
        <ForkedRow forked={item.forkedFromId !== null} icon={GitForkIcon} />
      </ul>
      <Badge variant="secondary" className="w-fit">
        {GenderLabel[item.gender]}
      </Badge>
    </article>
  );
}
