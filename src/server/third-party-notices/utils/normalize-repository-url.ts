import 'server-only';

const SHORTHAND_HOSTS: Record<string, string> = {
  github: 'https://github.com/',
  gitlab: 'https://gitlab.com/',
  bitbucket: 'https://bitbucket.org/',
};

const fromShorthand = (value: string) => {
  const [prefix, path] = value.split(':');
  const host = SHORTHAND_HOSTS[prefix];
  if (host && path) return `${host}${path}`;
  if (/^[\w.-]+\/[\w.-]+$/.test(value)) return `https://github.com/${value}`;
  return null;
};

const toHttpsUrl = (value: string) => {
  const cleaned = value
    .replace(/^git\+/, '')
    .replace(/^git:\/\//, 'https://')
    .replace(/^ssh:\/\/git@/, 'https://')
    .replace(/^git@([^:]+):/, 'https://$1/')
    .replace(/\.git$/, '')
    .replace(/#.*$/, '');
  if (/^https?:\/\//.test(cleaned)) return cleaned;
  return fromShorthand(cleaned);
};

export const normalizeRepositoryUrl = (repository: unknown) => {
  if (typeof repository === 'string') return toHttpsUrl(repository);
  if (repository && typeof repository === 'object' && 'url' in repository) {
    const { url } = repository as { url: unknown };
    if (typeof url === 'string') return toHttpsUrl(url);
  }
  return null;
};
