import React from 'react';
import MessageHeader from './MessageHeader';
import Messages from './Messages';
import MessageInput from './MessageInput';

function MessageContainer() {
  return (
    <div className="relative flex w-full h-screen flex-col">
      <div className="flex items-center relative top-0 w-full border-b-[1px] border-slate-600 h-[50px] px-2">
        <MessageHeader />
      </div>
      <Messages />
      <div className="absolute bottom-1 w-full">
        <MessageInput />
      </div>
    </div>
  );
}

export default MessageContainer;
