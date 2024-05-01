'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import prisma from '@/db';

export async function handleFollowUnfollow(userId: number) {
  try {
    const session = await getServerSession(authOptions);
    const isFollowing = await prisma.following.findFirst({
      where: { userId: Number(session?.user?.id), followingId: userId },
    });
    if (isFollowing) {
      await prisma.$transaction(async (tr) => {
        await tr.following.delete({
          where: { id: isFollowing?.id },
        });
        await tr.follower.deleteMany({
          where: { userId, followerId: session?.user.id },
        });
        return { success: true, message: 'Unfollowed successfully' };
      });
    } else {
      await prisma.$transaction(async (tr) => {
        const followed = await tr.following.create({
          data: { userId: session?.user?.id, followingId: userId },
        });

        if (followed) {
          await tr.follower.create({
            data: { userId, followerId: session?.user?.id },
          });
          return { success: true, message: 'Followed successfully' };
        }
      });
    }
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error?.message };
  }
}
