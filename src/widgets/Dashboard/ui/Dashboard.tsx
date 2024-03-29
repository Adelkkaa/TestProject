// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import type { Components} from 'react-big-calendar';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';


import { Modal } from '@/src/entities/modal';
import { editTask, getTasks } from '@/src/entities/task';
import { getUsers } from '@/src/entities/user';
import { EditTaskForm } from '@/src/features/edit-task-form';
import type { IEventCardProps } from '@/src/features/event-card';
import { EventCard } from '@/src/features/event-card';
import type { IEventResourceProps } from '@/src/features/event-resource';
import { EventResource } from '@/src/features/event-resource';
import type { IReturn } from '@/src/shared';
import { Spinner } from '@/src/shared';
import type { IAddTaskQuery, ITask, IUser } from '@/src/shared/types';


import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = dayjsLocalizer(dayjs);
const DnDCalendar = withDragAndDrop(Calendar);

const culture = {
  ru: {
    week: 'Неделя',
    work_week: 'Рабочая неделя',
    day: 'День',
    month: 'Месяц',
    previous: 'Предыдущий',
    next: 'Следующий',
    today: 'Сегодня',
    agenda: 'Список',
    showMore: (total: number) => `+${total}`,
  },
};

export const Dashboard = () => {
  const queryClient = useQueryClient();

  const [myEvents, setMyEvents] = useState<ITask[] | []>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const { onOpen,  onClose } = useDisclosure();
  const components = {
    day: {
      event: ({ event }: IEventCardProps) => <EventCard event={event} />,
    },
    week: {
      event: ({ event }: IEventCardProps) => <EventCard event={event} />,
    },
    resourceHeader: ({ resource }: IEventResourceProps) => (
      <EventResource resource={resource} />
    ),
  };

  const {
    data: tasks,
    isLoading: isTasksLoading,
    isSuccess: isTasksSuccess,
  } = useQuery<IReturn<ITask[]>>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useQuery<IReturn<IUser[]>>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const { mutate: editTaskMutation, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IAddTaskQuery> }) =>
      editTask(id, data),
    onError: (e) => {
      enqueueSnackbar(e.message || 'Ошибка запроса', {
        preventDuplicate: false,
        variant: 'error',
      });
    },
    onSuccess: ({ result }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', { id: result.id }] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      enqueueSnackbar('Данные задачи успешно изменены!', {
        preventDuplicate: false,
        variant: 'success',
      });
    },
  });

  const handleOnCloseModal = () => {
    setSelectedTaskId(null);
    onClose();
  };

  const handleOnOpenModal = (data: ITask) => {
    setSelectedTaskId(data._id);
    onOpen();
  };

  const handleEvent = useCallback(
    (prev: ITask[], event: ITask, start: Date, end: Date) => {
      const existing = prev.find((ev) => ev._id === event._id) ?? {};
      const filtered = prev.filter((ev) => ev._id !== event._id);
      const { _id, user, name } = event as ITask;
      const startDate = dayjs(start).format('YYYY-MM-DDTHH:mm');
      const endDate = dayjs(end).format('YYYY-MM-DDTHH:mm');

      return {
        existing,
        filtered,
        _id,
        user,
        name,
        startDate,
        endDate,
      };
    },
    []
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const { existing, filtered, _id, user, name, startDate, endDate } =
          handleEvent(prev, event, start, end);
        editTaskMutation({
          id: _id,
          data: {
            user: user._id,
            date_start: startDate,
            date_end: endDate,
            name,
          },
        });

        return [
          ...filtered,
          {
            ...existing,
            date_start: startDate,
            date_end: endDate,
          },
        ] as ITask[];
      });
    },
    [setMyEvents, handleEvent, editTaskMutation]
  );

  const moveEvent = useCallback(
    ({ event, start, end, resourceId }) => {
      setMyEvents((prev) => {
        const { existing, filtered, _id, name, startDate, endDate } =
          handleEvent(prev, event, start, end);
        const newUser = users?.result?.find(
          (user) => user._id === resourceId
        ) as IUser;

        editTaskMutation({
          id: _id,
          data: {
            user: newUser._id,
            date_start: startDate,
            date_end: endDate,
            name,
          },
        });

        return [
          ...filtered,
          {
            ...existing,
            date_start: startDate,
            date_end: endDate,
            user: newUser,
          },
        ] as ITask[];
      });
    },
    [setMyEvents, users, editTaskMutation, handleEvent]
  );

  useEffect(() => {
    if (isTasksSuccess && !isTasksLoading && tasks?.result) {
      setMyEvents(tasks.result);
    }
  }, [isTasksSuccess, isTasksLoading, tasks]);

  return (
    <div>
      {!isTasksLoading &&
      !isUsersLoading &&
      isUsersSuccess &&
      isTasksSuccess &&
      users &&
      tasks ? (
        <>
          <DnDCalendar
            enableAutoScroll
            resizable={!isPending}
            selectable={!isPending}
            onEventResize={resizeEvent}
            onEventDrop={moveEvent}
            onSelectEvent={handleOnOpenModal}
            views={[Views.DAY, Views.WEEK]}
            defaultView={Views.DAY}
            localizer={localizer}
            messages={culture.ru}
            step={30}
            timeslots={4}
            resources={users.result || []}
            resourceAccessor={(event: ITask) => event.user._id}
            resourceIdAccessor={(event: IUser) => event._id}
            startAccessor={(event: ITask) =>
              new Date(Date.parse(event.date_start))
            }
            endAccessor={(event: ITask) => new Date(Date.parse(event.date_end))}
            events={myEvents}
            min={new Date(1972, 1, 0, 7, 0, 0)}
            max={new Date(1972, 1, 0, 22, 0, 0)}
            popup={true}
            components={components as Components<object, object>}
          />
          <Modal
            isOpen={!!selectedTaskId}
            onClose={handleOnCloseModal}
            title="Изменение информации о задаче"
            actionTitle="Сохранить"
            actionType="submit"
            formId={selectedTaskId}
          >
            {selectedTaskId && (
              <EditTaskForm
                closeModal={handleOnCloseModal}
                id={selectedTaskId}
              />
            )}
          </Modal>
          {isPending && <Spinner />}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
