import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { IReturn } from './src/shared';
import type { IAuthProfile } from './src/shared/types';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isUnAuthorizedRoutes = ['/login', '/registration'].includes(
    request.nextUrl.pathname
  );

  const isPrivateRoutes = ['/dashboard', '/users', '/tasks'].includes(
    request.nextUrl.pathname
  );

  if (refreshToken) {
    if (isUnAuthorizedRoutes) {
      const url = request.nextUrl.clone();
      url.pathname = '/'; // Указываем абсолютный путь
      return NextResponse.redirect(url);
    }

    if (isPrivateRoutes) {
      const url = request.nextUrl.clone();
      url.pathname = '/api/getTokenData';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
      });
      const { result } = (await response.json()) as IReturn<
        IAuthProfile & { iat: string; exp: string }
      >;

      if (result?.role !== 'Admin' && result?.role !== 'Employee') {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}
