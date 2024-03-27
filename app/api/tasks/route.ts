import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { clientPromise } from '@/src/shared/lib/clientPromise';
import { getDbAndReqBody } from '@/src/shared/utils/api/dbConnection';

export async function GET() {
  try {
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
    const { db, reqBody } = await getDbAndReqBody(clientPromise, request);

    const result = await db.collection('tasks').insertOne(reqBody);

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
