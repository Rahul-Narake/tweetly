import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import { getUserData } from '@/lib/actions/getUserData';
import Image from 'next/image';
import { ProfileTabs } from './ProfileTabs';
import { BackButton } from './BackButton';
import { EditProfileImage } from './EditProfileImage';
import ProfileImage from './ProfileImage';
import UserData from './UserData';

export async function ProfileHead({ userId }: { userId: number }) {
  const user = await getUserData(userId);
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col">
      <div className="flex sticky top-0 space-x-8 bg-gray-800 border-b-[1px] border-slate-500 px-2 items-center py-1 z-20">
        <BackButton />
        <div className="flex flex-col">
          <h2>{user?.name}</h2>
          <p className="text-sm text-slate-500">{user?.posts.length} posts</p>
        </div>
      </div>
      <div className="flex mt-4 justify-center items-center space-x-4">
        <div className="flex flex-col justify-center items-start relative">
          <Image
            src={user?.profile || ''}
            alt={user?.name || 'Profile'}
            width={100}
            height={100}
            className="rounded-full w-[150px] h-[150px] border-2 z-0"
          />
          {currentUser && user?.id === currentUser?.id && (
            <div className="flex w-full justify-center absolute">
              <EditProfileImage user={user} />
            </div>
          )}
        </div>
        <ProfileImage currentUserInfo={currentUser} userInfo={user} />
      </div>
      <UserData user={user} />
      <div>
        <ProfileTabs userId={userId} />
      </div>
    </div>
  );
}
