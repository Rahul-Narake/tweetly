'use client';

import { useSocketContext } from '@/context/SocketContext';
import {
  messagesAtom,
  selectedConversionAtom,
  selectedUserAtom,
} from '@/store/atoms/MessageAtom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversionAtom
  );
  const [messages, setMessages] = useRecoilState(messagesAtom);
  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      const message = JSON.parse(newMessage);
      message.shouldShake = true;
      setSelectedConversation((p) => {
        return {
          selectedUser: p.selectedUser,
          messages: [...p.messages, message],
        };
      });
      setMessages((m) => [...m, message]);
    });
    socket?.on('onlineUsers', (e) => {
      console.log(e);
    });

    return () => {
      socket?.off('newMessage');
    };
  }, [socket, selectedConversation, messages]);
};

export default useListenMessages;
