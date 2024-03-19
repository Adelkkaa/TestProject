import { NextResponse } from 'next/server';

import { clientPromise } from '@/shared/lib/clientPromise';
import { getDbAndReqBody } from '@/shared/utils/api/dbConnection';

export async function GET() {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null);

    const data = await db.collection('users').find().toArray();

    return NextResponse.json({ result: data, error: null });
  } catch (error) {
    return NextResponse.json({ result: null, error: error });
  }
}
