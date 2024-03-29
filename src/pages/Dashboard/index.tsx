'use client';


import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('@/src/widgets/Dashboard'), {
  ssr: false,
});

const DashboardPage = () => <Dashboard />;

export default DashboardPage;
