'use client';

import {
  MessageType,
  selectedConversionAtom,
  selectedUserAtom,
} from '@/store/atoms/MessageAtom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const useSelectedConversation = () => {
  const [loading, setLoading] = useState(false);
  const [selectedConversion, setSelectedConversation] = useRecoilState(
    selectedConversionAtom
  );
  const { messages, selectedUser } = useRecoilValue(selectedConversionAtom);
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
      } catch (error: any) {
        console.log('error in fetching selected conversation data');
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);

  return { loading, selectedConversion, messages };
};

export default useSelectedConversation;
