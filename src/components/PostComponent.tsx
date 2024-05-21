import { Post } from '@/store/atoms/post';
import { BackButton } from './BackButton';
import { PostCard } from './PostCard';
import PostYourReply from './PostYourReply';
import { getCurrentUser } from '@/lib/actions/getCurrentUser';
import Comments from './Comments';

export default async function PostComponent({ post }: { post: Post | null }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col relative px-2">
      <div className="sticky top-0 w-full z-2 h-10 flex items-center ">
        <BackButton />
      </div>
      <div className="flex flex-col">
        {post && (
          <div>
            <PostCard post={post} />
          </div>
        )}
        {post && (
          <div className="mt-2">
            <PostYourReply post={post} currentUser={currentUser} />
          </div>
        )}
        {post && <Comments postId={post?.id} />}
      </div>
    </div>
  );
}
