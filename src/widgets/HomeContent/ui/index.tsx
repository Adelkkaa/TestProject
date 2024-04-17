'use client';

import { Flex, Heading } from '@chakra-ui/react';

import { HomeCard } from '@/src/entities/home-card';

import { cardItems } from '../constants/CardItems';

export const HomeContent = () => (
  <Flex direction={'column'}>
    <Heading
      as="h1"
      textAlign="center"
      mb={{ base: '32px', md: '64px', lg: '100px' }}
    >
      Стек технологий
    </Heading>
    <Flex direction={'column'} gap={'100px'}>
      {cardItems.map((cardItem, index) => (
        <HomeCard
          key={index}
          title={cardItem.title}
          description={cardItem.description}
          image={cardItem.image}
          isReverse={cardItem.isReverse}
        />
      ))}
    </Flex>
  </Flex>
);
