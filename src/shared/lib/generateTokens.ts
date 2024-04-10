import jwt from 'jsonwebtoken';

export const generateTokens = (payload: string | object) => {
  const accessToken = jwt.sign(
    payload,
    process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET as string,
    {
      expiresIn: '30m',
    }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET as string,
    {
      expiresIn: '30d',
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};
