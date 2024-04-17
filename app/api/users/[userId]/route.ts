import { ObjectId } from 'mongodb';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { clientPromise } from '@/src/shared/lib/clientPromise';
import { getDbAndReqBody } from '@/src/shared/utils/api/dbConnection';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {

    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { result: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { db } = await getDbAndReqBody(clientPromise, null);
    const id = params.userId;

    const isValidId = ObjectId.isValid(id);

    if (!isValidId) {
      throw new Error('Wrong User Id');
    }

    const result = await db
      .collection('users')
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
  { params }: { params: { userId: string } }
) {
  try {

    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { result: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { db, reqBody } = await getDbAndReqBody(clientPromise, request);
    const id = params.userId;

    const isValidId = ObjectId.isValid(id);

    if (!isValidId) {
      throw new Error('Wrong User Id');
    }

    // Обновляем данные пользователя
    const result = await db
      .collection('users')
      .updateOne({ _id: new ObjectId(id) }, { $set: reqBody });

    // Получаем все данные о текущем пользователе
    const newUser = await db
      .collection('users')
      .findOne({ _id: new ObjectId(id) });


    // Обновляем в задачах пользователя
    await db
      .collection('tasks')
      .updateMany(
        { 'user._id': new ObjectId(id) },
        { $set: { user: newUser } }
      );

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
  { params }: { params: { userId: string } }
) {
  try {

    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { result: null, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { db } = await getDbAndReqBody(clientPromise, null);
    const id = params.userId;

    const isValidId = ObjectId.isValid(id);

    if (!isValidId) {
      throw new Error('Wrong User Id');
    }

    const result = await db
      .collection('users')
      .deleteOne({ _id: new ObjectId(id) });

      // Удаление всех задач, связанных с пользователем
    await db.collection('tasks').deleteMany({ "user._id": new ObjectId(id) });

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

