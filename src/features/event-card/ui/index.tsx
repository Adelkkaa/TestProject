import { Box, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import type { FC } from 'react';

import type { ITask } from '@/src/shared/types';
import './index.css';

dayjs.locale(ru);

export type IEventCardProps = {
  event: ITask;
};

export const EventCard: FC<IEventCardProps> = ({ event }) => {
  const { name, date_start, date_end } = event;

  return (
    <Box
      sx={{
        paddingLeft: 1,
        height: '100%',
        width: '100%',
        color: '#000',
        backgroundColor: dayjs(date_end) > dayjs() ? 'green' : 'red',
        border: '3px solid grey',
        borderRadius: '5px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <Box>
          <Text>
            {dayjs(date_start).format('HH:mm')} -{' '}
            {dayjs(date_end).format('HH:mm')}
          </Text>
        </Box>
      </Box>
      <Box mt={1}>
        <Text variant="h5">{name}</Text>
      </Box>
    </Box>
  );
};
