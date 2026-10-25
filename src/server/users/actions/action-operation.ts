export const UsersActionOperation = {
  getCurrentUser: 'users.get_current_user',
  updateCurrentUser: 'users.update_current_user',
} as const;

export type UsersActionOperation =
  (typeof UsersActionOperation)[keyof typeof UsersActionOperation];
