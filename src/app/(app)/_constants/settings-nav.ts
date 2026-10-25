import {
  ArrowLeftIcon,
  BellIcon,
  FileTextIcon,
  KeyRoundIcon,
  KeySquareIcon,
  PhoneIcon,
  SettingsIcon,
  SparklesIcon,
  UsersIcon,
  WebhookIcon,
} from 'lucide-react';

import { UrlGenerator } from '@/lib/url-generator/url-generator';

import type { NavGroup } from './nav-types';

export const SETTINGS_NAV_GROUPS: NavGroup[] = [
  {
    label: null,
    items: [
      {
        label: 'Home',
        icon: ArrowLeftIcon,
        href: (project) => UrlGenerator.agents({ values: { project } }),
      },
      {
        label: 'Settings',
        icon: SettingsIcon,
        href: () => UrlGenerator.settings(),
        exact: true,
      },
    ],
  },
  {
    label: 'Organization',
    items: [
      {
        label: 'General',
        icon: SettingsIcon,
        href: () => UrlGenerator.settingsOrgGeneral(),
      },
      {
        label: 'API Key',
        icon: KeySquareIcon,
        href: () => UrlGenerator.settingsOrgApiKey(),
      },
      {
        label: 'Members',
        icon: UsersIcon,
        href: () => UrlGenerator.settingsOrgMembers(),
      },
      {
        label: 'Telephony',
        icon: PhoneIcon,
        href: () => UrlGenerator.settingsOrgTelephony(),
      },
    ],
  },
  {
    label: 'Project',
    items: [
      {
        label: 'General',
        icon: SettingsIcon,
        href: () => UrlGenerator.settingsProjectGeneral(),
      },
      {
        label: 'Notifications',
        icon: BellIcon,
        href: () => UrlGenerator.settingsProjectIntegrations(),
      },
      {
        label: 'Provider API Keys',
        icon: KeyRoundIcon,
        href: () => UrlGenerator.settingsProjectProviderApiKeys(),
      },
      {
        label: 'Webhook',
        icon: WebhookIcon,
        href: () => UrlGenerator.settingsProjectWebhook(),
      },
      {
        label: 'Agent Knowledge',
        icon: SparklesIcon,
        href: () => UrlGenerator.settingsProjectAgentKnowledge(),
      },
    ],
  },
  {
    label: 'About',
    items: [
      {
        label: 'Third Party Notices',
        icon: FileTextIcon,
        href: () => UrlGenerator.settingsAboutThirdPartyNotices(),
      },
    ],
  },
];
