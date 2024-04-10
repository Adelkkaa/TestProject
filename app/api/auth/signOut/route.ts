import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { clientPromise } from '@/src/shared/lib/clientPromise';
import { getDbAndReqBody } from '@/src/shared/utils/api/dbConnection';

export async function POST(req: NextRequest) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req);
    await db
      .collection('employees')
      .updateOne({ email: reqBody.email }, { $set: { refreshToken: null } });
    const response = NextResponse.json({ result: null, error: null });
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({ result: null, error: (error as Error).message }),
      {
        status: 500,
      }
    );
  }
}
