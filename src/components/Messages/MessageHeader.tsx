'use client';
import React from 'react';
import { ProfileAvatar } from '../ProfileAvatar';
import BackBTN from './BackBTN';
import { useRecoilValue } from 'recoil';
import { selectedUserAtom } from '@/store/atoms/MessageAtom';

function MessageHeader() {
  const user = useRecoilValue(selectedUserAtom);
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <BackBTN path="/" />
      </div>
      {user && (
        <div className="flex flex-row space-x-2 items-center">
          <ProfileAvatar name={user.name} key={user.id} src={user.profile} />
          <h2>{user.name}</h2>
        </div>
      )}
    </div>
  );
}

export default MessageHeader;
