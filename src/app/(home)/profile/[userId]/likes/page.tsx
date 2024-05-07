import { PostsList } from '@/components/PostsList';
import { getUsersLikedPost } from '@/lib/actions/getLikesPosts';

export default async function UsersLikedPosts({
  params,
}: {
  params: { userId: string };
}) {
  const posts = await getUsersLikedPost(Number(params.userId));
  return <PostsList posts={posts} />;
}
