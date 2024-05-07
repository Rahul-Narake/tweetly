'use client';
import { useRouter } from 'next/navigation';
import { ProfileTab } from './ProfileTab';

export function ProfileTabs({ userId }: { userId: number }) {
  const router = useRouter();

  return (
    <div className="flex justify-around mt-4 border-b-[1px] border-slate-400 pb-4">
      <ProfileTab
        title="posts"
        onclick={() => {
          router.push(`/profile/${userId}/posts`);
        }}
        path={`/profile/${userId}/posts`}
      />
      <ProfileTab
        title="Replies"
        onclick={() => {
          router.push(`/profile/${userId}/replies`);
        }}
        path={`/profile/${userId}/replies`}
      />
      <ProfileTab
        title="Likes"
        onclick={() => {
          router.push(`/profile/${userId}/likes`);
        }}
        path={`/profile/${userId}/likes`}
      />
    </div>
  );
}
