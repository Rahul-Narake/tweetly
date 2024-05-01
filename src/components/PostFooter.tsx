'use client';
import { Bookmark, Heart, MessageCircle, Share, X } from 'lucide-react';
import { PostFooterComponent } from './PostFooterComponent';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { Post, postsAtom } from '@/store/atoms/post';
import { useCallback } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AddComment } from './AddCommentCard';

export function PostFooter({
  isLiked,
  isBookmarked,
  likesCount,
  post,
}: {
  isLiked: boolean;
  isBookmarked: boolean;
  likesCount: number;
  post: Post;
}) {
  const [posts, setPosts] = useRecoilState(postsAtom);

  const handleLikeDisLike = useCallback(async () => {
    setPosts((posts) => {
      return posts.map((p) => {
        if (String(p.id) === String(post?.id)) {
          return {
            ...p,
            likesCount: isLiked ? likesCount - 1 : likesCount + 1,
            isLiked: isLiked ? false : true,
          };
        }
        return p;
      });
    });
    await axios.post(`/api/post/like/${post?.id}`);
  }, [posts]);

  const handleBookmark = useCallback(async () => {
    setPosts((posts) => {
      return posts.map((p) => {
        if (String(p.id) === String(post?.id)) {
          return {
            ...p,
            isBookmarked: isBookmarked ? false : true,
          };
        }
        return p;
      });
    });
    await axios.post(`/api/post/bookmark/${post?.id}`);
  }, [posts]);

  return (
    <div className="flex justify-between text-sm text-slate-600">
      {isLiked ? (
        <PostFooterComponent
          icon={<Heart size={18} fill="red" />}
          onClick={handleLikeDisLike}
          value={likesCount}
        />
      ) : (
        <PostFooterComponent
          icon={<Heart size={18} />}
          onClick={handleLikeDisLike}
          value={likesCount}
        />
      )}
      <Dialog>
        <DialogTrigger>
          <PostFooterComponent
            icon={<MessageCircle size={18} />}
            onClick={() => {}}
            value={post?.comments?.length}
          />
        </DialogTrigger>
        <DialogContent>
          <AddComment post={post} />
        </DialogContent>
      </Dialog>

      {isBookmarked ? (
        <PostFooterComponent
          icon={<Bookmark size={18} fill="blue" />}
          onClick={handleBookmark}
        />
      ) : (
        <PostFooterComponent
          icon={<Bookmark size={18} />}
          onClick={handleBookmark}
        />
      )}
      <PostFooterComponent icon={<Share size={18} />} onClick={() => {}} />
    </div>
  );
}
