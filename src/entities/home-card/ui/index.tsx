'use client';
import { Image } from '@chakra-ui/next-js';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { useRef, type FC } from 'react';

import { MotionBox, MotionFlex } from '@/src/shared';
import { FlexItemAnimation } from '@/src/shared/animations';

import type { IHomeCardProps } from '../types';

export const HomeCard: FC<IHomeCardProps> = ({
  title,
  description,
  image,
  isReverse,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Flex
      ref={ref}
      gap="32px"
      direction={
        isReverse
          ? { base: 'column-reverse', md: 'row-reverse' }
          : { base: 'column-reverse', md: 'row' }
      }
      alignItems={{ base: 'center', md: 'flex-start' }}
    >
      <MotionBox
        w={{ md: '70%', base: '100%' }}
        initial="initial"
        animate={isInView ? 'animate' : ''}
        viewport={isInView}
        variants={FlexItemAnimation}
        custom={isReverse ? 1 : -1}
      >
        <Image src={image} alt="card-image" />
      </MotionBox>
      <MotionFlex
        direction={'column'}
        w={{ xl: '70%', lg: '70%', md: '80%', base: '100%' }}
        gap={{ xl: '32px', base: '16px' }}
        initial="initial"
        animate={isInView ? 'animate' : ''}
        viewport={isInView}
        variants={FlexItemAnimation}
        custom={isReverse ? -1 : 1}
      >
        <Heading as="h2">{title}</Heading>
        <Text>{description}</Text>
      </MotionFlex>
    </Flex>
  );
};
