'use client'
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
    <Flex ref={ref} gap="32px" direction={isReverse ? 'row-reverse' : 'row'}>
      <MotionBox
        w='70%'
        initial="initial"
        animate= {isInView ? 'animate' : ''}
        viewport={isInView}
        variants={FlexItemAnimation}
        custom={isReverse ? 1 : -1}
      >
        <Image src={image} alt="card-image" />
      </MotionBox>
      <MotionFlex
        direction={'column'}
        w={'60%'}
        gap="32px"
        initial="initial"
        animate= {isInView ? 'animate' : ''}
        viewport={isInView}
        variants={FlexItemAnimation}
        custom={isReverse ? -1 : 1}
      >
        <Heading as="h3">{title}</Heading>
        <Text fontSize="x-large">{description}</Text>
      </MotionFlex>
    </Flex>
  );
};
