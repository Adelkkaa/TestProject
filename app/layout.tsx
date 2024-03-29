import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/src/shared/assets/styles/styles.scss';

import { Providers } from '../src/app/layouts/TransitionLayout';

export const metadata: Metadata = {
  title: 'Test project',
  description: 'Test project to acquaintance with new stack',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
