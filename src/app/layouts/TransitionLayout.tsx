'use client';

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
import type { AxiosError } from 'axios';
import { AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import {
  useCallback,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from 'react';

import { refreshAccessToken } from '@/src/entities/auth';
import { MotionBox, baseApi, initialAnimation } from '@/src/shared';
import type { IAuthProfile, IReturn } from '@/src/shared/types';
import { Footer, Header } from '@/src/widgets';

import { AuthContext } from '../context/AuthContext';
import theme from '../theme/theme';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();

  const [profile, setProfile] = useState<IAuthProfile | null>(null);

  const router = useRouter();

  const initialProfile = useCallback(async () => {
    try {
      const res = await baseApi.get('/profile');

      setProfile(res.data.result);
    } catch (e) {
      console.info(e);
      enqueueSnackbar(
        (e as AxiosError<IReturn<null>>)?.response?.data?.error ||
          'Ошибка запроса',
        {
          preventDuplicate: false,
          variant: 'error',
        }
      );
    }
  }, []);

  useEffect(() => {
    initialProfile();
    baseApi.interceptors.response.use(
      (config) => config,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === 401 &&
          error.config &&
          !error.config._isRetry
        ) {
          originalRequest._isRetry = true;
          try {
            await refreshAccessToken();
            return baseApi.request(originalRequest);
          } catch (e) {
            setProfile(null);
            router.push('/')
          }
        }
        throw error;
      }
    );
    console.info('rerender');
  }, [initialProfile, router]);

  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <SnackbarProvider>
              <AuthContext.Provider value={{ profile, setProfile }}>
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
                      display={'flex'}
                      flexDirection={'column'}
                    >
                      {children}
                    </MotionBox>
                    <Footer />
                  </Flex>
                </Container>
              </AuthContext.Provider>
            </SnackbarProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </ChakraProvider>
    </AnimatePresence>
  );
};
