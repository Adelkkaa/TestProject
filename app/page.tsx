'use client';

import { useUnit } from 'effector-react';
import { motion } from 'framer-motion';

import { usersQuery } from '@/entities/user/api/userApi';

export default function Home() {
  const { data } = useUnit(usersQuery);
  console.info(data);
  return <motion.main>123</motion.main>;
}
