'use client';

import { conversationsAtom } from '@/store/atoms/MessageAtom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const setToatlConversations = useSetRecoilState(conversationsAtom);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_WEBSOCKT_BASE_URL}/conversations`,
          { withCredentials: true }
        );
        if (!data.success) {
          throw new Error(data.message);
        }
        setConversations(data.data);
        setToatlConversations(data.data);
      } catch (error: any) {
        console.log('error in fetching converastions');
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
