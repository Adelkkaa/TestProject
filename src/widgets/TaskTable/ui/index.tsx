'use client';

import {
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Text,
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
import { getTasks } from '@/src/entities/task';
import { deleteUser } from '@/src/entities/user/api/userApi';
import { AddUserForm } from '@/src/features/add-user-form';
import { EditUserForm } from '@/src/features/edit-user-form';
import type { IReturn } from '@/src/shared';
import {
  AnimatedCounter,
  MotionBox,
  MotionSpinner,
  initialAnimation,
} from '@/src/shared';
import type { ITask } from '@/src/shared/types';

const columns = ['Название задачи', 'Дата начала', 'Дата окончания', ''];

export const TaskTable = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery<IReturn<ITask[]>>({
    queryKey: ['tasks'],
    queryFn: getTasks,
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
      {tasks && (
        <MotionBox
          initial="initial"
          animate="animate"
          variants={initialAnimation}
        >
          <Flex width={'100%'} justifyContent={'space-between'} mb={3}>
            <Text>
              Количество записей:{' '}
              <AnimatedCounter from={0} to={tasks.result?.length || 0} />
            </Text>
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
                {tasks.result?.map((item) => (
                  <Tr key={item._id}>
                    <Th>{item.name}</Th>
                    <Th>{dayjs(item.date_start).format('HH:mm (DD.MM.YYYY)')}</Th>
                    <Th>{dayjs(item.date_end).format('HH:mm (DD.MM.YYYY)')}</Th>
                    <Th>{item.user.fullName}</Th>
                    <Th>
                      <Flex gap={3}>
                        <IconButton
                          onClick={() => handleOnOpenModal(item._id)}
                          aria-label="Cоздать новую задачу"
                          icon={<FaEdit />}
                          isDisabled={isLoading || isPending}
                        />
                        <IconButton
                          onClick={() => deleteOneUser(item._id)}
                          aria-label="Удалить задачу"
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
