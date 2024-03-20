import type { MongoClient } from 'mongodb';
import type { NextRequest } from 'next/server';

export const getDbAndReqBody = async (
  clientPromise: Promise<MongoClient>,
  req: NextRequest | null
) => {
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME);

  if (req) {
    const reqBody = await req.json();
    return { db, reqBody };
  }

  return { db };
};
