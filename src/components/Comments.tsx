'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import { Button } from './ui/button';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { getTimeDifference } from './PostHeader';

export type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    profile: string;
  };
};

export default function Comments({ postId }: { postId: number }) {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLast, setIsLast] = useState(false);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(
        `/api/post/comment/${postId}?page=${page}`
      );

      if (data?.success) {
        setComments(data?.comments);
        setIsLast(data?.isLast);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNextComments = async () => {
    try {
      const currentPage = page + 1;
      const { data } = await axios.get(
        `/api/post/comment/${postId}?page=${currentPage}`
      );

      if (data?.success) {
        setPage(page + 1);
        setComments(data?.comments);
        setIsLast(data?.isLast);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPrevComments = async () => {
    try {
      const currentPage = page > 1 ? page - 1 : 1;
      const { data } = await axios.get(
        `/api/post/comment/${postId}?page=${currentPage}`
      );

      if (data?.success) {
        setPage(page - 1);
        setComments(data?.comments);
        setIsLast(data?.isLast);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="flex flex-col py-2">
      <div className="flex flex-col mb-2">
        {comments.map((cmt) => {
          return (
            <div
              key={cmt?.id}
              className="flex justify-between mb-2 items-center"
            >
              <div className="flex">
                <ProfileAvatar
                  name={cmt?.user?.name}
                  src={cmt?.user?.profile}
                />
                <p className="ml-2 text-sm text-slate-500">{cmt?.content}</p>
              </div>
              <p className="ml-2 text-sm text-slate-500">
                {getTimeDifference(cmt?.createdAt)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center space-x-2">
        <Button disabled={page === 1} onClick={fetchPrevComments}>
          <ArrowBigLeft />
        </Button>

        <Button disabled={isLast} onClick={fetchNextComments}>
          <ArrowBigRight />
        </Button>
      </div>
    </div>
  );
}
