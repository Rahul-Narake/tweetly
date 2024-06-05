import UserList from '@/components/UserList';
import prisma from '@/db';
import React from 'react';
import { Followers } from '../followers/page';

const getFollowings = async (userId: number) => {
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        following: {
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

    return data?.following as Followers[];
  } catch (error) {
    console.log(error);
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
