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
          router.push(`/${userId}/posts`);
        }}
        path={`/${userId}`}
      />
      <ProfileTab
        title="Replies"
        onclick={() => {
          router.push(`/${userId}/replies`);
        }}
        path={`/${userId}`}
      />
      <ProfileTab
        title="Likes"
        onclick={() => {
          router.push(`/${userId}/likes`);
        }}
        path={`/${userId}`}
      />
    </div>
  );
}
