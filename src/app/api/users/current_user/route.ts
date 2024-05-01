import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session.user) {
      return NextResponse.json({ message: 'Unauthenticated', success: false });
    }
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        dob: true,
        followers: { select: { id: true, userId: true, followerId: true } },
        following: { select: { id: true, userId: true, followingId: true } },
        bookmarks: {
          select: { id: true, createdAt: true, postId: true, userId: true },
        },
      },
    });
    return NextResponse.json({
      messge: 'Current user loaded successfully',
      succes: true,
      user,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.message);
  }
}
