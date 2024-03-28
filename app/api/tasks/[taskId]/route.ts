import { ObjectId } from 'mongodb';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


import { clientPromise } from '@/src/shared/lib/clientPromise';
import { getDbAndReqBody } from '@/src/shared/utils/api/dbConnection';

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null);
    const id = params.taskId;

    const isValidId = ObjectId.isValid(id);

    if (!isValidId) {
      throw new Error('Wrong Task Id');
    }

    const result = await db
      .collection('tasks')
      .findOne({ _id: new ObjectId(id) });

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, request);
    const id = params.taskId;

    const isValidId = ObjectId.isValid(id);

    if (!isValidId) {
      throw new Error('Wrong Task Id');
    }

    let user = {};

    if (reqBody.user) {
      user = await db
        .collection('users')
        .findOne({ _id: new ObjectId(reqBody.user as string) }) as object;
    }

    const result = await db
      .collection('tasks')
      .updateOne({ _id: new ObjectId(id) }, { $set: Object.keys(user).length ? {...reqBody, user} : reqBody });

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null);
    const id = params.taskId;

    const isValidId = ObjectId.isValid(id);

    if (!isValidId) {
      throw new Error('Wrong Task Id');
    }

    const result = await db
      .collection('tasks')
      .deleteOne({ _id: new ObjectId(id) });

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
