import {
  BellIcon,
  BookOpenCheckIcon,
  BotIcon,
  ChartNoAxesCombinedIcon,
  ChartPieIcon,
  ClockIcon,
  FlaskConicalIcon,
  LightbulbIcon,
  ListChecksIcon,
  PhoneCallIcon,
  ScrollTextIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

import { ResultsView } from '@/lib/url-generator/constants';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import type { NavGroup, NavItem } from './nav-types';

export const MAIN_NAV_GROUPS: NavGroup[] = [
  {
    label: 'General',
    items: [
      {
        label: 'Agents',
        icon: BotIcon,
        href: (project) => UrlGenerator.agents({ values: { project } }),
      },
      {
        label: 'Metrics',
        icon: ChartPieIcon,
        href: (project) => UrlGenerator.metrics({ values: { project } }),
        matchPaths: [UrlGenerator.createMetric()],
      },
      {
        label: 'Labs',
        icon: FlaskConicalIcon,
        href: (project) => UrlGenerator.labs({ values: { project } }),
      },
      {
        label: 'Rubric',
        icon: ListChecksIcon,
        href: (project) => UrlGenerator.rubric({ values: { project } }),
      },
    ],
  },
  {
    label: 'Simulation',
    items: [
      {
        label: 'Personality',
        icon: UserIcon,
        href: (project) => UrlGenerator.personality({ values: { project } }),
      },
      {
        label: 'Evaluators',
        icon: BookOpenCheckIcon,
        href: (project) =>
          UrlGenerator.evaluators({ values: { project, page: 1 } }),
      },
      {
        label: 'Results',
        icon: ScrollTextIcon,
        href: (projectId) =>
          UrlGenerator.results({
            projectId,
            values: { page: 1, view: ResultsView.results },
          }),
      },
      {
        label: 'Runs Overview',
        icon: ChartNoAxesCombinedIcon,
        href: (project) => UrlGenerator.runsOverview({ values: { project } }),
      },
      {
        label: 'Monitors',
        icon: ClockIcon,
        href: (project) =>
          UrlGenerator.monitors({ values: { project, page: 1 } }),
      },
    ],
  },
  {
    label: 'Observability',
    items: [
      {
        label: 'Calls',
        icon: PhoneCallIcon,
        href: (projectId) =>
          UrlGenerator.calls({ projectId, values: { page: 1 } }),
      },
      {
        label: 'Alerts',
        icon: BellIcon,
        href: (projectId) => UrlGenerator.alerts({ projectId }),
      },
      {
        label: 'Insights',
        icon: LightbulbIcon,
        href: (projectId) => UrlGenerator.insights({ projectId }),
      },
      {
        label: 'Overview',
        icon: ChartNoAxesCombinedIcon,
        href: (projectId) => UrlGenerator.dashboards({ projectId }),
      },
    ],
  },
];

export const MAIN_NAV_FOOTER_ITEMS: NavItem[] = [
  {
    label: 'Settings',
    icon: SettingsIcon,
    href: () => UrlGenerator.settings(),
  },
];
