import InfiniteScrollPosts from '@/components/InfiniteScrollPosts';
import Posts from '@/components/Posts';
import { getForYouPosts, getLimitedPosts } from '@/lib/actions/getPosts';
import { Suspense } from 'react';

export default async function ForYouPage() {
  const posts = await getLimitedPosts({});
  return (
    <Suspense fallback={<></>}>
      <InfiniteScrollPosts initialPosts={posts} />
    </Suspense>
  );
  // return <Posts initialPosts={posts} />;
}
