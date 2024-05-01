'use client';
import { handleFollowUnfollow } from '@/lib/actions/followUnfollow';
import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import { CurrentUser } from '@/store/atoms/post';
import { MessageSquareText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function ProfileImageSection({ userId }: { userId: number }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const handleCurrentUser = async () => {
    const res = await getCurrentUser();
    console.log(res);
    setCurrentUser(res);
  };
  useEffect(() => {
    handleCurrentUser();
  }, []);

  const isCurrentUser = currentUser?.id === userId;

  const isFollowing = () => {
    if (currentUser) {
      const values = currentUser.following.filter(
        (pr) => pr.followingId === userId && pr.userId === currentUser?.id
      );
      return values.length > 0 ? true : false;
    }
    return false;
  };

  return (
    <div className={'w-full px-2'}>
      <div className="w-full flex items-center justify-center">
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.Abfh1-533tuvhdyYnx21dAHaHs&pid=Api&P=0&h=180"
          alt="profile"
          width={30}
          height={30}
          className="w-40 h-40 rounded-full mr-4"
        />
        {!isCurrentUser && (
          <div className="flex justify-evenly space-x-4">
            {isFollowing() && (
              <div className="h-10 w-10 rounded-full border border-slate-200 cursor-pointer flex items-center justify-center">
                <MessageSquareText />
              </div>
            )}

            <p
              className="border border-slate-200 cursor-pointer flex items-center justify-center px-2 py-1 rounded-full"
              onClick={async () => {
                const response = await handleFollowUnfollow(userId);
                toast(
                  response?.message ||
                    `${
                      isFollowing()
                        ? 'Unfollowed successfully'
                        : 'Followed successfully'
                    }`,
                  {
                    action: { label: 'close', onClick: () => toast.dismiss() },
                  }
                );
              }}
            >
              {isFollowing() ? 'Unfollow' : 'Follow'}
            </p>
          </div>
        )}

        {isCurrentUser && (
          <div className="flex justify-evenly space-x-4">
            <p className="border border-slate-200 cursor-pointer flex items-center justify-center px-2 py-1 rounded-full ">
              Edit Profile
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
