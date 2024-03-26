'use client';

import dynamic from 'next/dynamic';

const HomeContent = dynamic(() => import('@/src/widgets/HomeContent'), {
  ssr: false,
});

const HomePage = () => <HomeContent />;

export default HomePage;
