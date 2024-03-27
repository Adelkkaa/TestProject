"use client"

import {
  ChakraProvider,
  ColorModeScript,
  Container,
  Flex,
} from '@chakra-ui/react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import {  type FC, type PropsWithChildren } from 'react';

import { MotionBox, initialAnimation } from '@/src/shared';
import { Footer, Header } from '@/src/widgets';

import theme from '../theme/theme';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();

  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <SnackbarProvider>
              <Container maxWidth={'1920px'} width={'95%'}>
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
          </HydrationBoundary>
        </QueryClientProvider>
      </ChakraProvider>
    </AnimatePresence>
  );
};
