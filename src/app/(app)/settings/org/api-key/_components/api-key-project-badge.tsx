import { Badge } from '@/components/ui/badge';

interface ApiKeyProjectBadgeProps {
  projectName: string | null;
}

export function ApiKeyProjectBadge({ projectName }: ApiKeyProjectBadgeProps) {
  if (!projectName) return null;

  return <Badge variant="secondary">Project: {projectName}</Badge>;
}
