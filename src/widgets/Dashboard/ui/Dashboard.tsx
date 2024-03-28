import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar';

import { getTasks } from '@/src/entities/task';
import { getUsers } from '@/src/entities/user';
import type { IEventCardProps } from '@/src/features/event-card';
import { EventCard } from '@/src/features/event-card';
import type { IEventResourceProps } from '@/src/features/event-resource';
import { EventResource } from '@/src/features/event-resource';
import type { IReturn } from '@/src/shared';
import { Spinner } from '@/src/shared';
import type { ITask, IUser } from '@/src/shared/types';

const localizer = dayjsLocalizer(dayjs);

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
  const [myEvents, setMyEvents] = useState<ITask[] | []>([]);
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
          <Calendar
            enableAutoScroll
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
            components={components}
          />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
