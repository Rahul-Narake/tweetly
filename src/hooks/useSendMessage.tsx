'use client';
import {
  messagesAtom,
  MessageType,
  selectedUserAtom,
} from '@/store/atoms/MessageAtom';
import axios from 'axios';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMessage] = useState<MessageType | null>(null);
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const selectedUser = useRecoilValue(selectedUserAtom);
  const sendMessage = async (message: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_WEBSOCKT_BASE_URL}/conversations/send/${selectedUser?.id}`,
        { message },
        { withCredentials: true }
      );
      if (data?.success) {
        const msg = data.data as MessageType;
        setMessages((p) => [...p, msg]);
        setMessage(msg);
      }
    } catch (error: any) {
      console.log('error in sending message');
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage, messages };
};

export default useSendMessage;
