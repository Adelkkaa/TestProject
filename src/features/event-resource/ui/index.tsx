import { Box } from '@chakra-ui/react';
import type { FC } from 'react';

import type { IUser } from '@/src/shared';

export type IEventResourceProps = {
  resource: IUser;
};
export const EventResource: FC<IEventResourceProps> = ({ resource }) => (
  <Box>{resource.fullName}</Box>
);
