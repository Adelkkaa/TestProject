// app/providers.tsx
'use client';

import { ChakraProvider, Container } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import type { FC, PropsWithChildren } from 'react';

import theme from './theme';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <AnimatePresence mode="wait">
    <ChakraProvider theme={theme}>
      <Container maxWidth={'95%'} py={10}>
        {children}
      </Container>
    </ChakraProvider>
  </AnimatePresence>
);
