import type { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center bg-gray-50 px-4 py-10 dark:bg-neutral-900">
      {children}
    </main>
  );
}
