import { Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { MotionText, initialAnimation } from '@/src/shared';

export const Footer = () => {

  const title = 'Author: Sharipov Adel Sirinovich'.split('');
  

  return (
    <motion.footer
      initial="initial"
      animate="animate"
      exit="exit"
      variants={initialAnimation}
    >
      <Flex>
        <Box>
          {title.map((titleLetter, index) => (
            <MotionText
              userSelect='none'
              fontSize={24}
              key={index}
              display={'inline'}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: index * 0.08 }}
            >
              {titleLetter}
            </MotionText>
          ))}
        </Box>
      </Flex>
    </motion.footer>
  );
};
