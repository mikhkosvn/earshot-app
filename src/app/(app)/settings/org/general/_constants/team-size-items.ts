import { TeamSize } from '@/generated/prisma/enums';
import { TeamSizeLabel } from '@/server/organization-settings/constants/team-size-labels';

export const TEAM_SIZE_OPTIONS = Object.values(TeamSize).map((value) => ({
  value,
  label: TeamSizeLabel[value],
}));

export const TEAM_SIZE_ITEMS = [
  { value: null, label: 'Select team size' },
  ...TEAM_SIZE_OPTIONS,
];
