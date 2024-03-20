import { Box, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

export const CenteredSpinner = forwardRef<HTMLDivElement>((_, ref) => (
  <Box
    ref={ref}
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
  >
    <Spinner />
  </Box>
));

CenteredSpinner.displayName = 'Spinner';

export const MotionSpinner = motion(CenteredSpinner);
