'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const useSigninToWS = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    const signin = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSOCKT_BASE_URL}/auth/signin/${session?.user?.id}`,
        { withCredentials: true }
      );
    };
    if (session) {
      signin();
    }
  }, []);
  return { loading };
};

export default useSigninToWS;
