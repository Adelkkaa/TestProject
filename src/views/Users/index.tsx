'use client';


import dynamic from 'next/dynamic';

const UserTable = dynamic(() => import('@/src/widgets/UserTable'), {
  ssr: false,
});

const UsersPage = () => <UserTable />;

export default UsersPage;
