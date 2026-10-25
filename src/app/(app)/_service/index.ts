import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import {
  countUnreadNotificationsAction,
  listNotificationsAction,
} from '@/server/notifications/actions';
import { listOrganizationsAction } from '@/server/organizations/actions';
import {
  getCurrentProjectIdAction,
  getProjectAction,
  listProjectsAction,
} from '@/server/projects/actions';
import { getCurrentUserAction } from '@/server/users/actions';

export const ShellKey = {
  currentUser: 'current-user',
  currentProjectId: 'current-project-id',
  project: 'project',
  projects: 'projects',
  organizations: 'organizations',
  notifications: 'notifications',
  unreadNotificationCount: 'unread-notification-count',
  createProject: 'create-project',
  updateProject: 'update-project',
  deleteProject: 'delete-project',
  switchProject: 'switch-project',
  switchOrganization: 'switch-organization',
  markNotificationRead: 'mark-notification-read',
  markAllNotificationsRead: 'mark-all-notifications-read',
  updateCurrentUser: 'update-current-user',
  signOut: 'sign-out',
} as const;

export type ShellKey = (typeof ShellKey)[keyof typeof ShellKey];

const UNREAD_NOTIFICATION_POLL_MS = 30 * 1000;

export class ShellService {
  static readonly createProjectMutationKey = [ShellKey.createProject];
  static readonly updateProjectMutationKey = [ShellKey.updateProject];
  static readonly deleteProjectMutationKey = [ShellKey.deleteProject];
  static readonly switchProjectMutationKey = [ShellKey.switchProject];
  static readonly switchOrganizationMutationKey = [ShellKey.switchOrganization];
  static readonly markNotificationReadMutationKey = [
    ShellKey.markNotificationRead,
  ];
  static readonly markAllNotificationsReadMutationKey = [
    ShellKey.markAllNotificationsRead,
  ];
  static readonly updateCurrentUserMutationKey = [ShellKey.updateCurrentUser];
  static readonly signOutMutationKey = [ShellKey.signOut];

  static getCurrentUserQuery() {
    return queryOptions({
      queryKey: [ShellKey.currentUser],
      queryFn: () => deferAction(() => getCurrentUserAction()),
    });
  }

  static getCurrentProjectIdQuery() {
    return queryOptions({
      queryKey: [ShellKey.currentProjectId],
      queryFn: () => deferAction(() => getCurrentProjectIdAction()),
    });
  }

  static getProjectQuery(args: { projectId: number }) {
    return queryOptions({
      queryKey: [ShellKey.project, args],
      queryFn: () => deferAction(() => getProjectAction(args)),
    });
  }

  static getProjectsQuery(args: { organizationId: number }) {
    return queryOptions({
      queryKey: [ShellKey.projects, args],
      queryFn: () => deferAction(() => listProjectsAction(args)),
    });
  }

  static getOrganizationsQuery() {
    return queryOptions({
      queryKey: [ShellKey.organizations],
      queryFn: () => deferAction(() => listOrganizationsAction()),
    });
  }

  static getNotificationsQuery() {
    return queryOptions({
      queryKey: [ShellKey.notifications],
      queryFn: () => deferAction(() => listNotificationsAction()),
      staleTime: 0,
    });
  }

  static getUnreadNotificationCountQuery() {
    return queryOptions({
      queryKey: [ShellKey.unreadNotificationCount],
      queryFn: () => deferAction(() => countUnreadNotificationsAction()),
      refetchInterval: UNREAD_NOTIFICATION_POLL_MS,
    });
  }
}
