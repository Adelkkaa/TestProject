import { Box, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const CenteredSpinner = () => (
  <Box
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
  >
    <Spinner />
  </Box>
);

export const MotionSpinner = motion(CenteredSpinner);
