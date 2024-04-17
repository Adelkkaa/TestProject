import bcrypt from 'bcrypt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { clientPromise } from '@/src/shared/lib/clientPromise';
import { getDbAndReqBody } from '@/src/shared/utils/api/dbConnection';

export async function POST(request: NextRequest) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, request);

    const { username, email, password } = reqBody;

    const result = await db
      .collection('employees')
      .findOne({ email: reqBody.email });

    if (!result) {
      const passwordHash = await bcrypt.hash(password, 3);

      const body = {
        username,
        email,
        password: passwordHash,
        role: 'Employee',
        refreshToken: null,
      };

      await db.collection('employees').insertOne(body);

      return NextResponse.json({ result: true, error: null });
    } else {
      throw new Error('Сотрудник с таким email уже зарегестрирован');
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
