import 'server-only';

import { resolveCurrentProjectId } from '@/server/projects/utils/resolve-current-project-id';

export const getCurrentProjectId = () => resolveCurrentProjectId();
