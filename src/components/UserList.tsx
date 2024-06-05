'use client';
import { Followers } from '@/app/(home)/[userId]/followers/page';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

function UserList({ users }: { users: Followers[] | null }) {
  const router = useRouter();
  return (
    <div className="flex mx-auto w-[80%] mt-4">
      {users &&
        users.map((user) => {
          return (
            <div
              key={user?.follower?.id}
              className="flex space-x-2 w-full border-[1px] border-slate-600 rounded-full mb-2 px-2 py-1 items-center cursor-pointer hover:bg-gray-700"
              onClick={() => {
                router.push(`/profile/${user?.follower?.id}/posts`);
              }}
            >
              <Avatar>
                <AvatarImage
                  src={user?.follower?.profile}
                  alt={user?.follower?.name}
                />
                <AvatarFallback>
                  {user?.follower?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3>{user?.follower?.name}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default UserList;
