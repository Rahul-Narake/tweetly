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

    const followingUsers = await prisma.following.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
      select: {
        followingId: true,
      },
    });

    const followingUserIds = followingUsers.map((user) => user.followingId);

    const posts = await prisma.post.findMany({
      where: {
        userId: {
          in: followingUserIds,
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        comments: true,
        image: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'All posts loaded', success: true, posts },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
