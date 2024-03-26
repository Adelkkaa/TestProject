'use client';

import {
  ChakraProvider,
  ColorModeScript,
  Container,
  Flex,
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import type { FC, PropsWithChildren } from 'react';

import { MotionBox, initialAnimation } from '@/src/shared';
import { Footer, Header } from '@/src/widgets';

import theme from '../theme/theme';


const queryClient = new QueryClient();

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <SnackbarProvider>
            <Container maxWidth={'95%'}>
              <Flex
                minHeight={'100vh'}
                direction={'column'}
                justifyContent={'space-between'}
              >
                <Header />
                <MotionBox
                  key={pathname}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={initialAnimation}
                  flexGrow={1}
                >
                  {children}
                </MotionBox>
                <Footer />
              </Flex>
            </Container>
          </SnackbarProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </AnimatePresence>
  );
};
