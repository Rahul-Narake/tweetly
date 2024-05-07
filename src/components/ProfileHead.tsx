import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import { getUserData } from '@/lib/actions/getUserData';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { ProfileTabs } from './ProfileTabs';
import { BackButton } from './BackButton';
import { EditProfileComponent } from './EditProfile';
import { EditProfileImage } from './EditProfileImage';
import { FollowUnfollowButton } from './FollowUnfollowButton';

export async function ProfileHead({ userId }: { userId: number }) {
  const user = await getUserData(userId);
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col">
      <div className="flex sticky top-0 space-x-8 bg-gray-800 border-b-[1px] border-slate-500 px-2 items-center py-1">
        <BackButton />
        <div className="flex flex-col">
          <h2>{user?.name}</h2>
          <p className="text-sm text-slate-500">{user?.posts.length} posts</p>
        </div>
      </div>
      <div className="flex mt-4 justify-center items-center space-x-4">
        <div className="flex flex-col justify-center items-start">
          <Image
            src={user?.profile || ''}
            alt={user?.name || 'profile'}
            width={100}
            height={100}
            className="rounded-full w-[150px] h-[150px]"
          />
          {user?.id === currentUser?.id && (
            <div className="flex w-full justify-center">
              <EditProfileImage user={user} />
            </div>
          )}
        </div>
        {user?.id === currentUser?.id && (
          <span className="px-4 py-1 border-[1px] border-slate-300 rounded-full cursor-pointer">
            <EditProfileComponent user={currentUser} />
          </span>
        )}
        {user?.id !== currentUser?.id && (
          <div className="flex items-center space-x-4">
            <span className="px-1 py-1 cursor-pointer">
              <MessageCircle size={28} />
            </span>
            <span className="px-2 py-1 border-[1px] border-slate-300 rounded-full cursor-pointer ">
              <FollowUnfollowButton user={user} currentUser={currentUser} />
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col px-2 space-y-2">
        <h2>{user?.name}</h2>
        {user?.id === currentUser?.id && (
          <p className="text-sm text-slate-500">{user?.email}</p>
        )}
        <p>{user?.bio}</p>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <p className="text-slate-100 font-semibold">
              {user?.followers.length}
            </p>
            <p className="text-slate-500">Followers</p>
          </div>
          <div className="flex space-x-2">
            <p className="text-slate-100 font-semibold">
              {user?.following.length}
            </p>
            <p className="text-slate-500">Followings</p>
          </div>
        </div>
      </div>
      <div>
        <ProfileTabs userId={userId} />
      </div>
    </div>
  );
}
