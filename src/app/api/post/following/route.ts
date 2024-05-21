import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthenticated', success: false },
        { status: 403 }
      );
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
