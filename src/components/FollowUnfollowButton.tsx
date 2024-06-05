'use client';
import { handleFollowUnfollow } from '@/lib/actions/followUnfollow';
import { currentSelectedUserAtom, currentUserAtom } from '@/store/atoms/post';
import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { toast } from 'sonner';

export function FollowUnfollowButton() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [currentSelectedUser, setCurrentSelectedUser] = useRecoilState(
    currentSelectedUserAtom
  );

  const isFollowing = () => {
    if (currentUser && currentSelectedUser) {
      const following = currentUser.following.filter(
        (fw) => fw?.followingId === currentSelectedUser?.id
      );
      if (following) {
        return true;
      }
    }

    return false;
  };

  const [following, setFollowing] = useState(isFollowing());

  useEffect(() => {
    isFollowing();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <span
        onClick={async () => {
          if (currentSelectedUser) {
            const resp = await handleFollowUnfollow(currentSelectedUser?.id);
            if (resp) {
              setFollowing(!following);
              toast(resp?.message);
            }
          }
        }}
      >
        {following ? 'Unfollow' : 'Follow'}
      </span>
    </div>
  );
}
