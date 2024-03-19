'use client';

import {
  ChakraProvider,
  ColorModeScript,
  Container,
  Flex,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { FC, PropsWithChildren } from 'react';

import { MotionBox, initialAnimation } from '@/shared';
import { Footer, Header } from '@/widgets';

import theme from '../theme';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
      </ChakraProvider>
    </AnimatePresence>
  );
};
