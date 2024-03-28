import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CiMenuBurger } from 'react-icons/ci';
import { FaMoon, FaSun } from 'react-icons/fa';

import { MotionText, initialAnimation } from '@/src/shared';

import { headerLinks } from '../constants/links';

export const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const title = 'My Test'.toUpperCase().split('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose()
  }

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
                    {headerLinks.map((item) => (
                      <Link key={item.href} textUnderlineOffset="10px" onClick={handleClose} href={item.href}>
                        {item.name}
                      </Link>
                    ))}
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
            <Link href='/' userSelect='none'>
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
      </Flex>
    </motion.header>
  );
};
