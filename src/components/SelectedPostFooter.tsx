'use client';
import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react';
import { PostFooterComponent } from './PostFooterComponent';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { currentSelectedPostAtom } from '@/store/atoms/post';
import { useCallback } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AddComment } from './AddCommentCard';
import Comments from './Comments';

export default function SelectedPostFooter() {
  const [selectedPost, setSelectedPost] = useRecoilState(
    currentSelectedPostAtom
  );

  const handleLikeDisLike = useCallback(async () => {
    if (selectedPost) {
      const response = await axios.post(`/api/post/like/${selectedPost?.id}`);
      if (response?.data?.success) {
        setSelectedPost({
          ...selectedPost,
          isLiked: selectedPost?.isLiked ? false : true,
          likesCount: selectedPost?.isLiked
            ? selectedPost?.likesCount - 1
            : selectedPost?.likesCount + 1,
        });
      }
    }
  }, [selectedPost]);

  const handleBookmark = useCallback(async () => {
    if (selectedPost) {
      const response = await axios.post(
        `/api/post/bookmark/${selectedPost?.id}`
      );
      if (response?.data?.success) {
        setSelectedPost({
          ...selectedPost,
          isBookmarked: selectedPost?.isBookmarked ? false : true,
          bookmarksCount: selectedPost.isBookmarked
            ? selectedPost.bookmarksCount - 1
            : selectedPost?.bookmarksCount + 1,
        });
      }
    }
  }, [selectedPost]);

  return (
    <div>
      <div className="flex justify-between text-sm text-slate-600 border-b-[1px] border-slate-400 pb-4">
        {selectedPost?.isLiked ? (
          <PostFooterComponent
            icon={<Heart size={18} fill="red" />}
            onClick={handleLikeDisLike}
            value={selectedPost?.likesCount}
          />
        ) : (
          <PostFooterComponent
            icon={<Heart size={18} />}
            onClick={handleLikeDisLike}
            value={selectedPost?.likesCount}
          />
        )}
        <Dialog>
          <DialogTrigger>
            <PostFooterComponent
              icon={<MessageCircle size={18} />}
              onClick={() => {}}
              value={selectedPost?.comments?.length}
            />
          </DialogTrigger>
          <DialogContent>
            {selectedPost && <AddComment post={selectedPost} />}
          </DialogContent>
        </Dialog>

        {selectedPost?.isBookmarked ? (
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
      {selectedPost && selectedPost.comments.length > 0 && (
        <Comments postId={selectedPost?.id} />
      )}
    </div>
  );
}
