import bcrypt from 'bcrypt';
import { NextResponse, type NextRequest } from 'next/server';

import { clientPromise } from '@/src/shared/lib/clientPromise';
import { generateTokens } from '@/src/shared/lib/generateTokens';
import { getDbAndReqBody } from '@/src/shared/utils/api/dbConnection';

export async function POST(request: NextRequest) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, request);

    const employee = await db
      .collection('employees')
      .findOne({ email: reqBody.email });

    if (!employee) {
      throw new Error('Такого пользователя не существует');
    }

    const isPasswordEquals = await bcrypt.compare(
      reqBody.password,
      employee?.password
    );

    if (isPasswordEquals) {
      const { accessToken, refreshToken } = generateTokens({
        id: employee._id,
        username: employee.username,
        email: employee.email,
        role: employee.role,
      });

      const response = NextResponse.json({
        result: {
          id: employee._id,
          username: employee.username,
          email: employee.email,
          role: employee.role,
        },
        error: null,
      });

      response.cookies.set('accessToken', accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 30, // 30 минут
      });

      response.cookies.set('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 дней
      });

      await db
        .collection('employees')
        .updateOne(
          { email: reqBody.email },
          { $set: { refreshToken: refreshToken } }
        );

      return response;
    } else {
      throw new Error('Введенный пароль неверный');
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
