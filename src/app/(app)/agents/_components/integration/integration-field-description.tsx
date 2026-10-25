import { FieldDescription } from '@/components/ui/field';

interface IntegrationFieldDescriptionProps {
  description?: string;
}

export function IntegrationFieldDescription({
  description,
}: IntegrationFieldDescriptionProps) {
  if (!description) return null;
  return <FieldDescription className="text-xs">{description}</FieldDescription>;
}
