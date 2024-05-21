'use client';
import { handleFollowUnfollow } from '@/lib/actions/followUnfollow';
import { CurrentUser, User } from '@/store/atoms/post';
import { useState } from 'react';
import { toast } from 'sonner';

export function FollowUnfollowButton({
  user,
  currentUser,
}: {
  user: User | null;
  currentUser: CurrentUser | null;
}) {
  const isFollowing = () => {
    if (currentUser) {
      const followings = currentUser.following.filter(
        (fw) => fw.followingId === user?.id
      );
      if (followings.length > 0) {
        return true;
      }
    }
    return false;
  };
  const [following, setFollowing] = useState(isFollowing());
  console.log(user);
  console.log(currentUser);
  return (
    <div
      onClick={async () => {
        const resp = await handleFollowUnfollow(Number(user?.id));
        if (resp?.success) {
          setFollowing((fw) => !fw);
        }
        toast(`${resp?.message}`, {
          action: { label: 'close', onClick: () => toast.dismiss() },
        });
      }}
    >
      {following ? 'Unfollow' : 'Follow'}
    </div>
  );
}
