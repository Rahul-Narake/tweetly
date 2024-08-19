'use client';

import {
  messagesAtom,
  MessageType,
  selectedConversionAtom,
  selectedUserAtom,
} from '@/store/atoms/MessageAtom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const selectedUser = useRecoilValue(selectedUserAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversionAtom
  );
  const [messages, setMessages] = useRecoilState(messagesAtom);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_WEBSOCKT_BASE_URL}/conversations/${selectedUser?.id}`,
          { withCredentials: true }
        );

        setSelectedConversation({
          selectedUser,
          messages: data?.data?.messages,
        });
        setMessages(data?.data?.messages);
      } catch (error: any) {
        console.log('error in fetching selected conversation data');
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedUser]);

  return { loading, selectedConversation, messages };
};

export default useGetMessages;
