'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { NotificationsForm } from './notifications-form';

export function NotificationsSection() {
  const projectId = useCurrentProjectId();

  return <NotificationsForm key={projectId} />;
}
