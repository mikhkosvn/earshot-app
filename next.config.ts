import { withSentryConfig } from '@sentry/nextjs/config';
import type { NextConfig } from 'next';

import packageJson from './package.json';

import { UrlGenerator } from './src/lib/url-generator/url-generator';

export const SENTRY_TUNNEL_ROUTE = '/monitoring';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  skipTrailingSlashRedirect: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '510mb',
    },
    proxyClientMaxBodySize: '510mb',
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async redirects() {
    return [
      {
        source: UrlGenerator.settingsOrg(),
        destination: UrlGenerator.settingsOrgGeneral(),
        permanent: false,
      },
      {
        source: UrlGenerator.settingsProject(),
        destination: UrlGenerator.settingsProjectGeneral(),
        permanent: false,
      },
      {
        source: UrlGenerator.settingsAbout(),
        destination: UrlGenerator.settingsAboutThirdPartyNotices(),
        permanent: false,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: SENTRY_TUNNEL_ROUTE,
});
