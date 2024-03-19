import { createQuery } from '@farfetched/core';

import { fetchUsersFx } from '../model/users';

export const usersQuery = createQuery({
  effect: fetchUsersFx,
});
