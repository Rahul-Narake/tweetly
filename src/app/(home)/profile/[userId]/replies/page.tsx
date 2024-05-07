import { PostsList } from '@/components/PostsList';
import { getUsersPost } from '@/lib/actions/getUserData';

export default async function UsersReply({
  params,
}: {
  params: { userId: string };
}) {
  const posts = await getUsersPost(Number(params.userId));
  return <PostsList posts={posts} />;
}
