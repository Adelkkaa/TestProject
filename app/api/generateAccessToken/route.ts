import jwt from 'jsonwebtoken';
import { NextResponse, type NextRequest } from 'next/server';

import { generateTokens } from '@/src/shared/lib/generateTokens';
import type { IJWTBody } from '@/src/shared/types';

// import { clientPromise } from '@/src/shared/lib/clientPromise';
// import { getDbAndReqBody } from '@/src/shared/utils/api/dbConnection';

export async function GET(request: NextRequest) {
  try {
    // const {db} = await getDbAndReqBody(clientPromise, request);
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (refreshToken) {
      const tokenData = jwt.verify(
        refreshToken as string,
        process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET as string
      ) as IJWTBody | undefined;
      const response = NextResponse.json({
        result: true,
        error: null,
      });

      if (tokenData && new Date().getTime() < tokenData.exp * 1000) {
        const { id, username, email, role } = tokenData;
        const { accessToken } = generateTokens({ id, username, email, role });

        response.cookies.set('accessToken', accessToken, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 60 * 30, // 30 минут
        });

        return response;
      }
    } else {
      throw new Error('Пожалуйста, авторизуйтесь');
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ result: null, error: (error as Error).message }),
      {
        status: 500,
      }
    );
  }
}
