import { PostsList } from '@/components/PostsList';
import { getFollowingPosts } from '@/lib/actions/getPosts';

export default async function FollowingPostsPage() {
  const posts = await getFollowingPosts();
  return <PostsList posts={posts} />;
}
