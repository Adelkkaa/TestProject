'use client';

import dynamic from 'next/dynamic';

const UsersPage = dynamic(() => import('@/src/pages/Users'), {
  ssr: false,
});

export default function Page() {
  return <UsersPage />;
}
