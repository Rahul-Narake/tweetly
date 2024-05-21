import { PostsList } from '@/components/PostsList';
import { getRepliedPosts } from '@/lib/actions/getPosts';

export default async function UserRepliedPosts({
  params,
}: {
  params: { userId: String };
}) {
  const posts = await getRepliedPosts({ userId: Number(params.userId) });
  return <PostsList posts={posts} />;
}
