import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type {  IJWTBody } from '@/src/shared/types';

export async function GET(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken');

    if (refreshToken?.value) {
      const tokenData = jwt.verify(
        refreshToken?.value,
        process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET as string,
        (err, decodedToken) => {
          if (err) {
            console.error('Ошибка при расшифровке токена:', err.message);
            return null;
          } else {
            const { id, username, email, role } =
              decodedToken as IJWTBody;
            return { id, username, email, role };
          }
        }
      );
      return NextResponse.json({ result: tokenData, error: null });
    } else {
      return NextResponse.json({ result: null, error: null });
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
