import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { enqueueSnackbar } from 'notistack';
import { useContext } from 'react';
import { CiMenuBurger } from 'react-icons/ci';
import { FaDoorClosed, FaMoon, FaSun } from 'react-icons/fa';

import { AuthContext } from '@/src/app/context/AuthContext';
import { signOut } from '@/src/entities/auth';
import { MotionText, initialAnimation } from '@/src/shared';
import type { IAuthProfile, IReturn } from '@/src/shared/types';

import { headerLinks } from '../constants/links';

export const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const { profile, setProfile } = useContext(AuthContext);

  const title = 'My Test'.toUpperCase().split('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  const { mutate: signOutMutation, isPending } = useMutation({
    mutationFn: (data: IAuthProfile) => signOut(data),
    onError: (e: AxiosError<IReturn<null>>) => {
      console.info(e);
      enqueueSnackbar(e?.response?.data?.error || 'Ошибка запроса', {
        preventDuplicate: false,
        variant: 'error',
      });
    },
    onSuccess: () => {
      enqueueSnackbar('Вы успешно вышли', {
        preventDuplicate: false,
        variant: 'success',
      });
      setProfile(null);
    },
  });

  return (
    <motion.header
      initial="initial"
      animate="animate"
      exit="exit"
      variants={initialAnimation}
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: `${colorMode === 'dark' ? '#1A202C' : '#FFFFFF'}`,
        marginBottom: '32px',
        zIndex: 1000,
      }}
    >
      <Flex
        borderBottomWidth={5}
        justifyContent={'space-between'}
        alignItems={'center'}
        pt={5}
        pb={3}
      >
        <Flex gap={12} alignItems={'center'}>
          <IconButton
            aria-label="open drawer"
            size="md"
            onClick={handleOpen}
            icon={<CiMenuBurger />}
          />
          <Drawer placement="left" onClose={handleClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent pt={5} pb={3}>
              <DrawerCloseButton />
              <DrawerHeader>Меню Навигации</DrawerHeader>
              <DrawerBody>
                <Flex
                  justifyContent={'space-between'}
                  direction="column"
                  h={'100%'}
                >
                  <Flex mt={10} gap={6} fontSize={24} direction="column">
                    {headerLinks.map((item) => {
                      if (
                        ((profile?.role === 'Admin' ||
                          profile?.role === 'Employee') &&
                          item.access === 'private') ||
                        item.access === 'public'
                      ) {
                        return (
                          <Link
                            key={item.href}
                            textUnderlineOffset="10px"
                            onClick={handleClose}
                            href={item.href}
                          >
                            {item.name}
                          </Link>
                        );
                      }
                    })}
                  </Flex>
                  <Flex justifyContent={'flex-end'}>
                    <IconButton
                      aria-label="toggle theme"
                      rounded="full"
                      size="xs"
                      w="30%"
                      onClick={toggleColorMode}
                      icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
                    />
                  </Flex>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <Box>
            <Link href="/" userSelect="none">
              {title.map((titleLetter, index) => (
                <MotionText
                  fontSize={24}
                  key={index}
                  display={'inline'}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  {titleLetter}
                </MotionText>
              ))}
            </Link>
          </Box>
        </Flex>
        {profile ? (
          <Flex alignItems="center" gap="16px">
            <Text>{profile.username}</Text>
            <Button
              isLoading={isPending}
              onClick={() => signOutMutation(profile)}
            >
              Выйти
            </Button>
          </Flex>
        ) : (
          <Link
            sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            _hover={{ textDecoration: 'none' }}
            href="/login"
          >
            <Text>Войти</Text>
            <FaDoorClosed />
          </Link>
        )}
      </Flex>
    </motion.header>
  );
};
