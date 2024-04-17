'use client';

import dynamic from 'next/dynamic';

const RegistrationContent = dynamic(
  () => import('@/src/widgets/RegistrationContent'),
  {
    ssr: false,
  }
);

const RegistrationPage = () => <RegistrationContent />;

export default RegistrationPage;
