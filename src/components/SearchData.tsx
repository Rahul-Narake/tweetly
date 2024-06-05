'use client';
import { SearchDataType } from '@/lib/actions/getSearchData';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useRouter } from 'next/navigation';

function SearchData({ data }: { data: SearchDataType[] | null }) {
  const router = useRouter();
  return (
    <div className="flex flex-col span-y-2 h-[300px] overflow-y-scroll">
      {data &&
        data.map((user) => {
          return (
            <div
              key={user?.id}
              className="flex space-x-2 w-full border-[1px] border-slate-600 rounded-full mb-2 px-2 py-1 items-center cursor-pointer hover:bg-gray-700"
              onClick={() => {
                router.push(`/profile/${user?.id}/posts`);
              }}
            >
              <Avatar>
                <AvatarImage src={user?.profile} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3>{user.name}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default SearchData;
