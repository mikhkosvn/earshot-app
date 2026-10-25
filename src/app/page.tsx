import { Suspense } from 'react';

import { RootRedirect } from './_components/root-redirect';

export default function RootPage() {
  return (
    <Suspense fallback={null}>
      <RootRedirect />
    </Suspense>
  );
}
