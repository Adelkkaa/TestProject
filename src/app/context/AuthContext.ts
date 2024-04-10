import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

import type { IAuthProfile } from '@/src/shared/types';

type SetProfile = Dispatch<SetStateAction<IAuthProfile | null>>;

type AuthContextType = {
  profile: IAuthProfile | null;
  setProfile: SetProfile;
};

export const AuthContext = createContext<AuthContextType>({
  profile: null,
  setProfile: () => {},
});
