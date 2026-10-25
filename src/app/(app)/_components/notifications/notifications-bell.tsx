'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { BellIcon } from 'lucide-react';
import { useState } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { getNotificationsLabel } from '@/app/(app)/_utils/notifications-label';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { NotificationsBadge } from './notifications-badge';
import { NotificationsPanel } from './notifications-panel';

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const { data: unreadCount } = useSuspenseQuery(
    ShellService.getUnreadNotificationCountQuery(),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="unstyled"
            aria-label={getNotificationsLabel(unreadCount)}
            className="relative size-7 rounded-md"
          />
        }
      >
        <BellIcon className="size-3.5" />
        <NotificationsBadge />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[calc(100vw-1rem)] max-w-96 gap-0 overflow-hidden p-0 md:w-96"
      >
        <NotificationsPanel onNavigate={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
