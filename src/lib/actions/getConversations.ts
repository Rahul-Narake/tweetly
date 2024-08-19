'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import axios from 'axios';

const getConversations = async (): Promise<ConversationType[] | []> => {
  try {
    const session = getServerSession(authOptions);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_WEBSOCKT_BASE_URL}/conversations`,
      { withCredentials: true }
    );
    return data.data;
  } catch (error) {
    return [];
  }
};

export default getConversations;
