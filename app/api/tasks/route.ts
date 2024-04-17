import { ObjectId } from 'mongodb';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { clientPromise } from '@/src/shared/lib/clientPromise';
import { getDbAndReqBody } from '@/src/shared/utils/api/dbConnection';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { result: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const { db } = await getDbAndReqBody(clientPromise, null);

    const data = await db.collection('tasks').find().toArray();

    return NextResponse.json({ result: data, error: null });
  } catch (error) {
    return new Response(
      JSON.stringify({ result: null, error: (error as Error).message }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { result: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const { db, reqBody } = await getDbAndReqBody(clientPromise, request);

    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(reqBody.user as string) });

    const result = await db.collection('tasks').insertOne({ ...reqBody, user });

    return NextResponse.json({ result: result, error: null });
  } catch (error) {
    return new Response(
      JSON.stringify({ result: null, error: (error as Error).message }),
      {
        status: 500,
      }
    );
  }
}
