import type { NextConfig } from 'next';

import { UrlGenerator } from './src/lib/url-generator/url-generator';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb',
    },
    proxyClientMaxBodySize: '30mb',
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

export default nextConfig;
