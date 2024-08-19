'use client';

import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import { CurrentUser, currentUserAtom } from '@/store/atoms/post';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect } from 'react';
import { useRecoilState } from 'recoil';

const AuthContext = createContext<CurrentUser | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    };

    const signinToWs = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_WEBSOCKT_BASE_URL}/auth/signin/${session?.user?.id}`,
        { withCredentials: true }
      );
    };

    if (session?.user && status === 'authenticated') {
      fetchCurrentUser();
      signinToWs();
    }
  }, [session?.user]);
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Auth context should used within session provider');
  }
  return context;
};

export default AuthContextProvider;
