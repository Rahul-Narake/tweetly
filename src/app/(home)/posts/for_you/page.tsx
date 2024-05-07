import InfiniteScrollPosts from '@/components/InfiniteScrollPosts';
import { PostsList } from '@/components/PostsList';
import { getForYouPosts, getLimitedPosts } from '@/lib/actions/getPosts';

export default async function ForYouPage() {
  const posts = await getLimitedPosts({});
  return (
    <div className="flex flex-col">
      <InfiniteScrollPosts initialPosts={posts} />
    </div>
  );
}
