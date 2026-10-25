import { SettingsHeaderCard } from '@/app/(app)/settings/_components/settings-header-card';
import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

export default function MembersPage() {
  return (
    <SettingsPageContainer>
      <SettingsHeaderCard
        title="Team members"
        description={
          "Who is in your organization, which projects they can open, and who gets each project's email alerts."
        }
      />
    </SettingsPageContainer>
  );
}
