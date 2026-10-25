import type { ReactNode } from 'react';

type SettingsPageContainerProps = {
  children: ReactNode;
};

export function SettingsPageContainer({
  children,
}: SettingsPageContainerProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-3 p-4">
      {children}
    </div>
  );
}
