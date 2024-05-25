'use client';
import { CurrentUser, Post, currentSelectedPostAtom } from '@/store/atoms/post';
import { BackButton } from './BackButton';
import { PostCard } from './PostCard';
import PostYourReply from './PostYourReply';
import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import Comments from './Comments';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { PostContent } from './PostContent';
import { useRouter } from 'next/navigation';
import { ProfileAvatar } from './ProfileAvatar';
import { PostHeader } from './PostHeader';
import SelectedPostFooter from './SelectedPostFooter';

export default function PostComponent({ post }: { post: Post | null }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currentSelectePost, setCurrentSelectedPost] = useRecoilState(
    currentSelectedPostAtom
  );
  const router = useRouter();
  const getUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
  };

  useEffect(() => {
    setCurrentSelectedPost(post);
    getUser();
  }, []);

  return (
    <>
      <div className="sticky top-0 w-full z-2 h-10 flex items-center ">
        <BackButton />
      </div>
      <div className="grid grid-cols-12 border-b-[1px] border-b-slate-400 p-2 w-full cursor-pointer">
        <div className="flex lg:col-span-1 lg:col-start-1 col-span-2 col-start-1">
          <ProfileAvatar
            src={post?.user?.profile}
            name={post?.user?.name || ''}
          />
        </div>
        <div className="flex flex-col lg:col-span-11 lg:col-start-2 col-span-10 col-start-3 space-y-2">
          <PostHeader
            name={post?.user?.name}
            time={post?.createdAt}
            userId={String(post?.user?.id)}
          />
          <div
            onClick={() => {
              router.push(`/status/${post?.id}`);
            }}
          >
            <PostContent
              content={post?.content}
              image={post?.image || ''}
              title={post?.title || ''}
            />
          </div>
          <SelectedPostFooter />
        </div>
      </div>
    </>
  );
}
