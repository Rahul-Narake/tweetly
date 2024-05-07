import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { PostFooter } from './PostFooter';
import { ProfileAvatar } from './ProfileAvatar';
import { Post } from '@/store/atoms/post';

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="grid grid-cols-12 border-b-[1px] border-b-slate-400 p-2 w-full">
      <div className="flex lg:col-span-1 lg:col-start-1 col-span-2 col-start-1">
        <ProfileAvatar src={post?.user?.profile} name={post?.user?.name} />
      </div>
      <div className="flex flex-col lg:col-span-11 lg:col-start-2 col-span-10 col-start-3 space-y-2">
        <PostHeader
          email={post?.user?.email}
          name={post?.user?.name}
          time={post?.createdAt}
          userId={String(post?.user?.id)}
        />
        <PostContent
          content={post?.content}
          image={post?.image || ''}
          title={post?.title || ''}
        />

        <PostFooter
          isBookmarked={post?.isBookmarked}
          isLiked={post?.isLiked}
          likesCount={post?.likesCount}
          post={post}
        />
      </div>
    </div>
  );
}
