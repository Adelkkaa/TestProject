import { Box, Flex, IconButton, Link, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

import { MotionText } from '@/shared';

export const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const title = 'Welcome to My Test Project'.toUpperCase().split('');

  return (
    <header>
      <Flex
        borderBottomWidth={5}
        justifyContent={'space-between'}
        alignItems={'center'}
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
          </Box>
        </Flex>
        <Flex gap={12} fontSize={24}>
          <Link href="/test">Test</Link>
          <Link href="/second">Test2</Link>
        </Flex>
      </Flex>
    </header>
  );
};
