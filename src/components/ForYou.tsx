'use client';
import { PostCard } from './PostCard';
import { useRecoilStateLoadable } from 'recoil';
import { postsAtom } from '@/store/atoms/post';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from './Loader';

export default function ForYou() {
  const [posts, setPosts] = useRecoilStateLoadable(postsAtom);
  const [loading, setLoading] = useState(false);
  const getAllPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/post`);
      setLoading(false);
      if (data.success) {
        setPosts(data?.posts);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (posts.state === 'loading') {
    return (
      <div>
        <Loader />
      </div>
    );
  } else if (posts.state === 'hasValue') {
    return (
      <div className="flex flex-col space-y-2 w-full">
        {posts.contents && posts.contents.length > 0 ? (
          posts.contents.map((post) => {
            return <PostCard post={post} key={post?.id} />;
          })
        ) : (
          <div className="flex justify-center font-bold">
            Sorry no posts found
          </div>
        )}
      </div>
    );
  }
}
