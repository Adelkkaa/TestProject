import { createEffect } from 'effector';

export const fetchUsersFx = createEffect<void, []>(async () => {
  const response = await fetch('/api/users', { method: 'GET' });

  if (!response.ok) throw response;

  return response.json();
});
