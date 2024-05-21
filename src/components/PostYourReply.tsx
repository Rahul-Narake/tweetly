'use client';
import { CurrentUser, Post, postsAtom } from '@/store/atoms/post';
import { ProfileAvatar } from './ProfileAvatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
export default function PostYourReply({
  post,
  currentUser,
}: {
  post: Post | null;
  currentUser: CurrentUser | null;
}) {
  const [reply, setReply] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/post/comment/${post?.id}`, {
        content: reply,
      });
      setLoading(false);
      toast(data?.message, {
        action: { label: 'Close', onClick: () => toast.dismiss() },
      });
      setReply('');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-12 w-full border-b-[1px] border-slate-400 p-2">
      <div className="flex lg:col-span-1 lg:col-start-1 col-span-2 col-start-1 items-center">
        <ProfileAvatar
          name={currentUser?.name || ''}
          src={currentUser?.profile}
        />
      </div>
      <div className="flex flex-col lg:col-span-11 lg:col-start-2 col-span-10 col-start-3 space-y-2">
        <div className="text-sm">
          Replying to <span className="text-blue-400">{post?.user?.name}</span>
        </div>
        <div>
          <Input
            type="text"
            id="comment"
            name="comment"
            placeholder="Post your Reply"
            className="border-none ring-0 h-12 mb-2"
            onChange={(e) => {
              setReply(e.target.value);
            }}
          />
          <Button disabled={!reply || loading} onClick={handleSubmit}>
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
