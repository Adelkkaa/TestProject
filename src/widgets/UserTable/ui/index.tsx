'use client';

import {
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Modal } from '@/src/entities/modal';
import { deleteUser, getUsers } from '@/src/entities/user/api/userApi';
import { AddUserForm } from '@/src/features/add-user-form';
import { EditUserForm } from '@/src/features/edit-user-form';
import type { IReturn, IUser } from '@/src/shared';
import { MotionBox, MotionSpinner, initialAnimation } from '@/src/shared';

const columns = [
  'Имя',
  'Фамилия',
  'Отчество',
  'ФИО',
  'Дата рождения',
  'Номер телефона',
  'Пол',
  '',
];

export const UserTable = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery<IReturn<IUser[]>>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const { mutate: deleteOneUser, isPending } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onError: (e) => {
      enqueueSnackbar(e.message || 'Ошибка запроса', {
        preventDuplicate: false,
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleOnCloseModal = () => {
    setSelectedUserId(null);
    onClose();
  };

  const handleOnOpenModal = (id: string) => {
    setSelectedUserId(id);
    onOpen();
  };
  return (
    <>
      {(isLoading || isPending) && (
        <MotionSpinner
          initial="initial"
          animate="animate"
          variants={initialAnimation}
        />
      )}
      {users && (
        <MotionBox
          initial="initial"
          animate="animate"
          variants={initialAnimation}
        >
          <Flex width={'100%'} justifyContent={'flex-end'} mb={3}>
            <Button
              _hover={{
                borderBottom: '2px solid',
                borderBottomRadius: '0%',
                borderColor: 'blue.500',
              }}
              variant={'text'}
              onClick={onOpen}
              isDisabled={isLoading || isPending}
            >
              Создать нового пользователя
            </Button>
          </Flex>
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
                    <Th>
                      <Flex gap={3}>
                        <IconButton
                          onClick={() => handleOnOpenModal(item._id)}
                          aria-label="Cоздать нового пользователя"
                          icon={<FaEdit />}
                          isDisabled={isLoading || isPending}
                        />
                        <IconButton
                          onClick={() => deleteOneUser(item._id)}
                          aria-label="Удалить пользователя"
                          icon={<FaTrash />}
                          isDisabled={isLoading || isPending}
                        />
                      </Flex>
                    </Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Modal
            isOpen={isOpen && !selectedUserId}
            onClose={onClose}
            title="Создание нового пользователя"
            actionTitle="Сохранить"
            actionType="submit"
            formId="addUserForm"
          >
            <AddUserForm closeModal={onClose} formId={'addUserForm'} />
          </Modal>
          <Modal
            isOpen={!!selectedUserId}
            onClose={handleOnCloseModal}
            title="Изменение информации о пользователе"
            actionTitle="Сохранить"
            actionType="submit"
            formId={selectedUserId}
          >
            {selectedUserId && (
              <EditUserForm
                closeModal={handleOnCloseModal}
                id={selectedUserId}
              />
            )}
          </Modal>
        </MotionBox>
      )}
    </>
  );
};
