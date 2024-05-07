'use client';

import { Post, postsAtom } from '@/store/atoms/post';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { PostCard } from './PostCard';

export function PostsList({ posts }: { posts: Post[] }) {
  const [forYouPosts, setForYouPosts] = useRecoilState(postsAtom);
  useEffect(() => {
    if (posts) {
      setForYouPosts(posts);
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      {forYouPosts && forYouPosts.length > 0 ? (
        forYouPosts.map((post) => {
          return <PostCard post={post} key={post?.id} />;
        })
      ) : (
        <div className="flex">
          <h1>Sorry no posts found</h1>
        </div>
      )}
    </div>
  );
}
