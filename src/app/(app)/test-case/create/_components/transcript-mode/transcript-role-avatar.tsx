import { BotIcon, UserIcon } from 'lucide-react';

import { TranscriptRole } from '@/server/call-engine/constants';

type TranscriptRoleAvatarProps = {
  role: TranscriptRole;
};

export function TranscriptRoleAvatar({ role }: TranscriptRoleAvatarProps) {
  if (role === TranscriptRole.main_agent) {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <BotIcon className="size-4" />
      </span>
    );
  }
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted-foreground text-background">
      <UserIcon className="size-4" />
    </span>
  );
}
