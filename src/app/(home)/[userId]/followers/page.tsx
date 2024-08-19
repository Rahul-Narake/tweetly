import UserList, { UserInfoType } from '@/components/UserList';
import prisma from '@repo/db/client';
import React from 'react';

export type Followers = {
  follower: { id: number; name: string; profile?: string };
};

const getFollowers = async (userId: number): Promise<UserInfoType[] | null> => {
  try {
    const followers = await prisma.follows.findMany({
      where: { followingId: userId },
      select: {
        follower: {
          select: {
            id: true,
            name: true,
            profile: true,
          },
        },
      },
    });

    if (followers) {
      const data = followers.map((item) => item.follower);
      return data;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function page({ params }: { params: { userId: string } }) {
  const followers = await getFollowers(Number(params.userId));
  return (
    <div className="flex flex-col w-full">
      {followers && <UserList users={followers} />}
    </div>
  );
}
