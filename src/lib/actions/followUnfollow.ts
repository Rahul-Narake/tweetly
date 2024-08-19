'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import prisma from '@repo/db/client';

export async function handleFollowUnfollow(userId: number) {
  try {
    const session = await getServerSession(authOptions);
    const currentUserId = Number(session?.user?.id);
    //first check isfollowing
    const isFollowing = await prisma.follows.findFirst({
      where: { followerId: currentUserId, followingId: userId },
    });
    //if isfollowing then unfollow

    if (isFollowing) {
      await prisma.follows.delete({ where: { id: isFollowing?.id } });
      return { message: 'Unfollowed successfully', success: true };
    } else {
      const followed = await prisma.follows.create({
        data: { followerId: currentUserId, followingId: userId },
      });
      return { message: 'Followed successfully', success: true };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
