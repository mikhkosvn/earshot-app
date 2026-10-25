const DYNAMIC_SEGMENT_PATTERN =
  /^(\d+|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[A-Za-z0-9_-]{20,})$/i;
const DYNAMIC_SEGMENT_LABEL = '[id]';
const PATH_SEPARATOR = '/';

const toTemplateSegment = (segment: string) => {
  if (DYNAMIC_SEGMENT_PATTERN.test(segment)) return DYNAMIC_SEGMENT_LABEL;
  return segment;
};

export const readRouteTemplate = () => {
  if (typeof window === 'undefined') return undefined;
  return window.location.pathname
    .split(PATH_SEPARATOR)
    .map(toTemplateSegment)
    .join(PATH_SEPARATOR);
};
