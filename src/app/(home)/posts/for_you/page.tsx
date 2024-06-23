import InfiniteScrollPosts from '@/components/InfiniteScrollPosts';
import Posts from '@/components/Posts';
import { getLimitedPosts } from '@/lib/actions/getPosts';
import { Suspense } from 'react';

export default async function ForYouPage() {
  const posts = await getLimitedPosts({});
  return <InfiniteScrollPosts initialPosts={posts} />;
  //  return <Posts initialPosts={posts} />;
}
