"use client";

import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('@/src/pages/Dashboard'), {
  ssr: false,
});

export default function DashboardPage() {
  return <Dashboard />;
}
