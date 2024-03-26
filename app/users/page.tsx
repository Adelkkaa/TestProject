"use client";

import dynamic from 'next/dynamic';

const Users = dynamic(() => import('@/src/pages/Users'), {
  ssr: false,
});


export default function UsersPage() {
  return <Users />;
}
