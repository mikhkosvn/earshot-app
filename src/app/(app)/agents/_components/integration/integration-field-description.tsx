import { FieldDescription } from '@/components/ui/field';

type IntegrationFieldDescriptionProps = {
  description?: string;
};

export function IntegrationFieldDescription({
  description,
}: IntegrationFieldDescriptionProps) {
  if (!description) return null;
  return <FieldDescription className="text-xs">{description}</FieldDescription>;
}
