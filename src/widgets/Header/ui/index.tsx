import { Link } from '@chakra-ui/next-js';
import { Box, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

import { MotionText, initialAnimation } from '@/src/shared';

export const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const title = 'Welcome to My Test Project'.toUpperCase().split('');

  return (
    <motion.header
      initial="initial"
      animate="animate"
      exit="exit"
      variants={initialAnimation}
    >
      <Flex
        borderBottomWidth={5}
        justifyContent={'space-between'}
        alignItems={'center'}
        pt={5}
        pb={3}
        mb={10}
      >
        <Flex gap={12} alignItems={'center'}>
          <IconButton
            aria-label="toggle theme"
            rounded="full"
            size="xs"
            onClick={toggleColorMode}
            icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
          />
          <Box>
            <Link href={'/'}>
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
        <Flex gap={12} fontSize={24}>
          <Link href="/users">Users</Link>
          <Link href="/dashboard">Dashboard</Link>
        </Flex>
      </Flex>
    </motion.header>
  );
};
