'use client';
import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import { currentUserAtom } from '@/store/atoms/post';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

function Profile() {
  // const getloggedInUser = useCallback(async () => {
  //   const user = await getCurrentUser();
  //   setCurrentUser(user);
  // }, []);

  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const { data } = useSession();
  useEffect(() => {
    // if (data?.user) {
    //   getloggedInUser();
    // }
  }, []);
  return <></>;
}

export default Profile;
