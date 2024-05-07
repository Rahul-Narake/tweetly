import InfiniteScrollOnProfile from '@/components/InfiniteScrollOnProfile';
import { getUsersPost } from '@/lib/actions/getUserData';

export default async function UsersPosts({
  params,
}: {
  params: { userId: string };
}) {
  const posts = await getUsersPost({ userId: Number(params.userId) });
  return (
    <InfiniteScrollOnProfile
      initialPosts={posts}
      userId={Number(params.userId)}
    />
  );
}
