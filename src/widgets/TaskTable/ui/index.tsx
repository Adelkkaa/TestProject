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
import { deleteTask, getTasks } from '@/src/entities/task';
import { AddTaskForm } from '@/src/features/add-task-form';
import { EditUserForm } from '@/src/features/edit-user-form';
import type { IReturn } from '@/src/shared';
import {
  AnimatedCounter,
  MotionBox,
  MotionSpinner,
  initialAnimation,
} from '@/src/shared';
import type { ITask } from '@/src/shared/types';

const columns = ['Название задачи', 'Дата начала', 'Дата окончания', 'Исполнитель', ''];

export const TaskTable = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery<IReturn<ITask[]>>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const { mutate: deleteOneTask, isPending } = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onError: (e) => {
      enqueueSnackbar(e.message || 'Ошибка запроса', {
        preventDuplicate: false,
        variant: 'error',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleOnCloseModal = () => {
    setSelectedTaskId(null);
    onClose();
  };

  const handleOnOpenModal = (id: string) => {
    setSelectedTaskId(id);
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
              Создать новую задачу
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
                      <Flex gap={3} justifyContent={'flex-end'}>
                        <IconButton
                          onClick={() => handleOnOpenModal(item._id)}
                          aria-label="Изменить задачу"
                          icon={<FaEdit />}
                          isDisabled={isLoading || isPending}
                        />
                        <IconButton
                          onClick={() => deleteOneTask(item._id)}
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
            isOpen={isOpen && !selectedTaskId}
            onClose={onClose}
            title="Создание новой задачи"
            actionTitle="Сохранить"
            actionType="submit"
            formId="addTaskForm"
          >
            <AddTaskForm closeModal={onClose} formId={'addTaskForm'} />
          </Modal>
          <Modal
            isOpen={!!selectedTaskId}
            onClose={handleOnCloseModal}
            title="Изменение информации о пользователе"
            actionTitle="Сохранить"
            actionType="submit"
            formId={selectedTaskId}
          >
            {selectedTaskId && (
              <EditUserForm
                closeModal={handleOnCloseModal}
                id={selectedTaskId}
              />
            )}
          </Modal>
        </MotionBox>
      )}
    </>
  );
};
