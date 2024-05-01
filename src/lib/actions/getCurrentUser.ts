'use server';
import { CurrentUser } from '@/store/atoms/post';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import prisma from '@/db';

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const session = await getServerSession(authOptions);
    if (!session.user) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        dob: true,
        followers: true,
        following: true,
        bookmarks: {
          select: { id: true, createdAt: true, postId: true, userId: true },
        },
      },
    });
    return user;
  } catch (error) {
    return null;
  }
}
