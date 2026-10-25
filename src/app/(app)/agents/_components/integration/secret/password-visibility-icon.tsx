import { EyeIcon, EyeOffIcon } from 'lucide-react';

type PasswordVisibilityIconProps = {
  visible: boolean;
};

export function PasswordVisibilityIcon({
  visible,
}: PasswordVisibilityIconProps) {
  if (visible) return <EyeOffIcon />;
  return <EyeIcon />;
}
