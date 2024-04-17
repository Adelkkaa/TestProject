'use client';


import dynamic from 'next/dynamic';

const LoginContent = dynamic(() => import('@/src/widgets/LoginContent'), {
  ssr: false,
});

const LoginPage = () => <LoginContent />;

export default LoginPage;
