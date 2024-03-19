import { MongoClient } from 'mongodb';

export const clientPromise = MongoClient.connect(
  process.env.NEXT_PUBLIC_DB_URL as string,
  {
    maxPoolSize: 10,
  }
);
