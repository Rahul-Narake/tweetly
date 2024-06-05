'use client';
import { Post, currentSelectedPostAtom, postsAtom } from '@/store/atoms/post';
import { ProfileAvatar } from './ProfileAvatar';
import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRecoilState, useSetRecoilState } from 'recoil';

export function AddComment({ post }: { post: Post }) {
  const content = useRef('');
  const [requiredError, setRequiredError] = useState({
    contentReq: false,
  });
  const [loading, setLoading] = useState(false);
  const setPosts = useSetRecoilState(postsAtom);
  const [selectedPost, setSelectedPost] = useRecoilState(
    currentSelectedPostAtom
  );

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    try {
      if (!content.current) {
        setRequiredError({ contentReq: content.current ? false : true });
        return;
      }
      setLoading(true);
      const { data } = await axios.post(`/api/post/comment/${post?.id}`, {
        content: content.current,
      });
      setLoading(false);
      toast(data?.message, {
        action: { label: 'Close', onClick: () => toast.dismiss() },
      });
      if (data?.success) {
        setPosts((posts) => {
          return posts.map((p) => {
            if (String(p.id) === String(post?.id)) {
              return {
                ...p,
                comments: [...p.comments, data?.comment],
              };
            }
            return p;
          });
        });
        if (selectedPost?.id === post?.id) {
          setSelectedPost({
            ...selectedPost,
            comments: [...selectedPost?.comments, data?.comment],
          });
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="sm:col-span-1 sm:col-start-1 hidden sm:flex">
          <ProfileAvatar src={post?.user?.profile} name={post?.user?.name} />
        </div>
        <div className="flex flex-col col-span-11 col-start-2">
          <PostHeader
            time={post?.createdAt}
            name={post?.user.name}
            email={post?.user.email}
            userId={String(post?.user?.id)}
          />
          <PostContent content={post?.content} />
          <div className="text-sm text-slate-600">
            Repying to {post?.user.name}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="sm:flex sm:col-span-1 sm:col-start-1 hidden">
          <ProfileAvatar src={post?.user?.profile} name={post?.user?.name} />
        </div>
        <div className="flex flex-col col-span-11 col-start-2">
          <Textarea
            id="content"
            name="content"
            onChange={(e) => {
              setRequiredError((prevState) => ({
                ...prevState,
                contentReq: false,
              }));
              content.current = e.target.value;
            }}
          />
        </div>
      </div>
      {requiredError.contentReq && (
        <span className=" text-red-500 mt-2">Content is required</span>
      )}
      <div>
        <Button disabled={!content.current || loading} onClick={handleSubmit}>
          Comment
        </Button>
      </div>
    </>
  );
}
