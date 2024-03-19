'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { getUsers } from '@/src/entities/user/api/userApi';
import type { IReturn, IUser } from '@/src/shared';
import { Spinner } from '@/src/shared';

export default function HomePage() {
  const { data: users, isLoading } = useQuery<IReturn<IUser[]>>({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  console.info(users, isLoading);
  return <>{isLoading ? <Spinner /> : <motion.main>123</motion.main>}</>;
}
