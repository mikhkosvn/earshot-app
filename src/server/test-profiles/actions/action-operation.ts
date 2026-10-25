export const TestProfilesActionOperation = {
  listTestProfiles: 'test_profiles.list_test_profiles',
  createTestProfile: 'test_profiles.create_test_profile',
  updateTestProfile: 'test_profiles.update_test_profile',
  duplicateTestProfile: 'test_profiles.duplicate_test_profile',
  deleteTestProfile: 'test_profiles.delete_test_profile',
} as const;

export type TestProfilesActionOperation =
  (typeof TestProfilesActionOperation)[keyof typeof TestProfilesActionOperation];
