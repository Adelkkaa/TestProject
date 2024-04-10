// Данный роут для middleware
import jwt from 'jsonwebtoken';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (token) {
      const tokenData = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET as string
      );
      return NextResponse.json({ result: tokenData, error: null });
    } else {
      return NextResponse.json({ result: null, error: null });
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
