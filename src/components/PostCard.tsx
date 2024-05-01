import { PostHeader } from './PostHeader';
import { PostContent } from './PostContent';
import { PostFooter } from './PostFooter';
import { ProfileAvatar } from './ProfileAvatar';
import { Post } from '@/store/atoms/post';

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="grid grid-cols-12 border-b-[1px] border-b-slate-400 p-2">
      <div className="flex col-span-1 col-start-1">
        <ProfileAvatar src={post?.user?.image} name={post?.user?.name} />
      </div>
      <div className="flex flex-col col-span-11 col-start-2 space-y-2">
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
