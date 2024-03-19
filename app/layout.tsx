import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/src/shared/assets/styles/styles.scss';
import { Providers } from '../src/app/layouts/TransitionLayout';

export const metadata: Metadata = {
  title: 'App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
