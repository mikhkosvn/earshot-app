import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface SecretVisibilityIconProps {
  isVisible: boolean;
}

export function SecretVisibilityIcon({ isVisible }: SecretVisibilityIconProps) {
  if (isVisible) return <EyeOffIcon />;
  return <EyeIcon />;
}
