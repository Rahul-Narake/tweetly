import UserList, { UserInfoType } from '@/components/UserList';
import prisma from '@repo/db/client';
import React from 'react';
import { Followers } from '../followers/page';

const getFollowings = async (
  userId: number
): Promise<UserInfoType[] | null> => {
  try {
    const followings = await prisma.follows.findMany({
      where: { followerId: userId },
      select: {
        following: {
          select: {
            id: true,
            name: true,
            profile: true,
          },
        },
      },
    });

    if (followings) {
      const data = followings.map((item) => item.following);
      return data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function page({ params }: { params: { userId: string } }) {
  const followers = await getFollowings(Number(params.userId));
  return (
    <div className="flex flex-col w-full">
      {followers && <UserList users={followers} />}
    </div>
  );
}
