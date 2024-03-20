'use client';

import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { addNewUser, getUsers } from '@/src/entities/user/api/userApi';
import type { IReturn, IUser } from '@/src/shared';
import { MotionBox, MotionSpinner, initialAnimation } from '@/src/shared';
import type { IUserWithoutId } from '@/src/shared/types';

const columns = [
  'Имя',
  'Фамилия',
  'Отчество',
  'ФИО',
  'Дата рождения',
  'Номер телефона',
  'Пол',
];

export const UserTable = () => {
  const { data: users, isLoading } = useQuery<IReturn<IUser[]>>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const mutation = useMutation({
    mutationFn: (data: IUserWithoutId) => addNewUser(data),
  });

  const handleSubmit = () => {
    mutation.mutate({
      firstName: '123',
      lastName: '123',
      middleName: '123',
      fullName: '123',
      birth: '123',
      phone: '123',
      gender: '123',
    });
  };
  //   useEffect(() => {
  //     const fetcher = async (data: IUserWithoutId) => {
  //       try {
  //         const res = await baseApi.post('/users', data, {
  //           headers: { 'Content-Type': 'application/json;charset=utf-8' },
  //         });

  //         return res.data;
  //       } catch (e) {
  //         console.info(e);
  //       }
  //     };
  //     fetcher({
  //       firstName: '123',
  //       lastName: '123',
  //       middleName: '123',
  //       fullName: '123',
  //       birth: '123',
  //       phone: '123',
  //       gender: '123',
  //     });
  //   }, []);

  return (
    <>
      {isLoading ? (
        <MotionSpinner
          initial="initial"
          animate="animate"
          variants={initialAnimation}
        />
      ) : (
        users && (
          <MotionBox
            initial="initial"
            animate="animate"
            variants={initialAnimation}
          >
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    {columns.map((item, key) => (
                      <Th key={key}>{item}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {users.result?.map((item) => (
                    <Tr key={item._id}>
                      <Th>{item.firstName}</Th>
                      <Th>{item.lastName}</Th>
                      <Th>{item.middleName}</Th>
                      <Th>{item.fullName}</Th>
                      <Th>{dayjs(item.birth).format('DD.MM.YYYY')}</Th>
                      <Th>{item.phone}</Th>
                      <Th>{item.gender}</Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Button onClick={handleSubmit}>Нажми сюда</Button>
          </MotionBox>
        )
      )}
    </>
  );
};
