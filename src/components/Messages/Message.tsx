'use client';
import { extractTime } from '@/lib/utils';
import { MessageType, selectedUserAtom } from '@/store/atoms/MessageAtom';
import { currentUserAtom } from '@/store/atoms/post';
import React from 'react';
import { useRecoilValue } from 'recoil';

function Message({ message }: { message: MessageType }) {
  const currentUser = useRecoilValue(currentUserAtom);
  const selectedUser = useRecoilValue(selectedUserAtom);
  const fromMe = currentUser?.id === message.senderId;
  const img = fromMe ? currentUser.profile : selectedUser?.profile;
  const chatClass = fromMe ? 'chat-end' : 'chat-start';
  const bubbleBg = fromMe ? 'bg-blue-500' : '';
  const shakeClass = message.shouldShake ? 'shake' : '';

  return (
    <div className={`flex flex-1 ${fromMe ? 'justify-end' : 'justify-start'}`}>
      {/* <div className="hidden md:block ">
        <div className="w-6 md:w-10 rounded-full">
          <img src={img || ''} />
        </div>
      </div> */}
      <div
        className={`flex flex-col ${fromMe ? 'bg-blue-500' : 'bg-gray-700'} p-1 rounded-md`}
      >
        <p className={`text-white text-sm md:text-md`}>{message.body}</p>
        <span
          className={`flex opacity-50 text-xs gap-1 items-center text-white justify-end`}
        >
          {extractTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default Message;
