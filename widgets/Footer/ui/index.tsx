import { Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { MotionText, initialAnimation } from '@/shared';

export const Footer = () => (
  <motion.footer
    initial="initial"
    animate="animate"
    exit="exit"
    variants={initialAnimation}
  >
    <Flex>
      <Box>
        <MotionText fontSize={24}>Author: Sharipov Adel Sirinovish</MotionText>
      </Box>
    </Flex>
  </motion.footer>
);
