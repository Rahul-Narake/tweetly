'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import prisma from '@/db';
import { Follow } from '@/store/atoms/post';

// export async function handleFollowUnfollow(userId: number) {
//   try {
//     const session = await getServerSession(authOptions);
//     console.log(`following to ${userId} by ${session?.user?.id}`);
//     const isFollowing = await prisma.following.findFirst({
//       where: { userId: Number(session?.user?.id), followingId: userId },
//     });

//     if (isFollowing) {
//       await prisma.$transaction(async (tr) => {
//         await tr.following.delete({
//           where: { id: isFollowing?.id },
//         });
//         await tr.follower.deleteMany({
//           where: { userId, followerId: Number(session?.user.id) },
//         });
//       });
//       return { success: true, message: 'Unfollowed successfully' };
//     } else {
//       await prisma.$transaction(async (tr) => {
//         const followed = await tr.following.create({
//           data: { userId: Number(session?.user?.id), followingId: userId },
//         });
//         console.log(followed);
//         if (followed) {
//           const follower = await tr.follower.create({
//             data: { userId: Number(session?.user?.id), followerId: userId },
//           });
//           console.log(follower);
//         }
//       });
//       return { success: true, message: 'Followed successfully' };
//     }
//   } catch (error: any) {
//     console.log(error);
//     return { success: false, message: error?.message };
//   }
// }

export async function handleFollowUnfollow(userId: number) {
  try {
    const session = await getServerSession(authOptions);
    const currentUserId = Number(session?.user?.id);
    //first check isfollowing
    const isFollowing = await prisma.follows.findFirst({
      where: { followerId: currentUserId, followingId: userId },
    });
    console.log(isFollowing);
    //if isfollowing then unfollow

    if (isFollowing) {
      await prisma.follows.delete({ where: { id: isFollowing?.id } });
      return { message: 'Unfollowed successfully', success: true };
    } else {
      const followed = await prisma.follows.create({
        data: { followerId: currentUserId, followingId: userId },
      });
      console.log(followed);
      return { message: 'Followed successfully', success: true };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
