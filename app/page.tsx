"use client"

import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@/src/pages/Home'), {
  ssr: false,
});



export default function Page() {
  return <HomePage />;
}
