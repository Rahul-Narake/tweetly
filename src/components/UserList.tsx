'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export type UserInfoType = {
  id: number;
  name: string;
  profile?: string | null;
};

function UserList({ users }: { users: UserInfoType[] | null }) {
  const router = useRouter();
  return (
    <div className="flex flex-col mx-auto w-[80%] mt-4">
      {users &&
        users.map((user) => {
          return (
            <div
              key={user?.id}
              className="flex space-x-2 w-full border-[1px] border-slate-600 rounded-full mb-2 px-2 py-1 items-center cursor-pointer hover:bg-gray-700"
              onClick={() => {
                router.push(`/profile/${user?.id}/posts`);
              }}
            >
              <Avatar>
                <AvatarImage src={user?.profile || ''} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3>{user?.name}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default UserList;
