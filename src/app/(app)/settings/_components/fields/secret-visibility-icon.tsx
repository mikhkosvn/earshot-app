import { EyeIcon, EyeOffIcon } from 'lucide-react';

type SecretVisibilityIconProps = {
  isVisible: boolean;
};

export function SecretVisibilityIcon({ isVisible }: SecretVisibilityIconProps) {
  if (isVisible) return <EyeOffIcon />;
  return <EyeIcon />;
}
