'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ProfileAvatar } from '../ProfileAvatar';
import { useRecoilState } from 'recoil';
import { selectedUserAtom } from '@/store/atoms/MessageAtom';

export default function SidebarComponent({
  user,
  path,
}: {
  user: ConversationType;
  path: string;
}) {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserAtom);
  return (
    <div
      onClick={() => {
        setSelectedUser(user);
        router.push(path);
      }}
      className={`${user.id === selectedUser?.id ? 'bg-gray-600 rounded-lg' : ''} flex justify-start items-center cursor-pointer hover:bg-gray-600 hover:rounded-md`}
    >
      <ProfileAvatar src={user.profile} key={user.id} name={user.name} />
      <h3 className="pl-2 pt-0">{user.name}</h3>
    </div>
  );
}
