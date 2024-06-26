import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import { User } from '@/store/atoms/post';
import FollowComponent from './FollowComponent';

export default async function UserData({ user }: { user: User | null }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col px-2 space-y-2">
      <h2>{user?.name}</h2>
      {user?.id === currentUser?.id && (
        <p className="text-sm text-slate-500">{user?.email}</p>
      )}
      <p>{user?.bio}</p>
      <div className="flex space-x-4 items-center">
        <div className="flex space-x-2 items-center">
          <p className="text-slate-100 font-semibold">
            {user?.followers.length}
          </p>
          <FollowComponent title="Followers" path={`/${user?.id}/followers`} />
        </div>
        <div className="flex space-x-2 items-center">
          <p className="text-slate-100 font-semibold">
            {user?.following.length}
          </p>
          <FollowComponent
            title="Followings"
            path={`/${user?.id}/followings`}
          />
        </div>
      </div>
    </div>
  );
}
