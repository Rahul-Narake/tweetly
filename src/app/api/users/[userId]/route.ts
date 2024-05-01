import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { message: 'Unauthenticated', success: false },
    //     { status: 403 }
    //   );
    // }
    const user = await prisma.user.findFirst({
      where: { id: Number(params.userId) },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        posts: true,
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found', success: false },
        { status: 400 }
      );
    }
    return NextResponse.json({
      message: 'User data fetched successfully',
      success: true,
      user,
    });
  } catch (error: any) {
    console.log(error);
    throw Error(error?.message);
  }
}
