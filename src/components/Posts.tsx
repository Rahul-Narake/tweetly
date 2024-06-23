'use client';
import { getLimitedPosts, getTotalPosts } from '@/lib/actions/getPosts';
import { Post } from '@/store/atoms/post';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';
import { PostCard } from './PostCard';

function Posts({ initialPosts }: { initialPosts: Post[] }) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [posts, setPosts] = useState(initialPosts);

  const setTotalPosts = async () => {
    const data = await getTotalPosts();
    if (data) setTotalResults(data);
  };

  const fetchMoreData = async () => {
    console.log('fething');
    setPage((page) => page + 1);
    setLoading(true);
    const data = await getLimitedPosts({ page });
    if (data) {
      const prev = posts;
      for (let i = 0; i < data.length; i++) {
        prev.push(data[i]);
      }
      console.log(prev);
      setPosts(prev);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTotalPosts();
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={posts.length !== totalResults}
        loader={loading && <Spinner />}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {posts ? (
            posts.map((post) => {
              return <PostCard post={post} key={post?.id} />;
            })
          ) : (
            <div className="flex">
              <h1>Sorry no posts found</h1>
            </div>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Posts;
