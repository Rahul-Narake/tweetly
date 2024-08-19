'use client';
import useSelectedConversation from '@/hooks/useSelectedConversation';
import React from 'react';
import Message from './Message';
import useListenMessages from '@/hooks/useListenMessages';
import { useRecoilValue } from 'recoil';
import { selectedUserAtom } from '@/store/atoms/MessageAtom';
import useGetMessages from '@/hooks/useGetMessages';
import useChatScroll from '@/hooks/useChatScroll';

function Messages() {
  const { loading, selectedConversation, messages } = useGetMessages();
  const selectedUser = useRecoilValue(selectedUserAtom);
  useListenMessages();
  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;
  return (
    <div
      className="px-4 flex-1 overflow-auto h-[86vh] absolute bottom-[50px] top-[50px] w-full space-y-2 py-2"
      ref={ref}
    >
      {!selectedUser && !selectedConversation && (
        <div className={`${selectedConversation ? 'hidden' : ''}`}>
          Please select user from sidebar to start conversation
        </div>
      )}
      {selectedUser &&
        messages &&
        messages?.map((msg) => <Message key={msg.id} message={msg} />)}
    </div>
  );
}

export default Messages;
