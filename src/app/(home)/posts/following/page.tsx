import { PostsList } from '@/components/PostsList';
import { getFollowingPosts } from '@/lib/actions/getPosts';

export default async function FollowingPostsPage() {
  const posts = await getFollowingPosts();
  return (
    <div className="flex flex-col">
      <PostsList posts={posts} />
    </div>
  );
}
