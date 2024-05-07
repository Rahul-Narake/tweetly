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
    console.log('checking isfollowing');
    console.log(isFollowing);
    if (isFollowing) {
      console.log('following already');
      await prisma.$transaction(async (tr) => {
        await tr.following.delete({
          where: { id: isFollowing?.id },
        });
        await tr.follower.deleteMany({
          where: { userId, followerId: Number(session?.user.id) },
        });
      });
      return { success: true, message: 'Unfollowed successfully' };
    } else {
      console.log('not following');
      await prisma.$transaction(async (tr) => {
        const followed = await tr.following.create({
          data: { userId: Number(session?.user?.id), followingId: userId },
        });
        console.log(followed);
        if (followed) {
          const follower = await tr.follower.create({
            data: { userId, followerId: Number(session?.user?.id) },
          });
          console.log(follower);
        }
      });
      return { success: true, message: 'Followed successfully' };
    }
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error?.message };
  }
}
