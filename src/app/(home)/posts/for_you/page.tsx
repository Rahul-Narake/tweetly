import InfiniteScrollPosts from '@/components/InfiniteScrollPosts';
import { getLimitedPosts } from '@/lib/actions/getPosts';

export default async function ForYouPage() {
  const posts = await getLimitedPosts({});
  return <InfiniteScrollPosts initialPosts={posts} />;
}
