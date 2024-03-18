'use client';

import { motion } from 'framer-motion';

import { Header } from '@/widgets';

const col = [
  {
    title: 'Привет',
    id: '123',
  },
];

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Header />
    </motion.main>
  );
}
