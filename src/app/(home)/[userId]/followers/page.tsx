import UserList from '@/components/UserList';
import prisma from '@/db';
import React from 'react';

export type Followers = {
  follower: { id: number; name: string; profile?: string };
};

const getFollowers = async (userId: number) => {
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        followers: {
          select: {
            follower: {
              select: {
                id: true,
                name: true,
                profile: true,
              },
            },
          },
        },
      },
    });

    return data?.followers as Followers[];
  } catch (error) {
    console.log(error);
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
